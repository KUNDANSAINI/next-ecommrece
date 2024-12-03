import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    personalDetails:{
        firstName:{
            type:String,
            default:null
        },
        lastName:{
            type:String,
            default:null
        },
        dob:{
            type:Date,
            default:null
        },
        phone:{
            type:Number,
            default:null
        },
        country:{
            type:String,
            default:null
        },
        city:{
            type:String,
            default:null
        },
        pincode:{
            type:Number,
            default:null
        },
        bankName:{
            type:String,
            default:null
        },
        ifse:{
            type:String,
            default:null
        },
        branch:{
            type:String,
            default:null
        },
        accountNo:{
            type:String,
            default:null
        },
    }
},{
    timestamps: true
})


const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User;