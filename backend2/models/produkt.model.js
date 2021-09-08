const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return Produkti.init(sequelize, DataTypes);
};

class Produkti extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        naziv: {
          type: DataTypes.STRING(100),
          required: true,
        },
        kolicina: {
          type: DataTypes.INTEGER,
          required: true,
        },
        cijena: {
          type: DataTypes.FLOAT,
          required: true,
        },
        cijenaPDV: {
          type: DataTypes.FLOAT,
          required: true,
        },
      },
      {
        sequelize,
        tableName: "Produkti",
        timestamps: false,
        indexes: [
          {
            name: "Produkti_pkey",
            unique: true,
            fields: [{ name: "_id" }],
          },
        ],
      }
    );
    return Produkti;
  }
}
