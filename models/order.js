import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
        }
    ],
    shipping: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    totalPrice: { type: Number, required: true },
    cancellation_reason: {
        type: String,
        default: null
    },
    isProcessing: { type: Boolean, required: true },
    status: {
        type: String,
        default: "Pending",
        required: true
    }
}, { timestamps: true })

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order;