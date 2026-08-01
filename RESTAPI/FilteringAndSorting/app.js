const express = require("express");
const app = express();

app.get("/products",async(req,res)=>{
    try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();

        let products = result.products;

        const { category,sort } = req.query;

        //Filter 
        if(category){
            products = products.filter((product)=>product.category.toLowerCase()=== category.toLowerCase());
        }

        if(sort === "price"){
            products.sort((a,b)=>a.price-b.price);
        }

        if(sort==="-price"){
            products.sort((a,b)=>b.price-a.price);
        }

        res.status(200).json({
            success:true,
            totalProducts:products.length,
            data:products,
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
});

app.listen(3000,()=>{
    console.log("Server Running..");
})