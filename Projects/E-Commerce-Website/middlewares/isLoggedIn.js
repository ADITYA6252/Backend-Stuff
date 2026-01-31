const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      req.flash("error", "You need to login first");
      return res.redirect("/");
    }

    
    let decoded = jwt.verify(
      req.cookies.token,
      process.env.JWT_KEY
    );
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }
    next();
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};
