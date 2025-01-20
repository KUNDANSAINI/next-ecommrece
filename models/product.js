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
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    warranty: {
        type: String,
    },
    color: {
        type: String,
    },
    service: {
        type: String,
    },
    pocket: {
        type: Number,
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
    size: [],
    filename: []
}, {
    timestamps: true
}
)


const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product;