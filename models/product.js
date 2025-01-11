import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    hns: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
    },
    warranty: {
        type: String,
    },
    delivery: {
        type: String,
    },
    offers: {
        type: String,
    },
    desc: {
        type: String,
    },
    qty: {
        type: Number,
    },
    size: [],
    filename: []
}, {
    timestamps: true
}
)


const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product;