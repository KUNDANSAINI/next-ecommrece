import connectToDB from "@/db/db";
import { API_URL, SESSION_KEY } from "@/env";
import { NextResponse } from "next/server";
const stripe = require('stripe')(SESSION_KEY)

connectToDB()

export const dynamic = "force/dynamic"

export async function POST(req){
    try{
        const res = await req.json()

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items : res,
            mode : "payment",
            success_url : `http://localhost:3000/checkout` + "?status=success",
            cancel_url : `http://localhost:3000/checkout` + "?status=cancel"
        })

        return NextResponse.json({success:true, id:session.id})
        
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request"})
    }
}