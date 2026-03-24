import { dbConnect } from "@/db/dbConnect"
import Reservation from "@/db/models/Reservation"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/authOptions"

// add reservation
export async function POST(req: Request) {

    await dbConnect();

    const body = await req.json();
    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({error:"Unauthorized"}, {status:401});
    }

    const count = await Reservation.countDocuments({user: session.user._id});

    if(count >= 3) {
        return NextResponse.json({error: "You can reserve up to 3 only"}, {status:400});
    }
    
    try {
        const reservation = await Reservation.create(body);
        return NextResponse.json(reservation);
    } catch(err) {
        console.log(err);
        return NextResponse.json({error:"Cannot create reservation"}, {status:500});
    }
    
}
// show reservation
export async function GET() {

    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({message:"Unauthorized"}, {status:401});
    }

    let reservations;

    if(session.user.role === "admin") {
        reservations = await Reservation.find().populate("massageShop").populate("user", "name");
    } else {
        reservations = await Reservation.find({user:session.user._id}).populate("massageShop").populate("user", "name");
    }

    return NextResponse.json(reservations);
}
// delete reservation
export async function DELETE(req: Request) {

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if(!id) {
        return NextResponse.json({error:"Missing id"}, {status:400});
    }

    try {
        await Reservation.findByIdAndDelete(id);
        return NextResponse.json({message:"Deleted"});
    } catch(err) {
        console.log(err);
        return NextResponse.json({error:"Delete failed"}, { status:500});
    }
}
// edit reservation
export async function PUT(req: Request) {

    await dbConnect();

    const session = await getServerSession(authOptions);
    if(!session) {
        return NextResponse.json({error:"Unauthorized"}, {status:401});
    }

    const body = await req.json();
    const {id, date, duration, massageShop} = body;

    try {
        const reservation = await Reservation.findById(id);

        if(!reservation) {
            return NextResponse.json({error:"Not found"}, {status:404});
        }
        // user edit own
        if (session.user.role !== "admin" && reservation.user.toString() !== session.user._id) {
            return NextResponse.json({error:"Forbidden"}, {status:403});
        }

        reservation.date = date;
        reservation.duration = duration;
        reservation.massageShop = massageShop;

        await reservation.save();

        return NextResponse.json(reservation);
    } catch(err) {
        console.log(err)
        return NextResponse.json({error:"Update failed"}, {status:500});
    }
}

