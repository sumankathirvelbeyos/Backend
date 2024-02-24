const mongoose = require("mongoose");





var companymodel = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
       
    },
    serviceid: {
        type: String,
        required: true,
       
    },
    servicedescription: {
        type: String,
        required: true,
        
    }

});



// createing model
const companyservice = new mongoose.model("companyservices", companymodel);

module.exports = companyservice;