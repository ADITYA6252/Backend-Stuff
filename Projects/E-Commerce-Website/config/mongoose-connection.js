const mongoose = require("mongoose");
const config = require("config");
const debgr = require("debug")("development:mongoose");


mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function () {
    debgr("connected");
  })
  .catch(function (err) {
    debgr(err);
  });

module.exports = mongoose.connection;

