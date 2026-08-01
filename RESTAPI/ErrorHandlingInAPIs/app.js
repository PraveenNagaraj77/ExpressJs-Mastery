const express = require("express");
const errorHandler = require("./errorHandler");

const app = express();

app.get("/student/:id", (req, res, next) => {

    try {

        const student = null;

        if (!student) {

            const error = new Error("Student Not Found");

            error.statusCode = 404;

            throw error;

        }

        res.json(student);

    } catch (error) {

        next(error);

    }

});

app.use(errorHandler);

app.listen(3000, () => {

    console.log("Server Running...");

});