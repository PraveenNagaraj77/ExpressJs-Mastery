const express = require("express");

const app = express();

app.use(express.json());

app.get("/basic", (req, res) => {

    try {

        const result = 10 / 2;

        res.status(200).json({
            success: true,
            result,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });

    }

});

app.get("/error", (req, res) => {

    try {

        throw new Error("Something went wrong");

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

});

app.listen(3000, () => {

    console.log("Server running on port 3000");

});