const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    accountNumber:{
        type: Number,
        required: true
    },
    loantype:{
        type: String,
        required: true
    },
    loanForSelf:{
        type: Boolean
    }
});

module.exports = new mongoose.model("loan", loanSchema);