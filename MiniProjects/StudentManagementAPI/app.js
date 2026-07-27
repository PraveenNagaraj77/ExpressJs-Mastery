const express = require("express");
const app = express();
const studentRoutes  = require("./routes/studentRoutes");

app.use("/students",studentRoutes);

app.listen(3000,()=>{
    console.log("App is Running");
})