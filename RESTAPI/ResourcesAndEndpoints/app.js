const express = require("express");

const app = express();

const students = [
    { id: 1, name: "Praveen" },
    { id: 2, name: "Rahul" }
];

// Resource: Students
app.get("/students", (req, res) => {
    res.json(students);
});

// Resource: Products
app.get("/products", (req, res) => {
    res.json([
        { id: 1, name: "Laptop" },
        { id: 2, name: "Mouse" }
    ]);
});

// Resource: Books
app.get("/books", (req, res) => {
    res.json([
        { id: 1, title: "Node.js Guide" }
    ]);
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});