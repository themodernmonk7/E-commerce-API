const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils")

//** ======================== Get all users ========================
const getAllUsers = async (req, res) => {
  // console.log(req.user) //check if I am getting req.user from authentication.js or not
  const user = await User.find({ role: "user" }).select("-password")
  res.status(StatusCodes.OK).json({ total_users: user.length, user })
}

//** ======================== Get single user ========================
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOne({ _id: userId }).select("-password")
  if (!user) {
    throw CustomError.NotFoundError("User does not exitst")
  }
  checkPermissions(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}

//** ======================== Show current user ========================
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

//** ======================== Update user ========================
const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide value")
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.name = name
  user.email = email
  await user.save()
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

//** ======================== Update user password ========================
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values")
  }
  const user = await User.findOne({ _id: req.user.userId })
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Wrong password provided")
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" })

}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
