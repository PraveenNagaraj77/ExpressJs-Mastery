const express = require("express");

const router = express.Router();


//Router Level Middleware

router.use((req,res,next)=>{
    console.log("Router Level Middleware");
    next();
});


router.get("/", (req, res) => {
    res.send("All Users");
});

router.get("/profile", (req, res) => {
    res.send("User Profile");
});

module.exports = router;