const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName = crypto.randomUUID() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG and WebP images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const productUpload = upload.fields([
  {
    name: "productImage",
    maxCount: 1,
  },
  {
    name: "gallery",
    maxCount: 5,
  },
]);


app.post(
  "/products/images",
  productUpload,
  (req, res) => {

    console.log(req.files);

    res.status(201).json({
      success: true,
      message: "Product images uploaded successfully",
      files: req.files,
    });
  }
);


