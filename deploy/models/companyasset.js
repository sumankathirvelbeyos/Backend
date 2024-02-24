const mongoose = require("mongoose");





var companymodel = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
       
    },
    assetid: {
        type: String,
        required: true,
       
    },
    assetname: {
        type: String,
        required: true,
        
    }
   ,latitude: {
        type: String,
        required: true,
        
    },
    longitude: {
        type: String,
        required: true,
        
    },assettype: {
        type: String,
        required: true,
        
    }

});



// createing model
const companyasset = new mongoose.model("companyassets", companymodel);

module.exports = companyasset;