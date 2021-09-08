const sync = () => {
  const { Sequelize } = require("sequelize");
  const DataTypes = require("sequelize").DataTypes;
  const _Users = require("./user.model");
  const _Produkti = require("./produkt.model");
  const _Otpremnice = require("./otpremnica.model");
  const _Blacklist = require("./blacklist.model");
  const _ProduktZaOtpremnicu = require("./produktZaOtpremnicu.model");

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

  let Users = _Users(sequelize, DataTypes);
  let Produkti = _Produkti(sequelize, DataTypes);
  let Otpremnice = _Otpremnice(sequelize, DataTypes);
  let Blacklist = _Blacklist(sequelize, DataTypes);
  let ProduktZaOtpremnicu = _ProduktZaOtpremnicu(sequelize, DataTypes);

  Users.hasMany(Otpremnice, {
    as: "Users",
    foreignKey: "komercijalista",
  });
  Otpremnice.belongsTo(Users, { foreignKey: "komercijalista" });
  Otpremnice.hasMany(ProduktZaOtpremnicu, {
    as: "ProduktZaOtpremnicu",
    foreignKey: "otpremnica",
  });
  Produkti.hasMany(ProduktZaOtpremnicu, {
    as: "Produkti",
    foreignKey: "produkt",
  });

  const tablesSync = async () => {
    try {
      await Users.sync();
      await Produkti.sync();
      await Otpremnice.sync();
      await Blacklist.sync();
      await ProduktZaOtpremnicu.sync();
    } catch (e) {
      console.log(e);
    }
  };
  tablesSync();
};

module.exports = sync;
