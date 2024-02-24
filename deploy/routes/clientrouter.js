const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");

const tempadminusr = require("../models/tempclient");
const tempusr = require("../models/tempsubusr");
const keysecret = process.env.SECRET_KEY



// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}) 

//subusr add

router.post("/addusr", async (req, res) => {

    const { email ,pass,active,eemail} = req.body;

    if ( !email || !pass|| !active) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await tempusr.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        }
         else {
            const finalUser = new tempusr({
                 email,pass,active,eemail
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
//rem subusr
router.post("/remusr", async (req, res) => {

    const { remail ,ractive } = req.body;

    if ( !remail  ) {
        res.status(422).json({ error: "fill all the details" })
    }

 

       
if(ractive==="remove"){
    try {
        
        const usrr = await tempusr.findOne({ email: remail });
        if(usrr){
        const usr = await tempusr.findOneAndDelete({email:remail});
        res.status(201).json({ status: 201, usr})
  
    }
     else{
        res.status(422).json({status:401,message:"user not exist"});
     }
   
    } catch (error) {
        res.send(error);
       
    }
}else{ 
    try {
    const preuser = await tempusr.findOne({ email: remail });
        if (preuser) {
            const users = await tempusr.updateMany({email:remail},{
                active:ractive});
        

            

            const storeData = await users.save();

        
            res.status(201).json({status:201,storeData})

        }
        else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(201).json({status:201})
        console.log("success");
    }}

});
// for user registration

router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword,temppass } = req.body;

    if (!fname || !email || !password || !cpassword||!temppass) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
let map=email;
        const preuser = await userdb.findOne({ email: email });
        const adminpreuser = await tempadminusr.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else if(adminpreuser && adminpreuser.pass===temppass){
           
            const finalUser = new userdb({
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




// user Login

router.post("/login", async (req, res) => {
    

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});
       const userValidtemp = await tempadminusr.findOne({email:email});

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
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        console.log(req.userId);
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// user logout

router.get("/logout",authenticate,async(req,res)=>{
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
router.post("/sendpasswordlink",async(req,res)=>{
    

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await userdb.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For FEW MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
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
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
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

router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);
            

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})



module.exports = router;



// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true



