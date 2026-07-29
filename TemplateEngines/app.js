const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    res.render("home", {
        username: "Praveen",
        age: 25
    });

});

app.get("/about", (req, res) => {

    res.render("about", {
        isLoggedIn: true
    });

});

app.get("/users", (req, res) => {

    const users = [
        "Praveen",
        "Rahul",
        "Arun"
    ];

    res.render("users", {
        users
    });

});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});