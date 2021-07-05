const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blacklist } = require("../models/blacklist.model");
const verify = require("../middleware/verifyToken");

router.post("/register", verify, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    lokacija: req.body.lokacija,
  });
  user
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.username });
  if (!user) {
    return res.status(400).send("Pogresno korisnicko ime");
  }
  if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(400).send("Pogresna sifra");
  }
  const token = jwt.sign(
    { username: user.name, id: user._id },
    process.env.SECRET_TOKEN
  );
  res.cookie("JWT-auth", token, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });
  res.json("Logged in");
});

router.get("/logout", (req, res) => {
  const JWTcookie = req.cookies["JWT-auth"];
  newBlacklist = new Blacklist({ JWTcookie });
  newBlacklist
    .save()
    .then(() => res.status(200).send("Logged out"))
    .catch((err) => res.status(400).send(err));
});
router.get("/check", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
