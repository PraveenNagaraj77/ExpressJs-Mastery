const express = require("express");

const app = express();

app.use(express.json());


// 200
app.get("/users", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Users fetched successfully"
    });

});


// 201
app.post("/users", (req, res) => {

    res.status(201).json({
        success: true,
        message: "User created successfully"
    });

});


// 400
app.get("/bad-request", (req, res) => {

    res.status(400).json({
        success: false,
        message: "Invalid request"
    });

});


// 401
app.get("/unauthorized", (req, res) => {

    res.status(401).json({
        success: false,
        message: "Authentication required"
    });

});


// 403
app.get("/forbidden", (req, res) => {

    res.status(403).json({
        success: false,
        message: "You don't have permission"
    });

});


// 404
app.get("/not-found", (req, res) => {

    res.status(404).json({
        success: false,
        message: "Resource not found"
    });

});


// 409
app.get("/conflict", (req, res) => {

    res.status(409).json({
        success: false,
        message: "Resource already exists"
    });

});


// 422
app.get("/validation-error", (req, res) => {

    res.status(422).json({
        success: false,
        message: "Validation failed"
    });

});


// 429
app.get("/rate-limit", (req, res) => {

    res.status(429).json({
        success: false,
        message: "Too many requests"
    });

});


// 500
app.get("/server-error", (req, res, next) => {

    const error = new Error(
        "Database connection failed"
    );

    error.statusCode = 500;

    next(error);

});


// 503
app.get("/service-unavailable", (req, res) => {

    res.status(503).json({
        success: false,
        message: "Service temporarily unavailable"
    });

});


// Central Error Handler
app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message:
            err.statusCode
                ? err.message
                : "Internal Server Error"
    });

});


app.listen(3000, () => {

    console.log("Server running on port 3000");

});