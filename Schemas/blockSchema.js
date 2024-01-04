const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    reason:{
        type: String,
        required: true
    },
    accountNumber:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("blockReason", blockSchema);