import connectToDB from "@/db/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

connectToDB()

export const dynamic = "force/dynamic"

export async function GET(req){
    try{
        const kidsData = await Product.find({subCategory:"Kids"})
        if(!kidsData){
            return NextResponse.json({success:false,message:"Record Not Found"})
        }

        return NextResponse.json({success:true,kidsData})
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request"})
    }
}