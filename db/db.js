import mongoose from "mongoose";


const configOptions = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
}


const connectToDB = ()=>{
    const mongoose_url = "mongodb+srv://kundansaini2311:b6TPryrAKaKG9voM@cluster0.irdjfb0.mongodb.net/"

    mongoose.connect(mongoose_url, configOptions).then(()=>{
        console.log("Connect To DB");
    }).catch((error)=>{
        console.log(error.message);
    })
}


export default connectToDB;