// simple Routing...and express js setup.......

// const express = require("express");
// const app = express();

// app.get("/", function (req, res) {
//   res.send("hello");
// });

// app.get("/profile", function (req, res) {
//   res.send("i am the champion");
// });

// app.listen(3000);

// middlewares.......

// const express = require("express");
// const app = express();

// app.use(function (req, res, next) {
//   console.log("Middleware Chla");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("Middleware ek or chla");
//   next();
// });

// app.get("/", function (req, res) {
//   res.send("Kese Ho Bhai");
// });

// app.listen(3000);

//Error Handling...............

// const express = require("express");
// const app = express();

// app.use(function (req, res, next) {
//   console.log("Middleware Chla");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("Middleware ek or chla");
//   next();
// });

// app.get("/", function (req, res) {
//  res.send("Hello Bhai Kese Ho")
// });

// app.get("/profile", function (req, res, next) {
//  return next(new Error("somthing went wrong"))
// });

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("somthing broke!");
// });

// app.listen(3000);

//form handling and working with the forms.......

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello Bhai Kese Ho");
});

app.listen(3000);

