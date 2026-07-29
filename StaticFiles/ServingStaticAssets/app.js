const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html>

        <head>
            <title>Express Static Assets</title>

            <link rel="stylesheet" href="/css/style.css">
        </head>

        <body>

            <h1>Welcome to Express</h1>

            <img src="/images/logo.png" width="200">

            <script src="/js/script.js"></script>

        </body>

        </html>
    `);

});

app.listen(3000, () => {

    console.log("Server Running");

});