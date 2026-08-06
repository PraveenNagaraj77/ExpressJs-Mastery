const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// ENVIRONMENT
// ==================================================

const NODE_ENV = process.env.NODE_ENV || "development";

console.log("Environment:", NODE_ENV);


// ==================================================
// NORMAL ROUTE
// ==================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "API is running"
    });

});


// ==================================================
// OPERATIONAL ERROR
// ==================================================

app.get("/user", (req, res, next) => {

    const user = null;

    if (!user) {

        const error = new Error("User not found");

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
// UNEXPECTED ERROR
// ==================================================

app.get("/server-error", (req, res, next) => {

    try {

        throw new Error(
            "Database connection failed"
        );

    } catch (error) {

        next(error);

    }

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


    // ==================================================
    // DEVELOPMENT
    // ==================================================

    if (NODE_ENV === "development") {

        return res.status(statusCode).json({

            success: false,

            statusCode,

            message: err.message,

            stack: err.stack

        });

    }


    // ==================================================
    // PRODUCTION
    // ==================================================

    if (NODE_ENV === "production") {

        // Expected / operational error

        if (err.isOperational) {

            return res.status(statusCode).json({

                success: false,

                statusCode,

                message: err.message

            });

        }


        // Unexpected error

        return res.status(500).json({

            success: false,

            statusCode: 500,

            message: "Internal Server Error"

        });

    }


    // ==================================================
    // FALLBACK
    // ==================================================

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