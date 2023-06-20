const express = require("express");
const controller = require("./controller");
const middleware = require("./middleware");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(express.urlencoded());
router.use(express.json());
router.use(cookieParser());


router.get("/home", middleware.checkUser, controller.home_get);

router.get("/home/signup", middleware.checkUser, controller.signup_get);

router.post("/home/signup", middleware.checkUser, controller.signup_post);

router.get("/home/login", middleware.checkUser, controller.login_get);

router.post("/home/login", middleware.checkUser, controller.login_post);

router.get("/home/logout", middleware.checkUser, controller.logout_get);

router.get("/home/transfer", middleware.tokencheck, controller.transfer_get);

router.post("/home/transfer", middleware.tokencheck, controller.transfer_post);

router.get("/home/loan", middleware.tokencheck, controller.loan_get);

router.post("/home/loan", middleware.tokencheck, controller.loan_post);

router.get("/home/changeMpin", middleware.tokencheck, controller.mpin_get);

router.post("/home/changeMpin", middleware.tokencheck, controller.mpin_post);

router.get("/home/changeAtmPin", middleware.tokencheck, controller.atmPin_get);

router.post("/home/changeAtmPin", middleware.tokencheck, controller.atmPin_post);

router.get("/home/block", middleware.tokencheck, controller.block_get);

router.post("/home/block", middleware.tokencheck, controller.block_post);

router.get("/home/customerSupport", middleware.tokencheck, controller.customerSupport_get);

router.post("/home/customerSupport", middleware.tokencheck, controller.customerSupport_post);



module.exports = router;