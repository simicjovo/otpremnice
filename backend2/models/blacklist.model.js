const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return Blacklist.init(sequelize, DataTypes);
};

class Blacklist extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        JWTcookie: {
          type: DataTypes.STRING(256),
          required: true,
        },
      },
      {
        sequelize,
        tableName: "Blacklist",
        timestamps: false,
        indexes: [
          {
            name: "Blacklist_pkey",
            unique: true,
            fields: [{ name: "_id" }],
          },
        ],
      }
    );
    return Blacklist;
  }
}
