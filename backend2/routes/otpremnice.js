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
const Otpremnica = require("../models/otpremnica.model")(sequelize, DataTypes);
const Users = require("../models/user.model")(sequelize, DataTypes);
const Produkt = require("../models/produkt.model")(sequelize, DataTypes);
const ProduktZaOtpremnicu = require("../models/produktZaOtpremnicu.model")(
  sequelize,
  DataTypes
);
const router = express.Router();
const verify = require("../middleware/verifyToken");

router.get("/", verify, async (req, res) => {
  let otpremnice;
  let response;
  try {
    otpremnice = await Otpremnica.findAll({ include: [Users] });

    response = await Promise.all(
      otpremnice.map(async (elem) => {
        delete elem.dataValues.User.dataValues.passwordHash;
        return {
          ...elem.dataValues,
          komercijalista: elem.dataValues.User.dataValues,
          User: null,
          produkti: await ProduktZaOtpremnicu.findAll({
            where: { otpremnica: elem._id },
          }),
        };
      })
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
  res.json(response);
});

router.get("/:id", verify, (req, res) => {
  Otpremnica.findByPk(req.params.id, { include: [User] })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/", verify, async (req, res) => {
  try {
    await Promise.all(
      req.body.produkti.map(async (orderitem) => {
        let produkt = await Produkt.findByPk(orderitem._id);
        if (orderitem.kolicina > produkt.kolicina) {
          return res.status(400).json("Greska u kolicini");
        }
      })
    );
  } catch (e) {
    return res.status(400).json(e);
  }
  let otpremnicaResolved;
  try {
    otpremnicaResolved = await Otpremnica.create({
      komercijalista: req.user.id,
      primalac: req.body.primalac,
      ukupnaCijena: req.body.ukupnaCijena,
      ukupnaCijenaPDV: req.body.ukupnaCijenaPDV,
    });
  } catch (e) {
    return res.status(400).json(e);
  }

  try {
    await Promise.all(
      req.body.produkti.map(async (item) => {
        let produkt = await Produkt.findByPk(item._id);
        await Produkt.update(
          {
            kolicina: produkt.kolicina - item.kolicina,
          },
          { where: { _id: item._id } }
        );
      })
    );
  } catch (e) {
    return res.status(400).json(e);
  }

  try {
    await Promise.all(
      req.body.produkti.map(async (orderitem) => {
        await ProduktZaOtpremnicu.create({
          kolicina: orderitem.kolicina,
          produkt: orderitem._id,
          otpremnica: otpremnicaResolved.dataValues._id,
        });
      })
    );
  } catch (e) {
    return res.status(400).json(e);
  }

  res.json("OK");
});

router.put("/:id", verify, (req, res) => {
  Otpremnica.update(
    {
      produkti: req.body.produkti,
      komercijalista: req.body.komercijalista,
      primalac: req.body.primalac,
      ukupnaCijena: req.body.ukupnaCijena,
    },
    { where: { _id: req.params.id } }
  )
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", verify, (req, res) => {
  Otpremnica.destroy({ where: { _id: req.params.id } })
    .then((result) => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
