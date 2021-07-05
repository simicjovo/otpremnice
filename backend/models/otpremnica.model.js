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
});

exports.Otpremnica = mongoose.model("Otpremnica", otpremnicaSchema);
