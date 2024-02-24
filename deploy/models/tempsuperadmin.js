const mongoose = require("mongoose");

const validator = require("validator");


var tempsuperadminschema = new mongoose.Schema({
   // name,user,currency, country, pointofcontact,productservices,id,employee,website,activity,address

    email: {
        type: String,
        required: true,
       
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    }
});








// createing model
const tempsuperadmin = new mongoose.model("tempsuperadmins", tempsuperadminschema);

module.exports = tempsuperadmin;