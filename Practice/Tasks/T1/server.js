const app = require("./src/app");
const connectDB = require("./src/db/db");
const DB = require("./src/db/db");

connectDB();

app.listen(3000, () => {
  console.log("server is running...");
});
