const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createTokenUser, attachCookiesToResponse } = require("../utils")

// Register User
const register = async (req, res) => {
  const { email, name, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists")
  }
  // Add first registered user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? "admin" : "user"
  const user = await User.create({ email, name, password, role })
  // Create token user
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
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
