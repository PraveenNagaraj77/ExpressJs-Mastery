const express = require("express");
const router = express.Router();

const { registerUser,loginUser } = require("../controllers/authController");
const authenticateUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const authorizePermission = require("../middleware/permissionMiddleware");
const { user } = require("../utils/permissions");






router.post("/register",registerUser);
router.post("/login",loginUser);

//Protected Routes
router.get("/dashboard",authenticateUser ,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Dashboard",
        user:req.user,
    })
})

router.get("/admin-dashboard",authenticateUser,authorizeRoles("admin"),(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome Admin",
        user:req.user,
    })
})


router.delete("/products/:id",authenticateUser,authorizePermission("products:delete"),(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully",
        user:req.user,
    })
})


module.exports = router;