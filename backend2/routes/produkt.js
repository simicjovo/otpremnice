const express = require("express");
const DataTypes = require("sequelize").DataTypes;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "Otpremnice",
  "SA",
  "<YourNewStrong@Passw0rd>",
  {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);
const Produkt = require("../models/produkt.model")(sequelize, DataTypes);
const router = express.Router();
const verify = require("../middleware/verifyToken");

router.get("/", (req, res) => {
  Produkt.findAll()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", verify, (req, res) => {
  Produkt.findByPk(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV / 1.17;

  Produkt.create({
    naziv: req.body.naziv,
    kolicina: req.body.kolicina,
    cijena: cijenaBezPdva.toFixed(2),
    cijenaPDV: req.body.cijenaPDV,
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", verify, (req, res) => {
  const cijenaBezPdva = req.body.cijenaPDV / 1.17;

  Produkt.update(
    {
      naziv: req.body.naziv,
      kolicina: req.body.kolicina,
      cijena: cijenaBezPdva.toFixed(2),
      cijenaPDV: req.body.cijenaPDV,
    },
    { where: { _id: req.params.id } }
  )
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", verify, (req, res) => {
  Produkt.destroy({ where: { _id: req.params.id } })
    .then((result) => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
