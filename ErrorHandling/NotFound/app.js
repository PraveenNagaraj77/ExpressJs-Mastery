const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// EXISTING ROUTES
// ==================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Home Route"
    });

});


app.get("/users", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Users fetched successfully"
    });

});


app.get("/products", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Products fetched successfully"
    });

});


// ==================================================
// 404 NOT FOUND MIDDLEWARE
// ==================================================

app.use((req, res, next) => {

    const error = new Error(
        `Route not found: ${req.method} ${req.originalUrl}`
    );

    error.statusCode = 404;

    next(error);

});


// ==================================================
// CENTRAL ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message || "Internal Server Error"
    });

});


// ==================================================
// SERVER
// ==================================================

app.listen(3000, () => {

    console.log("Server running on port 3000");

});