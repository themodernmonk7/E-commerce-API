const User = require("../models/userModel")

// Register User
const register = async (req, res) => {
  res.send("Register User")
}

// Login User
const login = async (req, res) => {
  res.send("Login user")
}

// Logout User
const logout = async (req, res) => {
  res.send("Logout user")
}

module.exports = {
  register,
  login,
  logout,
}
