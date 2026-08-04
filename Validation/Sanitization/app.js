const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  let { name, email, city } = req.body;

  // Sanitization
  name = name?.trim();
  email = email?.trim().toLowerCase();
  city = city?.trim();

  // Validation
  if (!name || !email || !city) {
    return res.status(400).json({
      success: false,
      message: "Name, email and city are required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  res.status(200).json({
    success: true,
    message: "User data processed successfully",
    data: {
      name,
      email,
      city,
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});