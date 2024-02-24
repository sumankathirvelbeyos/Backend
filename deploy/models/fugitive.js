const mongoose = require("mongoose");




var fugitiveSchema = new mongoose.Schema({
   
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
   
    i: {
        type: String,
        required: true,
        
    }
    ,f: {
        type: String,
        required: true,
        
    },g: {
        type: String,
        required: true,
        
    },h: {
        type: String,
        required: true,
        
    },
    j: {
        type: String,
        required: true,
        
    },co2: {
        type: Number,
        required: true,
        
    },refrigeration: {
        type: String,
        required: true,
        
    },refrigerant: {
        type: String,
        required: true,
        
    },email: {
        type: String,
        required: true,
        
    },date: {
        type: String,
        required: true,
        
    }

});



// createing model
const fugitiveDB = new mongoose.model("fugitives", fugitiveSchema);

module.exports = fugitiveDB;