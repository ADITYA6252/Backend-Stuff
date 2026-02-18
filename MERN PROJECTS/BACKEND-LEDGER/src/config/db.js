const mongoose = require("mongoose");

function connectTODB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log("Error Connecting to DB");
      process.exit(1);
    });
}

module.exports = connectTODB;
