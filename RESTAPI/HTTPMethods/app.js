const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Sanjjey", department: "ECE" },
];

//Get All Students

app.get("/students",(req,res)=>{
    res.status(200).json(students);
})


app.get("/students/:id",(req,res)=>{
    const id = Number(req.params.id);
    const student = students.find((s)=>s.id===id);
    if(!student){
        return res.status(404).json({
            success:false,
            message:"Student Not Found"
        });
    }
    res.status(200).json(student);
});


//POST Student

app.post("/students",(req,res)=>{
    const { name , department } = req.body;
    if(!name ||  !department){
        return res.status(400).json({
            success:false,
            message:"Name and Department are required",
        });
    }
    const newStudent = {
        id:students.length+1,
        name,
        department,
    };

    students.push(newStudent);
    res.status(201).json({
        success:true,
        data:newStudent,
    })
});


app.listen(3000,()=>{
    console.log("Server Running....");
})
