const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// OPERATIONAL ERROR
// USER NOT FOUND
// ==================================================

app.get("/user/:id", (req, res, next) => {

    const user = null;

    if (!user) {

        const error = new Error(
            "User not found"
        );

        error.statusCode = 404;
        error.isOperational = true;

        return next(error);

    }

    res.json({
        success: true,
        data: user
    });

});


// ==================================================
// OPERATIONAL ERROR
// INVALID LOGIN
// ==================================================

app.post("/login", (req, res, next) => {

    const isValidCredentials = false;

    if (!isValidCredentials) {

        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;
        error.isOperational = true;

        return next(error);

    }

    res.json({
        success: true,
        message: "Login successful"
    });

});


// ==================================================
// OPERATIONAL ERROR
// DUPLICATE EMAIL
// ==================================================

app.post("/register", (req, res, next) => {

    const emailExists = true;

    if (emailExists) {

        const error = new Error(
            "Email already registered"
        );

        error.statusCode = 409;
        error.isOperational = true;

        return next(error);

    }

    res.status(201).json({
        success: true,
        message: "User registered"
    });

});


// ==================================================
// PROGRAMMING ERROR
// ==================================================

app.get("/programming-error", (req, res) => {

    const user = undefined;

    console.log(user.name);

});


// ==================================================
// 404 MIDDLEWARE
// ==================================================

app.use((req, res, next) => {

    const error = new Error(
        `Route not found: ${req.method} ${req.originalUrl}`
    );

    error.statusCode = 404;
    error.isOperational = true;

    next(error);

});


// ==================================================
// CENTRAL ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    console.error("ERROR:", err);

    const statusCode = err.statusCode || 500;


    // ----------------------------------------------
    // OPERATIONAL ERROR
    // ----------------------------------------------

    if (err.isOperational) {

        return res.status(statusCode).json({

            success: false,

            statusCode,

            message: err.message

        });

    }


    // ----------------------------------------------
    // PROGRAMMING / UNKNOWN ERROR
    // ----------------------------------------------

    return res.status(500).json({

        success: false,

        statusCode: 500,

        message: "Internal Server Error"

    });

});


// ==================================================
// SERVER
// ==================================================

app.listen(3000, () => {

    console.log(
        "Server running on port 3000"
    );

});