const jwt = require("jsonwebtoken");
const User = require("./Schemas/userSchema");

const tokencheck = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err){
                res.redirect("/home/login");
            }else{
                res.locals.user = decodedToken;
                next();
            }
        });
    }else{
        res.redirect("/home/login");
    }
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodes) => {
            if(err){
                res.locals.user = null;
                next();
            }else{
                const account = await User.find({_id: decodes.id});
                res.locals.user = account[0];
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {tokencheck, checkUser};