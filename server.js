var multer = require("multer");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUrl = "mongodb://mongo:27017/file-upload";

mongoose.connect(dbUrl, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const fileUploadRouter = require("./routes/upload");
app.use("/api/uploads", fileUploadRouter);

app.listen(3000, () => console.log("server started"));
