const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      j: true,
    },
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
