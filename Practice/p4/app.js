const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "krish",
    age: 22,
    email: "krish@gmail.com",
  });

  res.send(user);
});

app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "hello bhai",
    user: "6975f2e91f80062b8d400988",
  });

  let user = await userModel.findOne({ _id: "6975f2e91f80062b8d400988" });
  user.posts.push(post._id);
  await user.save();
  res.send({
    post: post,
    user: user,
  });

  console.log(user);
});

app.listen(3000);
