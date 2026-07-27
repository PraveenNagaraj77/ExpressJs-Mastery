const express = require("express");

const app = express();

//Application Level Middleware

app.use((req,res,next)=>{
    console.log("Application Middleware");
    next();
});

//Built in Middleware

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home");
});

//Error Handling Middleware
app.use((err,req,res,next)=>{
    res.status(500).send("Something Went Wrong");
});

app.listen(3000,()=>{
    console.log("Server Running");
})