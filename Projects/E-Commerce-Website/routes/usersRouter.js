const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authcontroller");
const { route } = require("./ownersRouter");



router.get("/", (req, res) => {
  res.send("Owners Router Working");
});

router.post("/register", registerUser);

router.post("/login", loginUser)

module.exports = router;
