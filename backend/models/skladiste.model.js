const mongoose = require("mongoose");

const skladisteSchema = mongoose.Schema({
  name: String,
});

exports.Skladiste = mongoose.model("Skladiste", skladisteSchema);
