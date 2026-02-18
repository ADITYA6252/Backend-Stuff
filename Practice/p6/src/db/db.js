const mongoose = require("mongoose");

async function connnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database is connected successfully");
  } catch (err) {
    console.error("Database connection eroor", err);
  }
}

module.exports = connnectDB;
