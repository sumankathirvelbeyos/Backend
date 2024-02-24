const mongoose = require("mongoose");





var capitalgoods = new mongoose.Schema({
    email: {
        type: String,
        
       
    },
    date: {
        type: String,
        
       
    },
    person: {
        type: String,
        
       
    },
    energy: {
        type: String,
        
       
    },
    employeename: {
        type: String,
        
        
    }
    ,
   
    code3: {
        type: String,
        
        
    }
    ,facility3: {
        type: String,
        
        
    },vehicle2: {
        type: String,
        
        
    },
    transport2: {
        type: String,
        
        
    },quantity2: {
        type: String,
        
        
    },employeecode: {
        type: String,
        
        
    },facility2: {
        type: String,
        
        
    },
    code2: {
        type: String,
        
       
    },
    facility2: {
        type: String,
        
        
    }
    ,
   
    quantity: {
        type: String,
        
        
    }
    ,material: {
        type: String,
        
        
    },distance: {
        type: String,
        
        
    },
    vehicle: {
        type: String,
        
        
    },transport: {
        type: String,
        
        
    },facility: {
        type: String,
        
        
    },byerlocation: {
        type: String,
        
        
    },byername: {
        type: String,
        
        
    },code: {
        type: String,
        
        
    }
});



// createing model
const capitaldb = new mongoose.model("capitalgoods", capitalgoods);

module.exports = capitaldb;