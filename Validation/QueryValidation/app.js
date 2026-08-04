const express = require("express");

const app = express();

app.get("/products", (req, res) => {
  const {
    page = "1",
    limit = "10",
    sort = "price",
  } = req.query;

  const currentPage = Number(page);
  const pageLimit = Number(limit);

  // Page validation
  if (isNaN(currentPage) || currentPage < 1) {
    return res.status(400).json({
      success: false,
      message: "Page must be a number greater than 0",
    });
  }

  // Limit validation
  if (isNaN(pageLimit) || pageLimit < 1) {
    return res.status(400).json({
      success: false,
      message: "Limit must be a number greater than 0",
    });
  }

  // Sort validation
  const allowedSortFields = [
    "price",
    "-price",
    "rating",
    "name",
    "-name",
  ];

  if (!allowedSortFields.includes(sort)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sort field",
    });
  }

  res.status(200).json({
    success: true,
    message: "Query parameters are valid",
    filters: {
      page: currentPage,
      limit: pageLimit,
      sort,
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});