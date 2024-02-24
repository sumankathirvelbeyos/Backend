const mongoose = require("mongoose");

const validator = require("validator");
//                cname,email,currency, pocnumber, pocname,noemployees,website,address,description


var companySchema = new mongoose.Schema({

    cname: {
        type: String
    },
    
    email: {
        type: String,
        required: true,
        // unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    currency: {
        type: String
    
    }, pocnumber: {
        type: String
    
    },
    pocname: {
        type: String
    
    },


    noemployees: {
        type: String
    
    },
    website: {
        type: String
    
    },
   
    address: {
        type: String
    
    },
    description:{
        type: String
    }
});








// createing model
const companydetail1 = new mongoose.model("company1details", companySchema);

module.exports = companydetail1;


