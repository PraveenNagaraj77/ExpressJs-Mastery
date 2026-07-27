
const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome to Express Mastery");
})

app.listen(3000,()=>{
    console.log("App is Running");
});
