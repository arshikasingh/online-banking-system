const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    issue:{
        type: String,
        required: true
    },
    accountNumber:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("issue", issueSchema);