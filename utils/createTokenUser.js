const createTokenUser = (user) => {
  return { user: user.name, userId: user._id, role: user.role }
}

module.exports = createTokenUser
