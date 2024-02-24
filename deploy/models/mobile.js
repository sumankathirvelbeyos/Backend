const mongoose = require("mongoose");




var mobileSchema = new mongoose.Schema({
    person: {
        type: String,
        required: true,
       
    },
    mode:{
        type: String,
        required: true,
    },date:{
        type: String,
        required: true,
    },email:{
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
    ,literdistance: {
        type: String,
        required: true,
        
    },fuel: {
        type: String,
        required: true,
        
    },co2: {
        type: Number,
        required: true,
        
    },
    category: {
        type: String,
        required: true,
        
    },subcat: {
        type: String,
        required: true,
        
    },air:{
        type:String
    },weight:{
type:String
    }, road: {
        type: String,
        required: true,
       
    },
    nonroad: {
        type: String,
        required: true,
        
    }
   ,rail: {
        type: String,
        required: true,
        
    },
    water: {
        type: String,
        required: true,
        
    },air2: {
        type: String,
        required: true,
        
    }

});



// createing model
const mobiledb = new mongoose.model("mobilecombustions", mobileSchema);

module.exports = mobiledb;