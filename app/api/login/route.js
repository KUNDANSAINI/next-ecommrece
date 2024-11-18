import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import connectToDB from "@/db/db";
import jwt from "jsonwebtoken"

connectToDB()

export const dynamic = "force/dynamic"

export async function POST(req){
    try{
        const data = await req.json()        
        const {email,password} = data
        if(!email || !password){
            return NextResponse.json({success:false,message:"All Fields Are Required!"})
        }
        const checkEmailID = await User.findOne({email})
        if(checkEmailID !== null){
            const comparePassword = await bcrypt.compare(password,checkEmailID.password)
            if(comparePassword){
                const token = jwt.sign({
                    id : checkEmailID._id,
                    email : checkEmailID.email,
                    role : checkEmailID.role
                }, "next-ecommrece",{expiresIn : "1h"})
                return NextResponse.json({
                    success:true,
                    token,
                    user : {
                        id : checkEmailID._id,
                        email : checkEmailID.email,
                        role : checkEmailID.isAdmin
                    }
                })
            }else{
                return NextResponse.json({success:false,message:"Wrong Password!"})
            }
        }else{
            return NextResponse.json({success:false,message:"Invalid Email ID!"})
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request"})
    }
}