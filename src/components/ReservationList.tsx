"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function ReservationList() {

    const { data: session } = useSession();
    const [reservations, setReservations] = useState<any[]>([])

    useEffect(() => {
        // 1. เช็คก่อนว่ามี session และ token หรือยัง
        if (!session || !(session.user as any).token) return;

        const fetchReservations = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${(session.user as any).token}`
                    }
                })
                const data = await res.json()
                
                if (res.ok) {
                    setReservations(data.data || [])
                } else {
                    console.error("Fetch failed:", data.message)
                }
            } catch (err) {
                console.error("Network error:", err)
            }
        }

        fetchReservations()
    }, [session])

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
                        <div className="text-sm text-gray-600">Reserved by: {r.user?.name || "Unknown User"}</div>
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
                                    if (!confirmDelete || !session) return;

                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations/${r._id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": `Bearer ${(session.user as any).token}`
                                    }
                                })
                                // update 
                                // setReservations(prev => prev.filter(item => item._id !== r._id))
                                if (res.ok) {
                                    setReservations(prev => prev.filter(item => item._id !== r._id))
                                } else {
                                    alert("Failed to delete reservation")
                                }
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
