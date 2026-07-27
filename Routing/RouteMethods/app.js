const express = require("express");

const app = express();

app.get("/users", (req, res) => {
    res.send("Get All Users");
});

app.post("/users", (req, res) => {
    res.send("Create New User");
});

app.put("/users/:id", (req, res) => {
    res.send("Update Entire User");
});

app.patch("/users/:id", (req, res) => {
    res.send("Update User Partially");
});

app.delete("/users/:id", (req, res) => {
    res.send("Delete User");
});

app.listen(3000, () => {
    console.log("Server Running...");
});