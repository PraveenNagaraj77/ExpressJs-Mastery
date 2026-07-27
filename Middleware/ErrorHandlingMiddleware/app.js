const express = require("express");

const app = express();

app.get("/error", (req, res, next) => {

    const error = new Error("Something Went Wrong");

    next(error);

});

app.use((err, req, res, next) => {

    console.error(err.message);

    res.status(500).json({

        success: false,
        message: err.message

    });

});

app.listen(3000, () => {

    console.log("Server Running");

});