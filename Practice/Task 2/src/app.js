const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/music", musicRoutes);

module.exports = app;
