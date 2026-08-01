const express = require("express");
const app = express();

const students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
  { id: 3, name: "Arun", department: "IT" },
  { id: 4, name: "Ajay", department: "CSE" },
];

//Get Students
app.get("/students", (req, res) => {
  const { department, name } = req.query;

  let filteredStudents = students;

  // Filter by department
  if (department) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.department.toLowerCase() === department.toLowerCase(),
    );
  }

  // Filter by name
  if (name) {
    filteredStudents = filteredStudents.filter(
      (student) => student.name.toLowerCase() === name.toLowerCase(),
    );
  }

  res.status(200).json({
    success: true,
    count: filteredStudents.length,
    data: filteredStudents,
  });
});
app.listen(3000, () => {
  console.log("Server Running...");
});
