const express = require("express");

const app = express();

app.use(express.json());

app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Users fetched successfully",
    });
});

app.get("/error",(req,res)=>{
    throw new Error("Something Went Wrong..");
    console.log(error.name);
    console.log(error.stack);
    console.log(error.message);
});

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});

