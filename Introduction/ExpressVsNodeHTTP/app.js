const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome Home");
});

app.listen(3000,()=>{
    console.log("Server is Running on 3000");
});