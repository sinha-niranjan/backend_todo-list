const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = async function(){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET);
}

module.exports = mongoose.model("User", userSchema);