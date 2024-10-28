import { NextResponse } from "next/server";
import connectToDB from "@/db/db";
import SubCategory from "@/models/subCategory";

connectToDB()

export const dynamic = "force/dynamic"

export async function DELETE(req,{params}){
    try{
        const id = params.id
        if(!id){
            return NextResponse.json({success:false,message:"Invalid ID!"})
        }
        
        const checkData = await SubCategory.findOne({_id:id})
        if(!checkData){
            return NextResponse.json({success:false,message:"Data Not Found!"})
        }else{
            await SubCategory.findByIdAndDelete(id)
            return NextResponse.json({success:true})
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request!"})
    }
}