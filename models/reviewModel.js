const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: String,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },

    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },

    comment: {
      type: String,
      required: [true, "Please proivde review text"],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
)

// User can leave only one review for a product
ReviewSchema.index({product: 1, user: 1}, {unique: true})

// Average rating
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
    //console.log(result) // {_id: null, averageRating: 4, numOfReviews: 2}
  ])

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        // 👇 This is optional chaining in JavaScript
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product)
})
ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product)
})


module.exports = mongoose.model("Review", ReviewSchema)
