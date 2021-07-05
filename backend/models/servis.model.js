const mongoose = require("mongoose");

const servisSchema = mongoose.Schema({
  name: String,
});

exports.Servis = mongoose.model("Servis", servisSchema);
