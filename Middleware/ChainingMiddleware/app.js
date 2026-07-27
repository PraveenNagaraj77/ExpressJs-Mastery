const express = require("express");

const app = express();

const logger = (req, res, next) => {
    console.log("Logger");
    next();
};

const authenticate = (req, res, next) => {
    console.log("Authentication Successful");
    next();
};

const authorize = (req, res, next) => {
    console.log("Authorization Successful");
    next();
};

app.get(
    "/dashboard",
    logger,
    authenticate,
    authorize,
    (req, res) => {
        res.send("Dashboard");
    }
);

app.listen(3000, () => {
    console.log("Server Running");
});