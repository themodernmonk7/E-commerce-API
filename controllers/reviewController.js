const Review = require("../models/reviewModel")
const Product = require("../models/productModel")
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")
const { checkPermissions } = require("../utils")

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
  const review = await Review.find({})
  res.status(StatusCodes.OK).json({ total_review: review.length, review })
}

// ** ===================  GET SINGLE REVIEW  ===================
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with the the id ${reviewId}`)
  }
  res.status(StatusCodes.OK).json({ review })
}

// ** ===================  UPDATE REVIEW  ===================
const udpateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { rating, title, comment } = req.body
  // Check if review exists or not
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with the the id ${reviewId}`)
  }
  checkPermissions(req.user, review.user)

  review.rating = rating
  review.title = title
  review.comment = comment

  await review.save()
  res.status(StatusCodes.OK).json({ msg: "Success! Review has been updated" })
}

// ** ===================  DELETE REVIEW  ===================
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with the the id ${reviewId}`)
  }
  checkPermissions(req.user, review.user)
  await review.remove()
  res.status(StatusCodes.OK).json({ msg: "Success! Review has been deleted" })
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  udpateReview,
  deleteReview,
}
