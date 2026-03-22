import { dbConnect } from "@/db/dbConnect"
import Reservation from "@/db/models/Reservation"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    await dbConnect()

    const body = await req.json()

    try {
        const reservation = await Reservation.create(body)
        return NextResponse.json(reservation)
    } catch (err) {
        return NextResponse.json({ error: "Cannot create reservation" }, { status: 500 })
    }
}
