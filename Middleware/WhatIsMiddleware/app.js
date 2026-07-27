const express = require("express");

const app = express();

app.use((req,res,next)=>{
    console.log("Middleware Executed");
    next();
})

app.get("/",(req,res)=>{
    res.send("Welcome to Express Middleware");
});

app.get("/home", (req, res) => {
    res.send("Home Page");
});


app.listen(3000,()=>{
    console.log("Server Running");
});


