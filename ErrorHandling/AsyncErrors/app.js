const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// NORMAL ASYNC ROUTE
// ==================================================

app.get("/users", async (req, res, next) => {

    try {

        const users = [
            {
                id: 1,
                name: "Praveen"
            },
            {
                id: 2,
                name: "Rahul"
            }
        ];

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {

        next(error);

    }

});


// ==================================================
// ASYNC ERROR
// ==================================================

app.get("/async-error", async (req, res, next) => {

    try {

        throw new Error(
            "Something went wrong in async route"
        );

    } catch (error) {

        next(error);

    }

});


// ==================================================
// SIMULATING DATABASE ERROR
// ==================================================

app.get("/database", async (req, res, next) => {

    try {

        const databaseConnected = false;

        if (!databaseConnected) {

            throw new Error(
                "Database connection failed"
            );

        }

        res.json({
            success: true,
            message: "Database connected"
        });

    } catch (error) {

        next(error);

    }

});


// ==================================================
// SIMULATING EXTERNAL API ERROR
// ==================================================

app.get("/external-api", async (req, res, next) => {

    try {

        const apiAvailable = false;

        if (!apiAvailable) {

            throw new Error(
                "External API unavailable"
            );

        }

        res.json({
            success: true,
            message: "External API response received"
        });

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

        message:
            err.statusCode
                ? err.message
                : "Internal Server Error"

    });

});


// ==================================================
// SERVER
// ==================================================

app.listen(3000, () => {

    console.log("Server running on port 3000");

});