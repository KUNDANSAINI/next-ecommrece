import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URL;

async function connectToDB(){
  if (mongoose.connection.readyState >= 1) {
    return; // Already connected
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};


export default connectToDB;