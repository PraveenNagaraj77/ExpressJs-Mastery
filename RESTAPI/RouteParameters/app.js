const express = require("express");
const app = express();

const students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
  { id: 3, name: "Arun", department: "IT" },
];

// Get Student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});