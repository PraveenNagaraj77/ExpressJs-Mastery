const express = require("express");
const router = express.Router();

let students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
  { id: 3, name: "Arun", department: "IT" },
];

//Router Level Middleware
router.use((req, res, next) => {
  console.log("Student Routes Accessed");
  next();
});

router
  .get("/", (req, res) => {
    res.send(students);
  })
  .post("/", (req, res) => {
    res.send("Student Created");
  });

router.get("/search/department", (req, res) => {
  const department = req.query.department;

  const filteredStudents = students.filter(
    (s) => s.department.toLowerCase() === department.toLowerCase(),
  );

  res.send(filteredStudents);
});

router
  .route("/:id")
  .get( (req, res) => {
    const studentID = Number(req.params.id);

    const student = students.find((s) => s.id === studentID);

    if (!student) {
      return res.status(404).send("Student Not Found");
    }

    res.send(student);
  })
  .put( (req, res) => {
    res.send("Student Updated");
  })
  .delete((req, res) => {
    res.send("Student Deleted");
  });

module.exports = router;
