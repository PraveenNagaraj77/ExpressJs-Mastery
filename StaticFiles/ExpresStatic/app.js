const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Express Static Middleware");
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});