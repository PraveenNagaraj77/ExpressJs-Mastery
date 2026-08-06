const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// CUSTOM ERROR CLASS
// ==================================================

class AppError extends Error {

    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;

        this.status = `${statusCode}`.startsWith("4")
            ? "fail"
            : "error";

        // Capture where the error originated
        Error.captureStackTrace(this, this.constructor);
    }

}


// ==================================================
// USER NOT FOUND
// ==================================================

app.get("/user", (req, res, next) => {

    const userExists = false;

    if (!userExists) {

        const error = new AppError(
            "User not found",
            404
        );

        return next(error);
    }

    res.json({
        success: true,
        message: "User found",
    });

});


// ==================================================
// INVALID CREDENTIALS
// ==================================================

app.get("/login", (req, res, next) => {

    const isAuthenticated = false;

    if (!isAuthenticated) {

        return next(
            new AppError(
                "Invalid credentials",
                401
            )
        );

    }

    res.json({
        success: true,
        message: "Login successful",
    });

});


// ==================================================
// FORBIDDEN
// ==================================================

app.get("/admin", (req, res, next) => {

    const isAdmin = false;

    if (!isAdmin) {

        return next(
            new AppError(
                "Admin access required",
                403
            )
        );

    }

    res.json({
        success: true,
        message: "Welcome Admin",
    });

});


// ==================================================
// CENTRAL ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.statusCode || 500).json({

        success: false,

        statusCode: err.statusCode || 500,

        message: err.message || "Internal Server Error",

    });

});


app.listen(3000, () => {

    console.log("Server running on port 3000");

});