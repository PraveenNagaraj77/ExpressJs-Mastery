const express = require("express");

const app = express();

app.route("/users")

.get((req,res)=>{
    res.send("Get all Users")
})
.post((req,res)=>{
    res.send("Create User");
}).put((req,res)=>{
    res.send("Update User")
}).delete((req,res)=>{
    res.send("Delete User")
});

app.listen(3000,()=>{
    console.log("Server Running");
})