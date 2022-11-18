const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  imageUrl: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  organization: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  location: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  phoneNumber: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
