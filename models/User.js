const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter an email"],
    unique: [true, "Email is already exist"],
  },

  password: {
    type: String,
    required: [true, "Please Enter a password"],
    minlength: [6, "Password atleast 6 character long"],
    Select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
