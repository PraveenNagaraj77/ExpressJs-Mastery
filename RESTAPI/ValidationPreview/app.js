const express = require("express");

const app = express();

app.use(express.json());

app.post("/students", (req, res) => {

    const { name, department } = req.body;

    // Name Validation
    if (!name) {

        return res.status(400).json({
            success: false,
            message: "Name is required"
        });

    }

    // Department Validation
    if (!department) {

        return res.status(400).json({
            success: false,
            message: "Department is required"
        });

    }

    res.status(201).json({
        success: true,
        message: "Student Created Successfully",
        student: {
            name,
            department
        }
    });

});

app.listen(3000, () => {
    console.log("Server Running...");
});