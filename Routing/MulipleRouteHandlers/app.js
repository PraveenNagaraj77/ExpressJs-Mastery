const express = require("express");
const app = express();

const handler1 = (req,res,next)=>{
    console.log("Handler1");
    next();
}

const handler2 = (req,res,next)=>{
    console.log("Handler2");
    next();
};

const handler3 = (req, res) => {
    console.log("Handler 3");
    res.send("Request Completed");
};


app.get(
    "/users",

    (req, res, next) => {
        console.log("Logging Request");
        next();
    },

    (req, res, next) => {
        console.log("Validating Request");
        next();
    },

    (req, res) => {
        res.send("Users Retrieved Successfully");
    }
);

app.get("/profile",handler1,handler2,handler3);
app.get("/users")

app.listen(3000,()=>{
    console.log("Server Running");
})