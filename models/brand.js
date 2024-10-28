import mongoose from "mongoose";


const brandSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    filename:{
        type:String,
        required:true
    }
},{timestamps:true})


const Brand = mongoose.models.Brand || mongoose.model("Brand",brandSchema)


export default Brand;