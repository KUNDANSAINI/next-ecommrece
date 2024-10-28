import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    desc:{
        type:String,
    },
    filename:{
        type:String,
        required:true
    }
},{
    timestamps: true
})



const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)


export default Category;