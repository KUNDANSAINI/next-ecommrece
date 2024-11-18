import mongoose from "mongoose";


const configOptions = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
}


const connectToDB = ()=>{
    const mongoose_url = process.env.MONGO_URL

    mongoose.connect(mongoose_url, configOptions).then(()=>{
        console.log("Connect To DB");
    }).catch((error)=>{
        console.log(error.message);
    })
}


export default connectToDB;