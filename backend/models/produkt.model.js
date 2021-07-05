const mongoose = require("mongoose");

const produktSchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  kolicina: {
    type: Number,
    required: true,
  },
  cijena: {
    type: Number,
    required: true,
  },
  cijenaPDV: {
    type: Number,
    required: true,
  },
});

exports.Produkt = mongoose.model("Produkt", produktSchema);
