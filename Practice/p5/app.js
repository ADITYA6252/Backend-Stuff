const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const upload = require("./config/multer");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/profile/upload", function (req, res) {
  res.render("profileupload");
});

app.post(
  "/upload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile")
  },
);

app.get("/login", function (req, res) {
  res.render("login");
});

function isLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    return res.redirect("/login");
  }

  try {
    let data = jwt.verify(req.cookies.token, "shhh");
    req.user = data;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

app.get("/like/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async function (req, res) {
  await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content },
  );
  res.redirect("/profile");
});

app.get("/profile", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  await user.populate("posts");
  res.render("profile", { user });
});

app.post("/post", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });

  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/login");
});

app.post("/register", async function (req, res) {
  let { email, password, username, name, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });

      let token = jwt.sign({ email: email, userid: user._id }, "shhh");
      res.cookie("token", token);
      res.send("registered");
    });
  });
});

app.post("/login", async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.redirect("/login");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shhh");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});

app.listen(3000);
