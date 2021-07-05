const mongoose = require("mongoose");

const produktZaOtpremnicuSchema = mongoose.Schema({
  kolicina: {
    type: Number,
    required: true,
  },
  produkt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produkt",
  },
});

exports.ProduktZaOtpremnicu = mongoose.model(
  "ProduktZaOtpremnicu",
  produktZaOtpremnicuSchema
);
