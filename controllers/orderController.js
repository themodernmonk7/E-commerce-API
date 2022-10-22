// ** ===================  GET ALL ORDERS  ===================
const getAllOrders = async (req, res) => {
  res.send("Get all orders")
}

// ** ===================  GET SINGLE ORDERS  ===================
const getSingleOrder = async (req, res) => {
  res.send("Get single order")
}

// ** ===================  GET CURRENT USER ORDERS ORDERS  ===================
const getCurrentUserOrder = async (req, res) => {
  res.send("Get current user order")
}

// ** ===================  CREATE ORDER  ===================
const createOrder = async (req, res) => {
  res.send("Create order")
}

// ** ===================  UPDATE ORDER  ===================
const updateOrder = async (req, res) => {
  res.send("Update order")
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  createOrder,
  updateOrder,
}
