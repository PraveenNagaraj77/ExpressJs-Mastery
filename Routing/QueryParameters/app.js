const express = require("express");

const app = express();

app.get("/products", (req, res) => {

    const category = req.query.category;
    const page = req.query.page;

    res.send(`Category: ${category}, Page: ${page}`);

});

app.listen(3000, () => {

    console.log("Server Running...");

});