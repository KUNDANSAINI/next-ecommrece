import connectToDB from "@/db/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(req,{params}){
    try{
        const id = params.id
        const authorizationHeader = req.headers.get('authorization');
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        if(!id){
            return NextResponse.json({success:false,message:"Invalid ID!"})
        }
        const getSingleUser = await User.findOne({_id:id})
        if(getSingleUser){
            return NextResponse.json({success:true,getSingleUser})
        }else{
            return NextResponse.json({success:false,message:"User Not Found!"})
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request!"})
    }
}

export async function DELETE(req,{params}){
    try{
        const id = params.id
        
        if(!id){
            return NextResponse.json({success:false,message:"Invalid ID!"})
        }
        const userCheck = await User.findOne({_id:id})
        if(userCheck){
            await User.findByIdAndDelete(id)
            return NextResponse.json({success:true})
        }else{
            return NextResponse.json({success:false,message:"User Not Found"})   
        }

    }catch(error){
        console.log(error);
        return NextResponse.json({success:false,message:"Bad Request!"})
    }
}