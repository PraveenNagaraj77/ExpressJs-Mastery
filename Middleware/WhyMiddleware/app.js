const express = require("express");
const app = express();

const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

const authenticate  = (req,res,next)=>{
    console.log("Authentication Successfull");
    next();
};

app.use(logger);
app.use(authenticate);

app.get("/dashboard",(req,res)=>{
    res.send("Dashboard");
})

app.listen(3000,()=>{
    console.log("App is Running");
})