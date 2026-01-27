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

//authentiction and authorization....

//cookie set and read kese krte hai
// const cookieParser = require("cookie-parser");
// const express = require("express");
// const app = express();

// app.use(cookieParser())

// app.get("/", function (req, res) {
//   res.cookie("name", "aditya");  //cookie set
//   res.send("done");
// });

// app.get("/read", function (req, res) {
//     console.log(req.cookies)     //cookie read
//   res.send("read page");
// });

// app.listen(3000);

//bcrypt kese use krte hai for password encryption..

// const express = require("express");
// const app = express();
// const bcrypt = require("bcrypt");

// app.get("/", function (req, res) {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("pololololo", salt, function (err, hash) {
//       console.log(hash)
//     });
//   });
// });

// app.listen(3000);

//decript tha password.......

// const express = require("express");
// const app = express();
// const bcrypt = require("bcrypt");

// app.get("/", function (req, res) {
//   bcrypt.compare("pololololo",  "$2b$10$QH36foNUDUwGkqukh1YWLeKCq9DMM4qa442ypGNEQhsF0v12u/9o2", function(err, result) {
//     console.log(result)
// });
// });

// app.listen(3000);

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser);

app.get("/", function (req, res) {
  let token = jwt.sign({ email: " aditya@example.com" }, "secret");
  res.cookie("token", token);
  res.send("done");
});

app.get("/read", function (req, res) {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data)
});

app.listen(3000);
