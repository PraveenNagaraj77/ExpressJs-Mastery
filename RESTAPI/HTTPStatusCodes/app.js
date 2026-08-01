const express = require("express");

const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
];

// GET STUDENT BY ID
app.get("/students/:id", (req, res) => {

  const id = Number(req.params.id);

  const student = students.find(student => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found"
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });

});

// CREATE STUDENT
app.post("/students", (req, res) => {

  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({
      success: false,
      message: "Name and Department are required"
    });
  }

  const studentExists = students.some(
    student => student.name.toLowerCase() === name.toLowerCase()
  );

  if (studentExists) {
    return res.status(409).json({
      success: false,
      message: "Student Already Exists"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    department
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student Created Successfully",
    data: newStudent
  });

});

app.listen(3000, () => {
  console.log("Server Running...");
});

