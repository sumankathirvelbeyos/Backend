const mongoose = require("mongoose");

const validator = require("validator");


var TempclientSchema = new mongoose.Schema({
   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address

    email: {
        type: String,
        required: true,
       
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    pass: {
        type: String,
        required: true,
        
    }
    ,
    active: {
        type: String,
        required: true,
        
    }
});


// createing model
const tempadminusr = new mongoose.model("tempadmins", TempclientSchema);

module.exports = tempadminusr;