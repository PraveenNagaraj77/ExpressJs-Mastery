const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Express Rest API"
    });
})


app.listen(3000,()=>{
    console.log(`Server is Running on http://localhost:3000`);
});
