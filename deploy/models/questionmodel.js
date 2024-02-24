const mongoose = require("mongoose");
const validator = require("validator");



var questionSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    
    scope: {
        type: String,
        
        
    },
    yesno1: {
        type: String,
       
    },
    yesno2: {
        type: String,
       
    },
    yesno3: {
        type: String,
       
    },
    yesno4: {
        type: String,
       
    },
    yesno5: {
        type: String,
       
    },
    yesno6: {
        type: String,
       
    },
    yesno7: {
        type: String,
       
    },
    yesno8: {
        type: String,
       
    },
    yesno9: {
        type: String,
       
    },
    yesno10: {
        type: String,
       
    },
    yesno11: {
        type: String,
       
    },
    yesno12: {
        type: String,
       
    },
    yesno13: {
        type: String,
       
    },
    yesno14: {
        type: String,
       
    },standard: {
        type: String,
       
    },
    yesno15: {
        type: String,
       
    },
    yesno16: {
        type: String,
       
    },
    yesno17: {
        type: String,
       
    },
    yesno18: {
        type: String,
       
    },
    yesno19: {
        type: String,
       
    }
    
   
});



// createing model
const questiondb = new mongoose.model("questions", questionSchema);

module.exports = questiondb;


