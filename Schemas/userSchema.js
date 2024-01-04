const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, "Please enter your firstname"]
    },
    middlename:{
        type: String
    },
    lastname:{
        type: String
    },
    gender:{
        type: String,
        required: true
    },
    accountNumber:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        default: 50000
    },
    password:{
        type: String,
        required: true
    },
    blocked:{
        type: Boolean,
        default: false
    },
    DOB:{
        type: String,
        required: true
    },
    phno1:{
        type: Number,
        required: true
    },
    phno2:{
        type: Number
    },
    mpin:{
        type: Number,
        required: true
    },
    atmpin:{
        type: Number,
        required: true
    },
    addstr:{
        type: String
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    postalcode: {
        type: Number,
        required: true
    },
    landmark: {
        type: String
    }
});




module.exports = mongoose.model("user", userSchema);