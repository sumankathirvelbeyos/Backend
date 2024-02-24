//name,product,time,disposal,asset,period,franchisename,franchiseperiod,investment,location
const mongoose = require("mongoose");





var Scope3energy = new mongoose.Schema({
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
    name: {
        type: String,
        required: true,
       
    },
    product: {
        type: String,
        required: true,
        
    }
   ,franchisename: {
        type: String,
        required: true,
        
    },
    franchiseperiod: {
        type: String,
        required: true,
        
    },investment: {
        type: String,
        required: true,
        
    },location: {
        type: String,
        required: true,
        
    }
    ,time: {
        type: String,
        required: true,
        
    }
    ,disposal: {
        type: String,
        required: true,
        
    }
    ,asset: {
        type: String,
        required: true,
        
    },period: {
        type: String,
        required: true,
        
    }


});



// createing model
const scope3db = new mongoose.model("Scope3franchises", Scope3energy);

module.exports = scope3db;