const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return ProduktZaOtpremnicu.init(sequelize, DataTypes);
};

class ProduktZaOtpremnicu extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        produkt: {
          type: DataTypes.INTEGER,
          references: {
            model: "Produkti",
            key: "_id",
          },
        },
        kolicina: {
          type: DataTypes.INTEGER,
          require: true,
        },
        otpremnica: {
          type: DataTypes.INTEGER,
          references: {
            model: "Otpremnice",
            key: "_id",
          },
        },
      },
      {
        sequelize,
        tableName: "ProduktZaOtpremnicu",
        timestamps: false,
        indexes: [
          {
            name: "ProduktZaOtpremnicu_pkey",
            unique: true,
            fields: [{ name: "_id" }],
          },
        ],
      }
    );
    return ProduktZaOtpremnicu;
  }
}
