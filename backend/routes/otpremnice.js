const express = require("express");
const { Otpremnica } = require("../models/otpremnica.model");
const { ProduktZaOtpremnicu } = require("../models/produktZaOtpremnicu.model");
const { Produkt } = require("../models/produkt.model");
const router = express.Router();
const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  Otpremnica.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", verify, (req, res) => {
  Otpremnica.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/", verify, async (req, res) => {
  const produktiIds = Promise.all(
    req.body.produkti.map(async (orderitem) => {
      let produkt = await Produkt.findById(orderitem.product);
      if (orderitem.kolicina > produkt.kolicina) {
        return res.status(400).json("Greska u kolicini");
      }
      let newOrderItem = new ProduktZaOtpremnicu({
        kolicina: orderitem.kolicina,
        produkt: orderitem.produkt,
      });
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const produktiIdsResolved = await produktiIds;

  await Promise.all(
    req.body.produkti.map(async (item) => {
      let produkt = await Produkt.findById(item.produkt);
      await Produkt.findByIdAndUpdate(
        item.produkt,
        {
          kolicina: produkt.kolicina - item.kolicina,
        },
        { new: true }
      );
    })
  );

  const otpremnica = new Otpremnica({
    produkti: produktiIdsResolved,
    komercijalista: req.user,
  });
  otpremnica
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.statu(400).json(err));
});

router.put("/:id", verify, (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV * 1.17;

  Otpremnica.findByIdAndUpdate(
    req.params.id,
    {
      naziv: req.body.naziv,
      kolicina: req.body.kolicina,
      cijena: cijenaBezPdva,
      cijenaPDV: req.body.cijenaPDV,
    },
    { new: true }
  )
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", verify, (req, res) => {
  Otpremnica.findByIdAndRemove(req.params.id)
    .then((result) => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
