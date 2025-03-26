const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review_text: {
        type: String
    },
    is_verified: { type: Boolean, default: false }
}, { timestamps: true });


const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

module.exports = Review;
