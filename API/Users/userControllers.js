const User = require("../../Models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.signUp = async (req, res) => {
  const saltRounds = 10;
  const {
    imageUrl,
    firstName,
    lastName,
    organization,
    location,
    phoneNumber,
    email,
  } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    imageUrl,
    firstName,
    lastName,
    organization,
    location,
    phoneNumber,
    email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    let token;
    try {
      token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: "3h",
      });
    } catch (error) {
      console.log(error);
      const err = new Error("Error!!Something went wrong");
      return next(err);
    }
    res.status(200).json({
      msg: "Sign in succesful",
      success: true,
      data: { userId: user.id, email: user.email, token: token },
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({ msg: "Invalid details", login: false });
  } else {
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      res.json({ msg: "Invalid Credentials" });
    } else {
      let token;
      try {
        token = jwt.sign({ email, password }, process.env.SECRET_KEY, {
          expiresIn: "3h",
        });
      } catch (error) {
        console.log(error);
        const err = new Error("Error!!Something went wrong");
        return next(err);
      }
      res.status(200).json({
        msg: "Login succesful",
        success: true,
        data: { userId: user.id, email: user.email, token: token },
      });
    }
  }
};
