import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required:true
    },
    qty:{
        type:Number,
        required:true,
        default: 1
    }
},{
    timestamps: true
})



const Cart = mongoose.models.Cart || mongoose.model("Cart",cartSchema)


export default Cart;