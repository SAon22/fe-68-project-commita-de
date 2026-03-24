"use client"
import ReservationList from "@/components/ReservationList";

export default function MyReservationPage() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 flex justify-center p-10">

            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 w-full max-w-5xl border border-slate-200">

                <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
                    My Reservations
                </h1>

                <ReservationList/>

            </div>

        </div>

    )

}