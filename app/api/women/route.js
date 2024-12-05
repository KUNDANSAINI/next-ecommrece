import connectToDB from "@/db/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

connectToDB()

export const dynamic = "force/dynamic"

export async function GET(req){
    try{
        const womenData = await Product.find({subCategory:"Women"})
        if(!womenData){
            return NextResponse.json({success:false,message:"Record Not Found"})
        }

        return NextResponse.json({success:true,womenData})
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request"})
    }
}