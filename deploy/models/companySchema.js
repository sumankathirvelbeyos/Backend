const mongoose = require("mongoose");

const validator = require("validator");


var companySchema = new mongoose.Schema({
   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address
    name: {
        type: String
    },
    user: {
        type: String,
        
        
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
    
    },
    country: {
        type: String
        
    },
    pointofcontact: {
        type: String
    
    },
    productservices: {
        type: String
    
    },
    ids: {
        type: String
    
    },
    employee: {
        type: String
    
    },
    website: {
        type: String
    
    },
    activity: {
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
const companydb = new mongoose.model("companies", companySchema);

module.exports = companydb;


