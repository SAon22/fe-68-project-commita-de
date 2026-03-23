import User from "@/db/models/User";
import { dbConnect } from "@/db/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {

    await dbConnect();

    const body = await req.json();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        
        const user = await User.create({
            ...body,
            password: hashedPassword
        });
        
        return NextResponse.json(user);
    } catch(err) {
        console.log(err);
        return NextResponse.json({error:"Register failed"}, {status:500});
    }
}
