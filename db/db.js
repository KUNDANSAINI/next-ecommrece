import mongoose from "mongoose";


const connectToDB = ()=>{
    const mongoose_url = process.env.MONGO_URL

    mongoose.connect(mongoose_url).then(()=>{
        console.log("Connect To DB");
    }).catch((error)=>{
        console.log(error.message);
    })
}


export default connectToDB;