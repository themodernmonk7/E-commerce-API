const CustomError = require("../errors")
const { isTokenValid } = require("../utils")

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  console.log(token)
  if (!token) {
    console.log("error, no token present")
  } else {
    console.log("token presetn")
  }
  next()
}

module.exports = { authenticateUser }