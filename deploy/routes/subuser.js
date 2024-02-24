
const express = require("express");
const routeruser = new express.Router();
const subuserdb = require("../models/subuser");
const tempusr=require("../models/tempsubusr")
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");
const sauthenticate = require("../middleware/subauth");

const keysecret = process.env.SECRET_KEY





// routeruser.delete("/remusr", async (req, res) => {
//     const { email } = req.body;
//     if ( !email) {
//       //  res.status(422).json({ error: "fill all the details" })
//     }else{

//     try {
        
//         const usrr = await subuserdb.findOne({ email: email });
//         if(usrr){
//         const usr = await subuserdb.findOneAndDelete({email:email});
//         res.status(201).json({ status: 201, usr})
     
//      console.log(usr);}
//      else{
//         res.status(422).json(error);
//      }
   
//     } catch (error) {
//         res.send(error);
       
//     }}
// });



// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}) 

//reg
routeruser.post("/subuserregister", async (req, res) => {

    const { fname, email, password, cpassword,temppass } = req.body;

    if (!fname || !email || !password || !cpassword||!temppass) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await subuserdb.findOne({ email: email });
        const adminpreuser = await tempusr.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else if(adminpreuser && adminpreuser.pass===temppass){
            const map = adminpreuser.eemail   
            const finalUser = new subuserdb({
                fname, email, password, cpassword,map
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Welcome from Beyond Sustainability",
                text:`Thank you for choosing Beyond Sustainability. We value your trust and our partnership.`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Sucessfully"})
                }
            })
        }else{
            res.status(422).json({ error: "you have no access" })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});

// for user registration

// routeruser.post("/subuserregister", async (req, res) => {

//     const { fname, email, password, cpassword } = req.body;

//     if (!fname || !email || !password || !cpassword) {
//         res.status(422).json({ error: "fill all the details" })
//     }

//     try {

//         const preuser = await subuserdb.findOne({ email: email });

//       const users=await tempusr.findOne({email:email})
//         if (preuser) {
//             res.status(422).json({ error: "This Email is Already Exist" })
//         } else if (password !== cpassword) {
//             res.status(422).json({ error: "Password and Confirm Password Not Match" })
//         } else if(users && users.pass===password) {
//             const finalUser = new subuserdb({
//                 fname, email, password, cpassword
//             });
//             const storeData = await finalUser.save();

//             // console.log(storeData);
//             res.status(201).json({ status: 201, storeData })
//         }else{
//             res.status(422).json({ error: "invalid" })
//         }

//     } catch (error) {
//         res.status(422).json(error);
//         console.log("catch block error");
//     }

// });




// user Login

routeruser.post("/subuserlogin", async (req, res) => {
    

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await subuserdb.findOne({email:email});
       const userValidtemp = await tempusr.findOne({email:email});

        if(userValid && userValidtemp.active==="active"){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+10000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }else{
            res.status(401).json({status:401,message:"invalid details"});
        }

    } catch (error) {
        res.status(401).json({status:401,error});
        console.log("catch block");
    }
});



// user valid
routeruser.get("/subuservaliduser",sauthenticate,async(req,res)=>{
    try {
        const ValidUserOne = await subuserdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// user logout

routeruser.get("/subuserlogout",sauthenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});



// send email Link For reset Password
routeruser.post("/subusersendpasswordlink",async(req,res)=>{
    

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await subuserdb.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await subuserdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For FEW MINUTES http://localhost:3000/subuserforgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Sucessfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

});


// verify user for forgot password time
routeruser.get("/subuserforgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await subuserdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// change password

routeruser.post("/:id/subuser/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await subuserdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);
            

            const setnewuserpass = await subuserdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})



module.exports = routeruser;



// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true


routeruser.post("/sublist", async (req, res) => {

    const { eemail} = req.body;

    if ( !eemail ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await tempusr.find({eemail:eemail});
            
      res.json(usr)
  }
});

// routeruser.get('/sublist', async (req, res) => {
// 	const usr = await subuserdb.find();

// 	res.json(usr);
// });

module.exports = routeruser;