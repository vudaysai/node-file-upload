const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  filePath: { type: String, required: true }
});

module.exports = mongoose.model("FileUploadSchema", fileUploadSchema);
