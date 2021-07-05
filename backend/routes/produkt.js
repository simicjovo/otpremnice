const express = require("express");
const { Produkt } = require("../models/produkt.model");
const router = express.Router();

router.get("/", (req, res) => {
  Produkt.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Produkt.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV * 1.17;

  const produkt = new Produkt({
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    cijena: cijenaBezPdva,
    cijenaPDV: req.body.cijenaPDV,
  });
  produkt
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.statu(400).json(err));
});

router.put("/:id", (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV * 1.17;

  Produkt.findByIdAndUpdate(req.params.id, {
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    cijena: cijenaBezPdva,
    cijenaPDV: req.body.cijenaPDV,
  })
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  Produkt.findByIdAndRemove(req.params.id)
    .then((result) => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
