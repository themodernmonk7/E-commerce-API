const Review = require("../models/reviewModel")
const Product = require("../models/productModel")
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")

// ** ===================  CREATE REVIEW  ===================
const createReview = async (req, res) => {
  const { product: productId } = req.body

  // check if product is valid or not
  const isValidProduct = await Product.findOne({ _id: productId })
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`)
  }
  // check if user is already submited review for this product or not
  const alreadySubmittedReview = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })
  if (alreadySubmittedReview) {
    throw new CustomError.BadRequestError(
      "Already submitted review for this product"
    )
  }
  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}

// ** ===================  GET ALL REVIEWS  ===================
const getAllReviews = async (req, res) => {
  res.send("Get all reviews")
}

// ** ===================  GET SINGLE REVIEW  ===================
const getSingleReview = async (req, res) => {
  res.send("Get single review")
}

// ** ===================  UPDATE REVIEW  ===================
const udpateReview = async (req, res) => {
  res.send("Udpate review")
}

// ** ===================  DELETE REVIEW  ===================
const deleteReview = async (req, res) => {
  res.send("Delete Reveiw")
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  udpateReview,
  deleteReview,
}
