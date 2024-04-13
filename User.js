const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  testMarks: [Number], // Array of integers for test marks
  voiceTestMarks: [Number], // Array of integers for voice test marks
  feedback: String, // Feedback string
  notification: [String]
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
