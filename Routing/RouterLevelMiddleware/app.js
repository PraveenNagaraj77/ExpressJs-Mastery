const express = require("express");

const app = express();

const userRoutes = require("./userRoutes");

app.use("/users",userRoutes);

app.listen(3000,()=>{
    console.log("App is Running");
})

