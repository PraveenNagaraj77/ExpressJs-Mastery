const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG and WebP images are allowed"));
  }
};


const upload = multer({
    storage,fileFilter,limits:{
        fileSize:5*1024*1024,
    },
});

app.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
      },
    });
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});