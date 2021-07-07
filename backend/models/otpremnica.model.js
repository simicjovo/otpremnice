const mongoose = require("mongoose");

const otpremnicaSchema = mongoose.Schema({
  produkti: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProduktZaOtpremnicu",
    },
  ],
  komercijalista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  primalac: {
    type: String,
    required: true,
  },
  ukupnaCijena: {
    type: Number,
    required: true,
  },
  ukupnaCijenaPDV: {
    type: Number,
    required: true,
  },
  datum: {
    type: Date,
    default: Date.now,
  },
});

exports.Otpremnica = mongoose.model("Otpremnica", otpremnicaSchema);
