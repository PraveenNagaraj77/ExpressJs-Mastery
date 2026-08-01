const express = require("express");
const app = express();

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Keyboard", price: 1000 },
  { id: 4, name: "Mouse", price: 800 },
  { id: 5, name: "Monitor", price: 15000 },
  { id: 6, name: "Headphones", price: 2500 },
  { id: 7, name: "Speaker", price: 3500 },
  { id: 8, name: "Camera", price: 45000 },
  { id: 9, name: "Smart Watch", price: 12000 },
  { id: 10, name: "Tablet", price: 30000 },
  { id: 11, name: "Printer", price: 7000 },
  { id: 12, name: "SSD", price: 6000 },
];


app.get("/products",(req,res)=>{

    //Step1 : Read the Query Parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    
    //Step 2 : Calculate Skip
    const skip = (page-1) * limit;

    const paginatedProducts = products.slice(skip,skip+limit);

    res.status(200).json({
        currentPage:page,
        limit,
        totalProducts : products.length,
        totalPages : Math.ceil(products.length/limit),
        data:paginatedProducts
    });


})

app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
})
