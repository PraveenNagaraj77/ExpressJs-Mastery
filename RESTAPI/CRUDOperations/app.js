const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
  { id: 3, name: "Arun", department: "IT" },
];

// ================= GET ALL STUDENTS =================
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// ================= GET STUDENT BY ID =================
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  res.status(200).json(student);
});

// ================= CREATE STUDENT =================
app.post("/students", (req, res) => {
  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({
      success: false,
      message: "Name and Department are required",
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    department,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student Created Successfully",
    data: newStudent,
  });
});

// ================= UPDATE STUDENT =================
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, department } = req.body;

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  student.name = name;
  student.department = department;

  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
    data: student,
  });
});

// ================= PARTIALLY UPDATE STUDENT =================
app.patch("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  // Find the student
  const student = students.find((student) => student.id === id);

  // Check if student exists
  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  // Update only the fields provided
  if (req.body.name) {
    student.name = req.body.name;
  }

  if (req.body.department) {
    student.department = req.body.department;
  }

  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
    data: student,
  });
});

// ================= DELETE STUDENT =================
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  const deletedStudent = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Student Deleted Successfully",
    data: deletedStudent,
  });
});

app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
