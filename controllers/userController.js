const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createTokenUser, attachCookiesToResponse } = require("../utils")

// Get all users
const getAllUsers = async (req, res) => {
  console.log(req.user)
  const user = await User.find({ role: "user" }).select("-password")
  res.status(StatusCodes.OK).json({ total_users: user.length, user })
}

// Get single user
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    throw CustomError.NotFoundError("User does not exitst")
  }
  res.status(StatusCodes.OK).json({ user })
}

// Show current user
const showCurrentUser = async (req, res) => {
  res.send("Show current user")
}

// Update user
const updateUser = (req, res) => {
  res.send("Update user")
}

// Updat user password
const updateUserPassword = async (req, res) => {
  res.send("Update user password")
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
