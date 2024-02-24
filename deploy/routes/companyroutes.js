const express = require("express");
const companyasset = require("../models/companyasset");
const companydetail1 = require("../models/companydetails1");
const companyproductdb = require("../models/companyproduct");
const routers = new express.Router();
const companydb = require("../models/companySchema");
const companyservice = require("../models/companyservice");
const questiondb = require("../models/questionmodel");


//get asset service
routers.post("/getassets", async (req, res) => {

    const { email} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await companyservice.find({email:email});
            
      res.json(usr)
  }
});
//getassetproduct
routers.post("/getassetp", async (req, res) => {

    const { email} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await companyproductdb.find({email:email});
            
      res.json(usr)
  }
});
//companyget
routers.post("/getasset", async (req, res) => {

    const { email} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{

        
       
        const usr = await companyasset.find({email:email});
            

         

             // console.log(storeData);
            //  res.status(201).json({ status: 201, usr})
      res.json(usr)
     
        

    
  }
});


//companyasset
routers.post("/addasset", async (req, res) => {

    const {email, assetid,assetname,assettype,latitude,longitude} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        
       
            const finalUser = new companyasset({
              email,  assetid,assetname,assettype,latitude,longitude
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
//addassetproduct
routers.post("/addassetp", async (req, res) => {

    const {email, productid,productdescription} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        
       
            const finalUser = new companyproductdb({
                email, productid,productdescription
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
//addasset service
routers.post("/addassets", async (req, res) => {

    const {email, serviceid,servicedescription} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        
       
            const finalUser = new companyservice({
                email, serviceid,servicedescription
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
//addcompany1

routers.post("/addcompany1", async (req, res) => {

    const {  cname,email,currency, pocnumber, pocname,noemployees,website,address,description} = req.body;

   
    try {

        const comp = await companydetail1.findOne({ email: email });
 
          if(comp){
            

    try {
      

            const setnewcompanydetail = await companydetail1.updateMany({email:email},{
                   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address
                   cname:cname,currency:currency, pocnumber:pocnumber, pocname:pocname,noemployees:noemployees,website:website,
                   address:address,description:description

            });

          await  setnewcompanydetail.save();
            res.status(201).json({status:201,setnewcompanydetail})
           

        
    } catch (error) {
        res.status(401).json({status:401,error})
    }

          }
      
         else {

            const companydetail = new companydetail1({

                   cname,email,currency, pocnumber, pocname,noemployees,website,address,description
            });

            

            const Data = await companydetail.save();

        
            res.status(201).json({ status: 201, Data })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});

// for user registration

routers.post("/addd", async (req, res) => {

    const { name,user,email,currency, country, pointofcontact,
        productservices,ids,employee,website,activity,address,description} = req.body;

   
    try {

        const comp = await companydb.findOne({ email: email });
       
        // if (!fname || !email || !password || !cpassword) {
        //     res.status(422).json({ error: "fill all the details" })
        // }
          if(comp){
            
    //const { name,user,email,currency, country, pointofcontact,productservices,ids,employee,website,activity,address,description} = req.body;

    try {
        // const ids = await companydb.findOne({_id:id});
       

        if(1===1){
            
        
           // const upp = await companydb.findOne({ email: email });
            
            const setnewcompanydetail = await companydb.updateMany({email:email},{
                   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address
                
                name:name,
                user:user,
             
                currency:currency,
                 country:country,
                  pointofcontact:pointofcontact,
                  productservices:productservices,
                  ids:ids,
                  employee:employee,
                  website:website,
                  activity:activity,
                  address:address,
                  description:description,
                 
                //   category:category
            
            
                
            
            });

          await  setnewcompanydetail.save();
            res.status(201).json({status:201,setnewcompanydetail})
           

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }

          }
      
         else {

            const companydetail = new companydb({
                   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address

                name,user,email,currency, country, pointofcontact,productservices,ids,employee,website,activity,address,description
            });

            

            const Data = await companydetail.save();

        
            res.status(201).json({ status: 201, Data })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});


routers.post("/comp", async (req, res) => {

    const { email} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await companydetail1.find({email:email});
            
      res.json(usr)
  }
});

    //question route



routers.post("/question", async (req, res) => {

    const { email,scope, yesno1, yesno2, yesno3, yesno4, yesno5, yesno6, yesno7, yesno8, 
        yesno9, yesno10, yesno11, yesno12, yesno13, yesno14, yesno15, standard, yesno16, yesno17, yesno18, yesno19} = req.body;

   
    try {

        const question = await questiondb.findOne({ email: email });
       
        if (!email) {
             res.status(422).json({ error: "fill all the details" })
         }
        else if(question){
            
   

    try {
        
       

        if(1===1){
            
        
            // const upp = await questiondb.findOne({ email: email });
            
            const setnewcompanydetail = await questiondb.updateMany({email:email},{
                   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address
                   scope:scope,
                    yesno1:yesno1, yesno2:yesno2,yesno3:yesno3, yesno4:yesno4,yesno5:yesno5,yesno6:yesno6,yesno7:yesno7, yesno8:yesno8, 
                   yesno9:yesno9, yesno10:yesno10, yesno11:yesno11, yesno12:yesno12, yesno13:yesno13, yesno14:yesno14
                   , yesno15:yesno15, standard:standard, yesno16:yesno16, yesno17:yesno17, yesno18:yesno18, yesno19:yesno19
                
            
            
                
            
            });

          await  setnewcompanydetail.save();
            res.status(201).json({status:201,setnewcompanydetail})
           

        }
    } catch (error) {
        res.status(201).json({status:201,message:"updated!!!"})
    }

          }
      
         else {

            const questiondetail = new questiondb({
                   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address

                   email,scope, yesno1, yesno2, yesno3, yesno4, yesno5, yesno6, yesno7, yesno8, 
                   yesno9, yesno10, yesno11, yesno12, yesno13, yesno14, yesno15, standard, yesno16, yesno17, yesno18, yesno19
            });

            

            const Data = await questiondetail.save();

        
            res.status(201).json({ status: 201, Data })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});

routers.post("/quest", async (req, res) => {

    const { email} = req.body;

    if ( !email ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await questiondb.find({email:email});
            
      res.json(usr)
  }
});



routers.get('/companydb', async (req, res) => {
	const usr = await companydb.find();

	res.json(usr);
});


routers.get('/clientp', async (req, res) => {
	const usr = await companydetail1.find();

	res.json(usr);
});
















module.exports = routers;






