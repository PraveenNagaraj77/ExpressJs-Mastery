const express = require("express");

const userSchema = require("./schemas/userSchema");
const validate = require("./middleware/validate");

const app = express();

app.use(express.json());

app.post(
  "/users",
  validate(userSchema),
  (req, res) => {
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: req.body,
    });
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});