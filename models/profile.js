import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dob: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    ifse: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        required: true
    },
    filename: {
        type: String,
    }
}, {
    timestamps: true
})


const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema)

export default Profile;