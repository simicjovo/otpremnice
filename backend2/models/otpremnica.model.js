const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return Otpremnice.init(sequelize, DataTypes);
};

class Otpremnice extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        // produkti: [
        //     {
        //       type: mongoose.Schema.Types.ObjectId,
        //       ref: "ProduktZaOtpremnicu",
        //     },
        //   ],
        komercijalista: {
          type: DataTypes.INTEGER,
          references: {
            model: "Users",
            key: "_id",
          },
        },
        primalac: {
          type: DataTypes.STRING(100),
          required: true,
        },
        ukupnaCijena: {
          type: DataTypes.FLOAT,
          required: true,
        },
        ukupnaCijenaPDV: {
          type: DataTypes.FLOAT,
          required: true,
        },
        datum: {
          type: DataTypes.DATE,
          defaultValue: Date.now,
        },
      },
      {
        sequelize,
        tableName: "Otpremnice",
        timestamps: false,
        indexes: [
          {
            name: "Otpremnice_pkey",
            unique: true,
            fields: [{ name: "_id" }],
          },
        ],
      }
    );
    return Otpremnice;
  }
}
