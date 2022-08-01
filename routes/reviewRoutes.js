const express = require("express")
const router = express.Router()

const {
  createReview,
  getAllReviews,
  getSingleReview,
  udpateReview,
  deleteReview,
} = require("../controllers/reviewController")

const { authenticateUser } = require("../middleware/authentication")

router.route("/").post(authenticateUser, createReview).get(getAllReviews)

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, udpateReview)
  .delete(authenticateUser, deleteReview)

module.exports = router
