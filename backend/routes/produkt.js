const express = require("express");
const { Produkt } = require("../models/produkt.model");
const router = express.Router();
const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  Produkt.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", verify, (req, res) => {
  Produkt.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/", verify, (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV / 1.17;

  const produkt = new Produkt({
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    cijena: cijenaBezPdva.toFixed(2),
    cijenaPDV: req.body.cijenaPDV,
  });
  produkt
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", verify, (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV / 1.17;

  Produkt.findByIdAndUpdate(req.params.id, {
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    cijena: cijenaBezPdva.toFixed(2),
    cijenaPDV: req.body.cijenaPDV,
  })
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", verify, (req, res) => {
  Produkt.findByIdAndRemove(req.params.id)
    .then((result) => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
