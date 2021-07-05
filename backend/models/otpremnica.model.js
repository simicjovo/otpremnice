const mongoose = require("mongoose");

const otpremnicaSchema = mongoose.Schema({
  name: String,
});

exports.Otpremnica = mongoose.model("Otpremnica", otpremnicaSchema);
