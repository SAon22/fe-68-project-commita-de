import User from "@/db/models/User";
import { dbConnect } from "@/db/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    await dbConnect();

    const body = await req.json();

    try {
        const user = await User.create(body);
        return NextResponse.json(user);
    } catch(err) {
        console.log(err);
        return NextResponse.json({error:"Register failed"}, {status:500});
    }
}
