const bcrypt = require("bcrypt");
const users = require("../data/user");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Email must contain @",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password Must have 8 Characters",
      });
    }

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: "User Registered",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { registerUser, loginUser };
