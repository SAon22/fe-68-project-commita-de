"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ReservationList() {

    const [reservations, setReservations] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/reservations")
            .then(res => res.json())
            .then(data => setReservations(data))
    }, [])

    if (reservations.length === 0) {
        return (
            <div className="text-center mt-10 text-xl">
                No Reservation
            </div>
        )
    }

    return (
        <div className="space-y-4 p-5">
            {reservations.map((r) => (
                <div key={r._id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
                    <div>
                        <div className="font-bold text-lg">{r.massageShop.name}</div>
                        <div>{new Date(r.date).toLocaleString()}</div>
                        <div>Duration: {r.duration} mins</div>
                    </div>
                    <div className="flex gap-2">
                        {/* edit button */}
                        <Link href={`/edit/${r._id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                Edit
                            </button>
                        </Link>

                        {/* delete button */}
                        <button
                            onClick={async () => {

                                const confirmDelete = confirm("Delete this reservation?")
                                if (!confirmDelete) return

                                await fetch(`/api/reservations?id=${r._id}`, {
                                    method: "DELETE"
                                })
                                // update 
                                setReservations(prev => prev.filter(item => item._id !== r._id))
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
