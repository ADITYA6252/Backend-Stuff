const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");


module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;


   let user = await userModel.findOne({email: email})

   if(user) return res.status(400).send("you already have an account");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user registered successfully");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
    let{email,password} = req.body;

    let user = await userModel.findOne({email: email});

    if(!user) return res.send("email and password doesn't match");

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
           let token = generateToken(user)

           res.cookie("token", token);
           res.send("user logged in successfully");
        }
        else{
            return res.send("email and password doesn't match");
        }
    })
}