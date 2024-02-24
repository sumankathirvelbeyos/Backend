const express = require("express");
const routerstation = new express.Router();
const stationdb = require("../models/stationary");
const mobiledb=require("../models/mobile")
// const mobiledistancedb=require("../models/mobiledistance")
// const freightdb=require("../models/freight")
const energydb=require("../models/scope2energy")

const fugitiveDB= require("../models/fugitive")
const scope3db=require("../models/scope3")
const scope3goodsdb=require("../models/scope3goods")
const downstreamdb=require("../models/downstream")
const upstreamdb=require("../models/upstream");
const capitaldb = require("../models/capitalgoods");

const processdb = require("../models/process");
const fugitivetwo = require("../models/fugitive2");
//process
routerstation.post("/process", async (req, res) => {

    const { code,facility,quantity,fuel,email,date,person} = req.body;

   

    try {

    
    
            const finalUser = new processdb({
                code,facility,quantity,fuel,email,date,person
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post("/getprocess", async (req, res) => {

    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await processdb.find({email:map});
            
      res.json(usr)
  }
});
//getstationary
routerstation.post("/getstation", async (req, res) => {

    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await stationdb.find({email:map});
            
      res.json(usr)
  }
});
//stationary
routerstation.post("/scomp", async (req, res) => {

    const { code,facility,quantity,type,weight,fuel,co2,ch4,no2,email,date,person} = req.body;

   

    try {

    
    
            const finalUser = new stationdb({
                code,facility,quantity,type,weight,fuel,co2,ch4,no2,email,date,person
            });

            

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});

// routerstation.get('/scompp', async (req, res) => {
// 	const usr = await stationdb.find();
//     // console.log(usr[0].quantity);
//     // for(i=0;usr.length>i;i++){
//     //     console.log("hello");
     
    
//     // if(usr[i].quantity<10000){
//     //     console.log("yes");
//     // }}

// 	res.json(usr);
// });
//mobile 
routerstation.post("/mcomp", async (req, res) => {

    const { code,facility,quantity,literdistance,fuel,co2,category,subcat,mode,date,email ,air,weight,person,road,nonroad,rail,water,air2} = req.body;

   

    try {

    
    
            const saves = new mobiledb({
                code,facility,quantity,literdistance,fuel,co2,category,subcat,mode,date,email,air,weight,person,road,nonroad,rail,water,air2
            });

            

            const storeData = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});

routerstation.post("/getmobile", async (req, res) => {

    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await mobiledb.find({email:map});
            
      res.json(usr)
  }
});



//scope2 energy

routerstation.post("/energy", async (req, res) => {

    const { code,facility,fuel,co2,quantity,date,email,person} = req.body;

   

    try {

    
    
            const saves = new energydb({
               email, code,facility,fuel,co2,quantity,date,person
            });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post("/energydash", async (req, res) => {

    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await energydb.find({email:map});
            
      res.json(usr)
  }
});

//mc

routerstation.post("/mc1", async (req, res) => {

    const {    road,nonroad,rail,water,air,person} = req.body;

   

    try {

    
    
            const saves = new Mcdb({
                road,nonroad,rail,water,air,person
            });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});

//fugitive 

routerstation.post("/fug", async (req, res) => {

    const {      code,facility,i,f,g,h,j,refrigerant,refrigeration,co2,date,email,person} = req.body;

   

    try {

    
    
            const saves = new fugitiveDB({
                code,facility,i,f,g,h,j,refrigerant,refrigeration,co2,date,email,person
            });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post("/fugdash", async (req, res) => {

    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await fugitiveDB.find({email:map});
            
      res.json(usr)
  }
});
//scope3
routerstation.post("/franchise", async (req, res) => {

    const {    name,product,time,disposal,asset,period,franchisename,franchiseperiod,investment,location,person ,email,date } = req.body;

   

    try {

    
    
            const saves = new scope3db({
                name,product,time,disposal,asset,period,franchisename,franchiseperiod,investment,location,person,email,date
            });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post('/franchisedash', async (req, res) => {
	
    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await scope3db.find({email:map});
            
      res.json(usr)
  }
});
//scope3goods
routerstation.post("/goodsscope3", async (req, res) => {

    const { period2,person,vendorlocation2,vendorname2,name2,code2,quantity,
        purchased,vendorlocation,vendorname,namegoods,codegoods,serviceavailed  ,email,date} = req.body;

   

    try {

    
    
            const saves = new scope3goodsdb({
                period2,person,vendorlocation2,vendorname2,name2,code2,quantity,purchased,
                vendorlocation,vendorname,namegoods,codegoods,serviceavailed,email,date
            });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post('/goodsscope3dash', async (req, res) => {
    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await scope3goodsdb.find({email:map});
            
      res.json(usr)
  }
});
//downstream
routerstation.post("/downstream", async (req, res) => {

    const { distance,material,quantity,code,byername,byerlocation,facility,transport,vehicle,code2,byername2,byerlocation2,facility2
        ,finalproduct,quantity2,process,material2,productname,usagetime,productname2,disposal,lease,namefranchise,location
        ,franchiseperiod,location2 ,person,email,date ,investment  } = req.body;

   

    try {

    
    
            const saves = new downstreamdb({
                distance,material,quantity,code,byername,byerlocation,facility,transport,vehicle,code2,byername2,byerlocation2,facility2
                ,finalproduct,quantity2,process,material2,productname,usagetime,productname2,disposal,lease,namefranchise,location
                ,franchiseperiod,location2  ,person  ,email,date  ,investment    });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post('/downdash', async (req, res) => {
    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await downstreamdb.find({email:map});
            
      res.json(usr)
  }
});
//upstream
routerstation.post("/upstream", async (req, res) => {

    const { date,email, distance,material,quantity,code,byername,byerlocation,facility,transport,vehicle,facility2,code2,waste,dispose,quantity2,facility3,
        code3,employeecode,employeename,from,to,employeecode2,employeename2,distance2,transport2,
        vehicle2,facility4,code4,from2,to2,distance3,transport3,period,asset,vehicle3,person   } = req.body;

   

    try {

    
    
            const saves = new upstreamdb({
                distance,material,quantity,code,byername,byerlocation,facility,transport,vehicle,facility2,code2,waste,dispose,quantity2,facility3,
                code3,employeecode,employeename,from,to,employeecode2,employeename2,distance2,transport2,
                vehicle2,facility4,code4,from2,to2,distance3,transport3,period,asset,vehicle3,email   ,person   ,date  });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post("/upstreamdash", async (req, res) => {

    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await upstreamdb.find({email:map});
            
      res.json(usr)
  }
});
//capital goods
routerstation.post("/cap", async (req, res) => {

    const {  energy,employeename,employeecode,code3,facility3,vehicle2,transport2,quantity2,code2,facility2,
        quantity,material,distance,vehicle,transport,facility,byerlocation,byername,code ,person,email,date } = req.body;

   

    try {

    
    
            const saves = new capitaldb({
                energy,employeename,employeecode,code3,facility3,vehicle2,transport2,quantity2,code2,facility2,
                quantity,material,distance,vehicle,transport,facility,byerlocation,byername,code ,person  ,date,email     });

            

            const storeDatadist = await saves.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeDatadist })
        

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});
routerstation.post('/capdash', async (req, res) => {
    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await capitaldb.find({email:map});
            
      res.json(usr)
  }
});
//fugitive 2

routerstation.post("/fugitive2",async(req,res) => {
    const { gases, code, facility, fuel, quantity, yesno, code2, 
            facility2, fire, typegas, capacity, co2, co3,person,date,email} = req.body


            const testdetail = new fugitivetwo({
                gases, code, facility, fuel, quantity, yesno, code2, 
            facility2, fire, typegas, capacity, co2, co3 ,person,email,date
            });

            const data= await testdetail.save();

            res.status(201).json({ status: 201, data})
        }
);

routerstation.post('/fugdashtwo', async (req, res) => {
    const { map} = req.body;

    if ( !map ) {
        res.status(422).json({ error: "nomatch" })
    }

  else{
   
        const usr = await fugitivetwo.find({email:map});
            
      res.json(usr)
  }
});  



module.exports =routerstation;  