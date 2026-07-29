const express = require("express");
const path = require("path");

const app = express();

app.use(
    express.static(path.join(__dirname, "public"),{
        maxAge:"1d"
    }
));

app.listen(3000, () => {
    console.log("Server Running");
});