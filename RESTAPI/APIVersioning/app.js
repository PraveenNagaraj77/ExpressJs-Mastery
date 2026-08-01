const express = require("express");

const app = express();

// Version 1
app.get("/api/v1/students", (req, res) => {

  res.status(200).json({
    version: "v1",
    data: [
      {
        id: 1,
        name: "Praveen"
      },
      {
        id: 2,
        name: "Rahul"
      }
    ]
  });

});

// Version 2
app.get("/api/v2/students", (req, res) => {

  res.status(200).json({
    version: "v2",
    data: [
      {
        id: 1,
        name: "Praveen",
        department: "CSE"
      },
      {
        id: 2,
        name: "Rahul",
        department: "ECE"
      }
    ]
  });

});

app.listen(3000, () => {
  console.log("Server Running...");
});