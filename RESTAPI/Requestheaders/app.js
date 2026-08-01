const express = require("express");

const app = express();

app.get("/students", (req, res) => {
  //Read headers
  const authorization = req.headers.authorization;
  const userAgent = req.headers["user-agent"];
  const contentType = req.headers["content-type"];

  res.status(200).json({
    success: true,
    headers: {
      authorization,
      userAgent,
      contentType,
    },
  });
});

app.listen(3000,()=>{
    console.log("Server Running...");
});

