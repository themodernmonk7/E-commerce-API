const CustomError = require("../errors")
const { isTokenValid } = require("../utils")

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  // console.log(token)
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }

  try {
    const payload = isTokenValid({ token })
    // console.log(payload) // {name: 'Admin', userId: '1234', role: 'admin', iat: 1234, ext: 1234}
    const { name, userId, role } = payload
    req.user = { name, userId, role }
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }
}
// (...roles) = ['admin', 'owner']
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access to this route"
      )
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
}
