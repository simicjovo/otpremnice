const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sync = require("./models/initdb");
require("dotenv/config");

const app = express();

app.options("*", cors());

const otpremniceRouter = require("./routes/otpremnice");
const servisiRouter = require("./routes/servisi");
const produktRouter = require("./routes/produkt");
const usersRouter = require("./routes/users");

app.use(express.json());
app.use(cookieParser());
app.use("/api/otpremnice", otpremniceRouter);
app.use("/api/servisi", servisiRouter);
app.use("/api/produkt", produktRouter);
app.use("/api/users", usersRouter);

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

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
auth();

sync();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
