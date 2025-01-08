import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId : {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    orderItems:[
        {
            qty:{
                type: Number,
                required: true
            },
            product:{
                type: mongoose.Types.ObjectId,
                ref:"Products"
            }
        }
    ],
    shippingAddress : {
        fullName:{ type:String, required: true},
        address:{ type:String, required: true},
        city:{ type:String, required: true},
        country:{ type:String, required: true},
        postalCode:{ type:String, required: true},
    },
    paymentMethod:{ type: String, required: true, default: "Stripe"},
    totalPrice:{ type: Number, required: true},
    isPaid:{ type: Boolean, required: true},
    paidAt:{ type: Date, required: true},
    isProcessing:{ type: Boolean, required: true}
},{ timestamps: true })

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order;