const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
];

app.post("/students", (req, res) => {
  const { name, department } = req.body;
  if (!name || !department) {
    return res.status(400).json({
      success: false,
      message: "Name and Department are required",
    });
  }
  //create a new Student
  const newStudent = {
    id: students.length + 1,
    name,
    department,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student Created Sucessfully",
    data: newStudent,
  });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(3000, () => {
  console.log("Server Running on PORT 3000");
});
