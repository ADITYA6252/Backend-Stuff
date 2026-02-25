require("dotenv").config();
const path = require("path");
const express = require("express");

const app = require("./src/app");

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "Frontend/dist")));

app.get(/.*/, (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});