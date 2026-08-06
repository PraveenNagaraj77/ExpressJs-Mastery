const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// REQUEST LOGGER
// ==================================================

app.use((req, res, next) => {

    const startTime = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - startTime;

        const timestamp = new Date().toISOString();

        console.log(
            `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );

    });

    next();

});


// ==================================================
// ROUTES
// ==================================================

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "API is running"

    });

});


app.get("/users", (req, res) => {

    res.status(200).json({

        success: true,

        data: [
            {
                id: 1,
                name: "Praveen"
            },
            {
                id: 2,
                name: "Rahul"
            }
        ]

    });

});


// ==================================================
// OPERATIONAL ERROR
// ==================================================

app.get("/user-error", (req, res, next) => {

    const error = new Error(
        "User not found"
    );

    error.statusCode = 404;

    error.isOperational = true;

    next(error);

});


// ==================================================
// PROGRAMMING ERROR
// ==================================================

app.get("/server-error", (req, res) => {

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
// ERROR LOGGER + ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    console.error("");
    console.error("========== ERROR ==========");

    console.error(
        "Time:",
        new Date().toISOString()
    );

    console.error(
        "Method:",
        req.method
    );

    console.error(
        "URL:",
        req.originalUrl
    );

    console.error(
        "Status:",
        err.statusCode || 500
    );

    console.error(
        "Message:",
        err.message
    );

    console.error(
        "Stack:",
        err.stack
    );

    console.error(
        "==========================="
    );


    const statusCode = err.statusCode || 500;


    // Operational Error

    if (err.isOperational) {

        return res.status(statusCode).json({

            success: false,

            statusCode,

            message: err.message

        });

    }


    // Unexpected Error

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