const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://Database:ko7HlPB78Uko5Wg0@backend.tqgvths.mongodb.net/hally",
  );

  console.log("connected to DB");
}

module.exports = connectDB;
