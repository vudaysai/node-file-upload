const express = require("express");
const router = express.Router();
var multer = require("multer");
var path = require("path");
const APP_URL = "http://localhost:3000/";

const FileUpload = require("../models/FileUpload");

var jwt = require("jsonwebtoken");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadedFiles");
  },
  filename: (req, file, cb) => {
    var fileExt = path.extname(file.originalname);
    fileName = req.body.name ? req.body.name + fileExt : file.originalname;
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Sample paste bin app");
});

router.post("/", upload.single("file"), verifyInput, async function(
  req,
  res,
  next
) {
  if (!req.file) {
    return res.status(400).json({ message: "File required" });
  }
  var filePath = req.file.path;
  const fileUpload = new FileUpload({
    filePath: filePath
  });

  try {
    const newFileUpload = await fileUpload.save();
    const token = jwt.sign({ id: newFileUpload.id }, "urlExpiry", {
      expiresIn: Number(req.body.expiry) || 86400
    });
    const fileUrl = APP_URL + "uploads/" + newFileUpload.id + `?token=${token}`;
    res.status(201).json({ url: fileUrl });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", getUploadedFile, (req, res) => {
  const file = `./${res.uploadedFile.filePath}`;
  res.download(file);
});

async function verifyInput(req, res, next) {
  if (req.body.expiry && isNaN(Number(req.body.expiry))) {
    return res.status(400).json({ message: "Invalid expiry input" });
  }
}

async function getUploadedFile(req, res, next) {
  try {
    jwt.verify(req.query.token, "urlExpiry");
  } catch (err) {
    return res.status(400).json({ message: "URL expired" });
  }

  try {
    uploadedFile = await FileUpload.findById(req.params.id);
    if (uploadedFile == null) {
      return res.status(404).json({ message: "Cant find any file" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.uploadedFile = uploadedFile;
  next();
}

module.exports = router;
