const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());

//authentication
app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
  console.log("Server is Running....");
});



