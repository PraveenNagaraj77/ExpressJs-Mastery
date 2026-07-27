const express = require("express");
const path = require("path");

const app = express();

// Built-in Middleware

// Parse JSON Request Body
app.use(express.json());

// Parse URL-Encoded Form Data
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Express Built-in Middleware");
});

// POST Route - JSON Data
app.post("/students", (req, res) => {

    console.log("JSON Data:");
    console.log(req.body);

    res.send("Student Created Successfully");

});

// POST Route - Form Data
app.post("/login", (req, res) => {

    console.log("Form Data:");
    console.log(req.body);

    res.send("Login Successful");

});

// Start Server
app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});