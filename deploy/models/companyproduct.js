const mongoose = require("mongoose");





var companymodel = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
       
    },
    productid: {
        type: String,
        required: true,
       
    },
    productdescription: {
        type: String,
        required: true,
        
    }

});



// createing model
const companyproductdb = new mongoose.model("companyproducts", companymodel);

module.exports = companyproductdb;