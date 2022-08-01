const Review = require("../models/reviewModel")
const CustomError = require("../errors")

// ** ===================  CREATE REVIEW  ===================
const createReview = async (req, res) => {
  res.send("Create review")
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
