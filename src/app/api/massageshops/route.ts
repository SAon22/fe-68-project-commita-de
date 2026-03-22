import { dbConnect } from "@/db/dbConnect"
import MassageShop from "@/db/models/MassageShop"
import { NextResponse } from "next/server"

export async function GET() {
    await dbConnect()

    const shops = await MassageShop.find()

    return NextResponse.json(shops)
}
