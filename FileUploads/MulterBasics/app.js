const express = require("express");
const multer = require("multer");

const app = express();

const upload = multer({
    dest:"/uploads",
});

app.post("/upload",upload.single("file"),(req,res)=>{
    console.log(req.file);
    res.status(200).json({
        success:true,
        message:"File Upload Successfully",
        file:req.file,
    })
})

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});

