const mongoose = require("mongoose");




var stationarySchema = new mongoose.Schema({
    person: {
        type: String,
        required: true,
       
    },  
email:{
    type: String,
    required: true
},
    code: {
        type: String,
        required: true,
       
    },
    facility: {
        type: String,
        required: true,
        
    }, person: {
        type: String,
        required: true,
        
    }
    ,
   
    quantity: {
        type: String,
        required: true,
        
    }
    ,type: {
        type: String,
        required: true,
        
    },weight: {
        type: String,
        required: true,
        
    },fuel: {
        type: String,
        required: true,
        
    },co2: {
        type: Number,
        required: true,
        
    },ch4: {
        type: String,
        required: true,
        
    },no2: {
        type: String,
        required: true,
        
    },date: {
        type: String,
        required: true,
        
    }

});



// createing model
const stationdb = new mongoose.model("stationaries", stationarySchema);

module.exports = stationdb;