const express = require("express");
const path = require("path");

const app = express();

// Serve static files with virtual path and caching
app.use(
    "/static",
    express.static(path.join(__dirname, "public"), {
        maxAge: "1d"
    })
);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "index.html"));
});

// About Route
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "about.html"));
});

app.listen(3000, () => {
    console.log("Server Running on http://localhost:3000");
});



