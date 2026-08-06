const express = require("express");

const app = express();

app.use(express.json());


// ==================================================
// NORMAL ROUTE
// ==================================================

app.get("/users", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
    });

});


// ==================================================
// PASS ERROR USING next(error)
// ==================================================

app.get("/error", (req, res, next) => {

    const error = new Error("Something went wrong");

    next(error);

});


// ==================================================
// CENTRAL ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });

});


app.listen(3000, () => {

    console.log("Server running on port 3000");

});