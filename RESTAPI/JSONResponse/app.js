const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Praveen", department: "CSE" },
  { id: 2, name: "Rahul", department: "ECE" },
  { id: 3, name: "Arun", department: "IT" },
];

//Get All Students

app.get("/students",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Students Fetched Successfully",
        count:students.length,
        data:students,
    })
});


//Get Student by Id
app.get("/students/:id",(req,res)=>{
    const id = Number(req.params.id);

    const student = students.find((student)=>student.id===id);

    if(!student){
        return res.status(404).json({
            success:false,
            message:"Student Not Found"
        });
    };

    res.status(200).json({
        success:true,
        message:"Student Fetched Successfully",
        data:student,
    })

})

app.listen(3000,()=>{
    console.log("Server Running...");
})