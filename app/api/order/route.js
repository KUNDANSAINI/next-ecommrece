import connectToDB from "@/db/db";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";

connectToDB()
export const dynamic = "force/dynamic"

export async function POST(req){
    try{
        const data = await req.json()
        const {user} = data

        const newRecord = await Order.create(data)

        if(newRecord){
            await Cart.deleteMany({userID: user})

            return NextResponse.json({
                success:true,
                message:"Products Are On The Way."
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Failed To Create To Order ! Please Try Again."
            })
        }
    }catch(error){
        console.log("Submission Error",error);
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong, Please Try Again."
        })   
    }
}


export async function GET(req){
    try{
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if(!id){
            return NextResponse.json({
                success:false,
                message:"Invalid ID"
            })
        }
        
        const getAllOrder = await Order.find({userId : id}).populate("orderItems.product")
        
        if(!getAllOrder){
            return NextResponse.json({
                success:false,
                message:"Error Fetching To Ordered Products"
            })
        }

        return NextResponse.json({
            success:true,
            getAllOrder
        })

    }catch(error){
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong, Please Try Again."
        })
    }
}