const express = require("express");

const app = express();

const students = [
    { id: 1, name: "Praveen" },
    { id: 2, name: "Rahul" }
];

// GET all students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST student
app.post("/students", (req, res) => {
    res.json({
        message: "Student Created"
    });
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});