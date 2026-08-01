const express = require("express");
const app = express();

app.get("/products",async(req,res)=>{
    try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        const products = result.products;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page-1) * limit;

        const paginatedProducts = products.slice(skip,skip+limit);

        res.status(200).json({
            success:true,
            currentPage:page,
            limit,
            totalProducts:products.length,
            totalPages:Math.ceil(products.length/limit),
            data:paginatedProducts,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
});


app.listen(3000,()=>{
    console.log("Server Running on Port 3000");
});

