require("dotenv").config();

const app = require("./src/app");
const connectTODB = require("./src/config/db");

connectTODB();

app.listen(3000, () => {
  console.log("server is running");
});

