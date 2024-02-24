const mongoose = require("mongoose");


var Scope2energy = new mongoose.Schema({
    person: {
        type: String,
        required: true,
       
    },  
email:{
    type:String
},
    code: {
        type: String,
        required: true,
       
    },
    facility: {
        type: String,
        required: true,
        
    }
   ,co2: {
        type: Number,
        required: true,
        
    },
    fuel: {
        type: String,
        required: true,
        
    },quantity: {
        type: String,
        required: true,
        
    },date:{
        type:String
    }

});



// createing model
const energydb = new mongoose.model("Scope2energys", Scope2energy);

module.exports = energydb;