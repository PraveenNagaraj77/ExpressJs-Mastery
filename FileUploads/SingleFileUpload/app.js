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

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Uploaded File:", req.file);

  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    file: {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});