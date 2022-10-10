const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const SignupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.json("Please enter the required field");
  }
  const UserExist = await User.findOne({ email });
  if (UserExist) {
    res.json("User Already Exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const Hashedpassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: Hashedpassword,
    });
    user
      .save()
      .then(() =>
        res.send({
            success: true,
          _id: user.id,
          email: user.email,
          username: user.username,
          token: genrateToken(user._id),
        })
      )
      .catch((err) => res.status(400).json("Error :" + err));
  }
});

const SigninUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
        success: true,
      _id: user.id,
      email: user.email,
      username: user.username,
      token: genrateToken(user._id),
    });
  } else {
    res.json("invalid Credentials");
  }

  // User.find({
  //   $and: [{ email: req.body.email }, { password: req.body.password }],
  // })
  //   .then((user) => {
  //     if (user.length === 0) res.json("user not exist");
  //     else {
  //       res.json("user exist");
  //     }
  //   })
  //   .catch((err) => res.status(400).json("Error :" + err));
});

// token genrate//

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};
const Getme = asyncHandler(async (req, res) => {
  User.findOne({_id: req.params.id}).then((e)=>{
    console.log(e);
    res.status(200).send({
        success: true,
        data:e,
    })
})
});
module.exports = { SignupUser, SigninUser, Getme };
