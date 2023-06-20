const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const path = require("path");
const middleware = require("./middleware");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://localhost:27017/bank", () => console.log("connected"), () => console.log("db connection error"));


const app = express();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "renderfolder"));
app.use("/static", express.static("static"));
app.use(cookieParser());



app.use(router);
app.use(express.urlencoded());
app.use(express.json());

app.listen(80, () => {
    console.log("Listening...");
});

