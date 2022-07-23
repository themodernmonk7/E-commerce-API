const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createTokenUser, attachCookiesToResponse } = require("../utils")

// Get all users
const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password")
  res.status(StatusCodes.OK).json({ total_users: user.length, user })
}

// Get single user
const getSingleUser = async (req, res) => {
  res.send("Get single user")
}

// Show current user
const showCurrentUser = async (req, res) => {
  res.send("Show current user")
}

// Update user
const updateUser = async (req, res) => {
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
