"use client"
import ReservationList from "@/components/ReservationList";

export default function MyReservationPage() {
    return (
        <main className="p-5">
            <h1 className="text-2xl font-bold text-center mb-5">Your MassageShop Reservations</h1>
            <ReservationList/>
        </main>
    )
}