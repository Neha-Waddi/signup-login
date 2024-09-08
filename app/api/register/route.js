import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try{
        const {name,email,password}=await req.json();
        const hashedpassword=await bcrypt.hash(password,10);

        await connectMongoDB();
        await User.create({name,email,password:hashedpassword});

        return NextResponse.json({message:"user registered "},{status:201});
    }
    catch(error){
        return NextResponse.json({message:"An error occured while registering the user"},{status:500});
    }
}