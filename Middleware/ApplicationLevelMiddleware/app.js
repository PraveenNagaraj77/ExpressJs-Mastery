const express = require("express");

const app = express();

// Global Middleware
app.use((req, res, next) => {

    console.log(`${req.method} ${req.originalUrl}`);

    next();

});

// Path-Specific Middleware
app.use("/admin", (req, res, next) => {

    console.log("Admin Authentication");

    next();

});

app.get("/", (req, res) => {

    res.send("Home Page");

});

app.get("/admin/dashboard", (req, res) => {

    res.send("Admin Dashboard");

});

app.listen(3000, () => {

    console.log("Server Running");

});