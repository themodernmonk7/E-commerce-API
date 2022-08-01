const CustomError = require("../errors/")

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser) //{ name: 'John', userId: '62e683182f2eb3f370d67091', role: 'user' }
  //   console.log(resourceId) //new ObjectId("62dbfca7d0ddca357ec23071")
  //   console.log(typeof resourceId) //object

  if (requestUser.role === "admin") return //res.status(....)
  if (requestUser.userId === resourceUserId.toString()) return //res.status(....)
  throw new CustomError.UnauthorizedError("Not authorized to access this route")
}

module.exports = checkPermissions
