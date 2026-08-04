const express = require("express");

const app = express();

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  // Validate ID
  if (isNaN(productId)) {
    return res.status(400).json({
      success: false,
      message: "Product ID must be a number",
    });
  }

  // Validate positive ID
  if (productId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Product ID must be greater than 0",
    });
  }

  res.status(200).json({
    success: true,
    message: "Valid Product ID",
    productId,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});