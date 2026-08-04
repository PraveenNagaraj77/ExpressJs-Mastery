const { name } = require("ejs");
const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());


const userSchema = Joi.object({
    name:Joi.string().min(3).required(),
    email: Joi.string().email().required,
    age:Joi.number().min(18).required(),
});


app.post("/users", (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: value,
  });
});