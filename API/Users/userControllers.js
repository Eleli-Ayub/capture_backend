const User = require("../../Models/Usermodel");
const bcrypt = require("bcrypt");

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
    await newUser.save();
    res.json({ msg: "Created succesful" });
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
      res.json({ msg: "Login succesful" });
    }
  }
};
