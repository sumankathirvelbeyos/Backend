const express = require("express");
const superouter = new express.Router();

var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");
const superadmindb=require("../models/superadmindb");
const tempsuperadmin =require("../models/tempsuperadmin")
const tempusr = require("../models/tempsubusr");
const tempadminusr = require("../models/tempclient");
const sauthenticate = require("../middleware/subauth");
const aauthenticate = require("../middleware/adminauth");

const keysecret = process.env.SECRET_KEY
const topsecret = process.env.TOPSECRET


//superadd
superouter.post("/addsuperadmin", async (req, res) => {
    const { email } = req.body;

    try {

        const preuser = await tempsuperadmin.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        }
         else {
            const finalUser = new tempsuperadmin({
                 email
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })}
        }
            catch(error) {
                res.status(422).json(error);
                console.log("catch block error");
            }

})
// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}) 
//add usr

superouter.post("/adminaddusr", async (req, res) => {

    const { email ,pass,active} = req.body;

    if ( !email || !pass|| !active) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await tempadminusr.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        }
         else {
            const finalUser = new tempadminusr({
                 email,pass,active
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Beyond sustainability registration",
                text:`This is the one time password for your tool to register : ${pass}`
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
        res.status(422).json(error);
        console.log("catch block error");
    }

});

//rem subusr
superouter.post("/adminremusr", async (req, res) => {

    const { remail ,ractive } = req.body;

    if ( !remail  ) {
        res.status(422).json({ error: "fill all the details" })
    }

 

       
if(ractive==="remove"){
    try {
        
        const usrr = await tempadminusr.findOne({ email: remail });
        if(usrr){
        const usr = await tempadminusr.findOneAndDelete({email:remail});
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
    const preuser = await tempadminusr.findOne({ email: remail });
        if (preuser) {
            const users = await tempadminusr.updateMany({email:remail},{
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
//mail
superouter.post("/mail", async (req, res) => {
    const {  to,subject,text } = req.body;
    console.log(to,subject,text);
    const mailOptions = {
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        text:`${text}`
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
});



// for user registration

superouter.post("/superregister", async (req, res) => {

    const { fname, email, password, cpassword ,secretkey} = req.body;

    if (!fname || !email || !password || !cpassword||!secretkey) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
        const apreuser = await tempsuperadmin.findOne({ email: email });
        const preuser = await superadmindb.findOne({ email: email });
      
        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })

        } else if(apreuser){
            if(topsecret===secretkey) {
            const finalUser = new superadmindb({
                fname, email, password, cpassword
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })

        }else{
            res.status(422).json({ error: "invalid" })
        }}else{
            res.status(422).json({ error: "invalid" })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});




// user Login

superouter.post("/superlogin", async (req, res) => {
    

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await superadmindb.findOne({email:email});

        if(userValid){

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
superouter.get("/supervaliduser",aauthenticate,async(req,res)=>{
    try {
       console.log(req.userId)
        const ValidUserOne = await superadmindb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// user logout

superouter.get("/superlogout",aauthenticate,async(req,res)=>{
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
superouter.post("/supersendpasswordlink",async(req,res)=>{
    

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await superadmindb.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await superadmindb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For FEW MINUTES http://localhost:3000/superforgotpassword/${userfind.id}/${setusertoken.verifytoken}`
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
superouter.get("/superforgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await superadmindb.findOne({_id:id,verifytoken:token});
        
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

superouter.post("/:id/hello/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await superadmindb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);
            

            const setnewuserpass = await superadmindb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})
//admin usr
superouter.post("/addadmin", async (req, res) => {

    const { email ,pass,active} = req.body;

    if ( !email || !pass|| !active) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await tempadminusr.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        }
         else {
            const finalUser = new tempusr({
                 email,pass,active
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
superouter.get('/clist', async (req, res) => {
	const usr = await tempadminusr.find();

	res.json(usr);
});


module.exports = superouter;



// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true



