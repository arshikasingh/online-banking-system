require("dotenv").config();

const User = require("./Schemas/userSchema");
const Block = require("./Schemas/blockSchema");
const Issue = require("./Schemas/issueSchema");
const bcrypt = require("bcrypt");
const utilities = require("./utilities");


module.exports.home_get = (req, res) =>{
    res.status(200).render("home");
}

module.exports.login_get = async (req, res) =>{
    res.status(200).render("login");
}

module.exports.login_post = async (req, res) => {
    try{
        const user = await User.findOne({accountNumber: req.body.accountNumber});
        if(!user) throw new Error("User not found");
        if(user.blocked === true) throw new Error("Your account is blocked");
        const pwdcheck = await bcrypt.compare(req.body.password, user.password);
        if(!pwdcheck) throw new Error("Incorrect password");
        res.cookie("jwt", utilities.createToken(user), {httpOnly: true});
        res.status(200).redirect("/home");
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.signup_get = (req, res) =>{
    res.status(200).render("signup");
}

module.exports.signup_post = async (req, res) => {
    try{
        const user = req.body;
        if(user.password != user.confirmPassword) throw new Error("Password Mismatch");
        user.password = await bcrypt.hash(user.password, 10);
        const holder = await utilities.saveUser(user);
        res.cookie("jwt", utilities.createToken(holder), {httpOnly: true});
        res.status(200).render("success", {main: "Success!!!", message:`Your account has been created. Your account number is ${holder.accountNumber}`, submessage: "Please remember your account number and password for future use"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.transfer_get = (req, res) =>{
    res.status(200).render("transfer");
}

module.exports.transfer_post = async (req, res) => {
    try{
        const id = utilities.retrieveID(req.cookies.jwt);
        const user1 = await User.find({_id: id});
        const pwdcheck = await bcrypt.compare(req.body.password, user1[0].password);
        if(!pwdcheck) throw new Error("Incorrect password");
        const amount = parseInt(req.body.amount);
        if(user1.amount < amount) throw new Error("Insufficient balance");
        const user2 = await User.find({accountNumber: req.body.accountNumber});
        user1[0].amount -= amount;
        user2[0].amount += amount;
        await user1[0].save();
        await user2[0].save();
        res.status(200).render("success", {main: "Success!!!", message: "Transaction Successful"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.loan_get = (req, res) =>{
    res.status(200).render("loan");
}

module.exports.loan_post = async (req, res) => {
    try{
        await utilities.saveLoan(req);
        res.status(200).render("success", {main: "Success!!!", message:"Your loan request has been submitted", submessage:"We will you contact you regarding the loan"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.mpin_get = (req, res) =>{
    res.status(200).render("changempin");
}

module.exports.mpin_post = async (req, res) => { 
    try{
        if(req.body.mpin != req.body.confirmmpin) throw new Error("Confirm mpin must be the same as new mpin");
        const id = await utilities.retrieveID(req.cookies.jwt);
        const user = await User.find({_id: id});
        const pwdcheck = await bcrypt.compare(req.body.password, user[0].password);
        if(!pwdcheck) throw new Error("Incorrect password");
        user[0].mpin = req.body.mpin;
        await user[0].save();
        res.status(200).render("success", {main:"Success", message:"Your MPIN has been changed successfully"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.atmPin_get = (req, res) =>{
    res.status(200).render("changeatm");
}

module.exports.atmPin_post = async (req, res) => {
    try{
        if(req.body.atmpin != req.body.confirmAtmpin) throw new Error("Confirm Atm pin must be same as new Atm pin");
        const id = utilities.retrieveID(req.cookies.jwt);
        console.log(id);
        const user = await User.find({_id: id});
        console.log(req.body);
        const pwdcheck = await bcrypt.compare(req.body.password, user[0].password);
        if(!pwdcheck) throw new Error("Incorrect password");
        user[0].atmpin = req.body.atmpin;
        await user[0].save();
        res.status(200).render("success", {main: "Success!!!", message: "Your ATM PIN has been changed successfully"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.block_get = (req, res) =>{
    res.status(200).render("blockaccount");
}

module.exports.block_post = async (req, res) => {
    try{
        const id = utilities.retrieveID(req.cookies.jwt);
        const user = await User.find({_id: id});
        await Block.create({reason: req.body.blockReason, accountNumber: user[0].accountNumber});
        user[0].blocked = true;
        await user[0].save();
        res.cookie("jwt", "", {maxAge: 1});
        res.status(200).render("success", {main:"Success!!!", message:"Your account has been blocked", submessage:"To unblock your account reach out to us at our nearest branch"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.customerSupport_get = (req, res) =>{
    res.status(200).render("customersup");
}

module.exports.customerSupport_post = async (req, res) => {
    try{
        const accountNumber = await utilities.retrieveAccNum(req.cookies.jwt);
        await Issue.create({
            issue: req.body.issue,
            accountNumber: accountNumber
        });
        res.status(200).render("success", {main: "Success!!!", message: "We will try to resolve your issue as soon as possible"});
    }catch(e){
        const errorMessages = utilities.errorHandling(e);
        res.render("error", {main:"Oops!", message:errorMessages});
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/home");
    // res.status(200).render("home");
}