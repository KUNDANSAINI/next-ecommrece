import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
    subCategory:{
        type:String,
        required: true
    },
    desc:{
        type:String
    }
},{
    timestamps: true
})


const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory",subCategorySchema)


export default SubCategory;