const mongoose = require("mongoose");

// UserInfo Schema
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

const userModel =mongoose.model("users",userSchema);
module.exports=userModel;

