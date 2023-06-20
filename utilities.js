const jwt = require("jsonwebtoken");
const User = require("./Schemas/userSchema");
const bcrypt = require("bcrypt");
const Loan = require("./Schemas/loanSchema");

module.exports.createToken = (payload) => {
    return jwt.sign({id: payload._id}, process.env.SECRET);
}

module.exports.retrieveID = (token) => {
    const id = jwt.verify(token, process.env.SECRET, (err, decodes) => {
        if(err) throw new Error("retrievID");
        return decodes.id;
    });
    return id;
}

module.exports.retrieveAccNum = async (token) => {
    const user = jwt.decode(token);
    const account = await User.find({_id: user.id});
    return account[0].accountNumber;
}

module.exports.saveUser = async (user) => {
    var holdernum = await User.find({}).count();
    holdernum += 1000001;
    user.accountNumber = holdernum;
    const holder = await User.create(user);
    return holder;
}

module.exports.saveLoan = async (req) => {
    const accNum = await this.retrieveAccNum(req.cookies.jwt);
    const bool = (req.body.loanForSelf == "Yes")? true:false;
    await Loan.create({
        accountNumber: accNum,
        loantype: req.body.loantype,
        loanForSelf: bool
    });
}

module.exports.errorHandling = (error) => {
    if(error.message.includes("validation failed")){
        var mess = "";
        Object.values(error.errors).forEach(error => {
            mess += `${error.properties.path}: ${error.properties.message} br `
        });
        return mess;
    }else{
        return error.message;
    }
}

//for testing only
module.exports.display = async (req) =>{
    console.log(req.body);
}