import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})



const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema)


export default Cart;