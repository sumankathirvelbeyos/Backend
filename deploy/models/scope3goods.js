//  period2,vendorlocation2,vendorname2,name2,code2,quantity,purchased,vendorlocation,vendorname,namegoods,codegoods
const mongoose = require("mongoose");





var Scope3goods = new mongoose.Schema({
    email: {
        type: String,
        required: true,
       
    },
    date: {
        type: String,
        required: true,
       
    },
   
    person: {
        type: String,
        required: true,
       
    },
    period2: {
        type: String,
        required: true,
       
    },
    vendorlocation2: {
        type: String,
        required: true,
        
    }
   ,vendorname2: {
        type: String,
        required: true,
        
    },
    name2: {
        type: String,
        required: true,
        
    },code2: {
        type: String,
        required: true,
        
    },quantity: {
        type: String,
        required: true,
        
    }
    ,purchased: {
        type: String,
        required: true,
        
    }
    ,codegoods: {
        type: String,
        required: true,
        
    }
    ,namegoods: {
        type: String,
        required: true,
        
    },vendorname: {
        type: String,
        required: true,
        
    },vendorlocation: {
        type: String,
        required: true,
        
    },
    serviceavailed: {
        type: String,
        required: true,
        
    }


});



// createing model
const scope3goodsdb = new mongoose.model("Scope3goods", Scope3goods);

module.exports = scope3goodsdb;