const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// USER ROUTE
// ==================================================

app.get("/user", (req, res, next) => {

    const error = new Error("User not found");

    error.statusCode = 404;

    next(error);

});


// ==================================================
// LOGIN ROUTE
// ==================================================

app.get("/login", (req, res, next) => {

    const error = new Error("Invalid credentials");

    error.statusCode = 401;

    next(error);

});


// ==================================================
// ADMIN ROUTE
// ==================================================

app.get("/admin", (req, res, next) => {

    const error = new Error("Admin access required");

    error.statusCode = 403;

    next(error);

});


// ==================================================
// SERVER ERROR
// ==================================================

app.get("/server-error", (req, res, next) => {

    try {

        throw new Error("Database connection failed");

    } catch (error) {

        next(error);

    }

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
        message: err.message || "Internal Server Error",
    });

});


// ==================================================
// SERVER
// ==================================================

app.listen(3000, () => {

    console.log("Server running on port 3000");

});