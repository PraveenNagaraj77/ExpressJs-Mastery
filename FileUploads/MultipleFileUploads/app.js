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

const upload = multer({
  storage,
});

app.post(
  "/upload",
  upload.array("files", 5),
  (req, res) => {

    console.log("Uploaded Files:", req.files);

    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      count: req.files.length,
      files: req.files.map((file) => ({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
      })),
    });
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});