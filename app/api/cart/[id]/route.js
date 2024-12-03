import Cart from "@/models/cart";
import { NextResponse } from "next/server";



export async function DELETE(req,{params}){
    try{
        const id = params.id
        if(!id){
            return NextResponse.json({success:false,message:"Invalid ID"})
        }
        
        const checkData = await Cart.findOne({_id:id})
        
        if(!checkData){
            return NextResponse.json({success:false,message:"Data Not Found"})
        }
        
        await Cart.findByIdAndDelete(id)
        return NextResponse.json({success:true})
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request"})
    }
}