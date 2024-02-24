const mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');




var upstream = new mongoose.Schema({
   
    person: {
        type: String,
       
       
    },date: {
        type: String,
       
       
    },
    email: {
        type: String,
       
       
    },
    distance: {
        type: String,
       
       
    },
    material: {
        type: String,
       
        
    }
    ,
   
    quantity: {
        type: String,
       
        
    }
    ,code: {
        type: String,
       
        
    },byername: {
        type: String,
       
        
    },
    byerlocation: {
        type: String,
       
        
    },facility: {
        type: String,
       
        
    },transport: {
        type: String,
       
        
    },vehicle: {
        type: String,
       
        
    },
    code2: {
        type: String,
       
       
    },
    facility2: {
        type: String,
       
        
    }
    ,
   
    waste: {
        type: String,
       
        
    }
    ,dispose: {
        type: String,
       
        
    },quantity2: {
        type: String,
       
        
    },
    facility3: {
        type: String,
       
        
    },code3: {
        type: String,
       
        
    },employeecode: {
        type: String,
       
        
    },employeename: {
        type: String,
       
        
    },from: {
        type: String,
       
        
    },to: {
        type: String,
       
        
    },employeecode2: {
        type: String,
       
        
    },distance2: {
        type: String,
       
        
    },transport2: {
        type: String,
       
        
    },vehicle2: {
        type: String,
       
        
    },facility4: {
        type: String,
       
        
    },code4: {
        type: String,
       
        
    },from2: {
        type: String,
       
        
    },to2: {
        type: String,
       
        
    },distance3: {
        type: String,
       
        
    },transport3: {
        type: String,
       
        
    },asset: {
        type: String,
       
        
    },period: {
        type: String,
       
        
    },vehicle3: {
        type: String,
       
        
    }
});
upstream.plugin(timestamps);


// createing model
const upstreamdb = new mongoose.model("upstreams", upstream);

module.exports = upstreamdb;