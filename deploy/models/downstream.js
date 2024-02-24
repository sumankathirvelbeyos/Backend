const mongoose = require("mongoose");





var downstream = new mongoose.Schema({
    email: {
        type: String,
      
       
    },
    date: {
        type: String,
      
       
    },
   
    person: {
        type: String,
      
       
    },
    code: {
        type: String,
      
       
    },
    facility: {
        type: String,
      
        
    }
    ,
   
    distance: {
        type: String,
      
        
    }
    ,material: {
        type: String,
      
        
    },quantity: {
        type: String,
      
        
    },
    byername: {
        type: String,
      
        
    },byerlocation: {
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
   
    process: {
        type: String,
      
        
    }
    ,material2: {
        type: String,
      
        
    },quantity2: {
        type: String,
      
        
    },
    byername2: {
        type: String,
      
        
    },byerlocation2: {
        type: String,
      
        
    },productname: {
        type: String,
      
        
    },finalproduct: {
        type: String,
      
        
    },location2: {
        type: String,
      
        
    },franchiseperiod: {
        type: String,
      
        
    },location: {
        type: String,
      
        
    },namefranchise: {
        type: String,
      
        
    },lease: {
        type: String,
      
        
    },disposal: {
        type: String,
      
        
    },productname2: {
        type: String,
      
        
    },investment: {
        type: String,
      
        
    },usagetime: {
        type: String,
      
        
    }
});



// createing model
const downstreamdb = new mongoose.model("downstreams", downstream);

module.exports = downstreamdb;