const mongoose = require("mongoose");




var mobiledistance = new mongoose.Schema({
   
    person: {
        type: String,
        required: true,
       
    },
    code: {
        type: String,
        required: true,
       
    },
    facility: {
        type: String,
        required: true,
        
    }
    ,
   
    quantity: {
        type: String,
        required: true,
        
    }
    ,date: {
        type: String,
        required: true,
        
    },email: {
        type: String,
        required: true,
        
    },
    fuel: {
        type: String,
        required: true,
        
    }

});



// createing model
const processdb = new mongoose.model("processes", mobiledistance);

module.exports = processdb;