const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return Users.init(sequelize, DataTypes);
};

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          required: true,
        },
        email: {
          type: DataTypes.STRING(100),
          required: true,
        },
        passwordHash: {
          type: DataTypes.STRING(256),
          required: true,
        },
        lokacija: {
          type: DataTypes.STRING(100),
          required: true,
        },
      },
      {
        sequelize,
        tableName: "Users",
        timestamps: false,
        indexes: [
          {
            name: "Users_pkey",
            unique: true,
            fields: [{ name: "_id" }],
          },
        ],
      }
    );
    return Users;
  }
}
