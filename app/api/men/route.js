import connectToDB from "@/db/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

connectToDB()
export const dynamic = "force/dynamic"

export async function GET(req){
    try{
        const mensData = await Product.find({subCategory:"Men"})
        if(!mensData){
            return NextResponse.json({success:false,message:"Record Not Found"})
        }

        return NextResponse.json({success:true,mensData})
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request"})
    }
}