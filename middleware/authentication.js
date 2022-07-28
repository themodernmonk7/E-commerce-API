const CustomError = require("../errors")
const { isTokenValid } = require("../utils")

const authenticateUser = async (req, res, next) => {
  // const token = req.cookies.token
  const token = req.signedCookies.token //geting undefinced
  console.log(token)
  if (!token) {
    console.log("error, no token present")
  } else {
    console.log("token present")
  }
  next()
}

module.exports = {
  authenticateUser,
}