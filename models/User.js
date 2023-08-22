const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const crypto = require("crypto")

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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
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

userSchema.methods.getResetPasswordToken = async function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken  = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 10*60*1000;

  return resetToken;
}


module.exports = mongoose.model("User", userSchema);
