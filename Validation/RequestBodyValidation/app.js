const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, email and age are required",
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      success: false,
      message: "Name must be a string",
    });
  }

  if (typeof email !== "string") {
    return res.status(400).json({
      success: false,
      message: "Email must be a string",
    });
  }

  if (typeof age !== "number") {
    return res.status(400).json({
      success: false,
      message: "Age must be a number",
    });
  }

  if (age < 18) {
    return res.status(400).json({
      success: false,
      message: "Age must be at least 18",
    });
  }

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: req.body,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});