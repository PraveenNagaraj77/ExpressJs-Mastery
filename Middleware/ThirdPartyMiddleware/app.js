const express = require("express");

const app = express();

const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(compression());


app.listen(3000,()=>{
    console.log("Server Running");
})