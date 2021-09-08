const jwt = require("jsonwebtoken");
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

const Blacklist = require("../models/blacklist.model")(sequelize, DataTypes);

const auth = async (req, res, next) => {
  let token = false;
  if (req.cookies) {
    token = req.cookies["JWT-auth"];
  }
  if (!token) return res.status(401).send("Access Denied");

  try {
    const alreadyExists = await Blacklist.findOne({
      where: { JWTcookie: token },
    });
    console.log(alreadyExists);
    if (!alreadyExists) {
      const verified = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = verified;
      next();
    } else {
      res.status(401).send("Blacklisted token");
    }
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

module.exports = auth;
