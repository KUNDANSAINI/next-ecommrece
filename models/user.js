import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
})


const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;