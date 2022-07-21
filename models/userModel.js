const mongoose = require("mongoose")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please prove nam"],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please provdie email"],
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  role: {
    type: String,
    enum: ["amdin", "user"],
    default: "user",
  },
})

module.exports = mongoose.model("User", UserSchema)
