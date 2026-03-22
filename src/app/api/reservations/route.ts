import { dbConnect } from "@/db/dbConnect"
import Reservation from "@/db/models/Reservation"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/authOptions"

// add reservation
export async function POST(req: Request) {

    await dbConnect()

    const body = await req.json()

    try {
        const reservation = await Reservation.create(body)
        return NextResponse.json(reservation)
    } catch(err) {
        console.log(err);
        return NextResponse.json({error:"Cannot create reservation"}, {status:500})
    }
}
// show reservation
export async function GET() {

    await dbConnect()

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({message:"Unauthorized"}, {status:401})
    }

    let reservations

    if(session.user.role === "admin") {
        reservations = await Reservation.find().populate("massageShop")
    } else {
        reservations = await Reservation.find({user:session.user._id}).populate("massageShop")
    }

    return NextResponse.json(reservations)
}
// delete reservation
export async function DELETE(req: Request) {

    await dbConnect()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if(!id) {
        return NextResponse.json({error:"Missing id"}, {status:400})
    }

    try {
        await Reservation.findByIdAndDelete(id)
        return NextResponse.json({message:"Deleted"})
    } catch(err) {
        console.log(err)
        return NextResponse.json({error:"Delete failed"}, { status:500})
    }
}
