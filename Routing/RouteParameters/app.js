const express = require("express");

const app = express();

app.get("/users/:id", (req, res) => {

    const userId = req.params.id;

    res.send(`User ID : ${userId}`);

});


app.get("/users/:userId/orders/:orderId", (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId
    res.send(`User ID : ${userId} - Order ID : ${orderId}`);

});

app.listen(3000, () => {

    console.log("Server Running...");

});