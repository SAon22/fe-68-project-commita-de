"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditReservationPage() {

    const { id } = useParams()
    const router = useRouter()

    const [reservation, setReservation] = useState<any>(null)
    const [shops, setShops] = useState<any[]>([])

    const [date, setDate] = useState("")
    const [duration, setDuration] = useState("")
    const [shop, setShop] = useState("")

    // 🔹 โหลด reservation + ร้าน
    useEffect(() => {

        // โหลด reservation
        fetch("/api/reservations")
            .then(res => res.json())
            .then(data => {
                const found = data.find((r: any) => r._id === id)

                setReservation(found)

                setDate(found.date)
                setDuration(found.duration)
                setShop(found.massageShop._id)
            })

        // โหลดร้านทั้งหมด
        fetch("/api/massageshops")
            .then(res => res.json())
            .then(data => setShops(data))

    }, [id])

    if (!reservation) return <div className="p-5">Loading...</div>

    // 🔹 update
    const handleUpdate = async () => {

        const res = await fetch("/api/reservations", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: reservation._id,
                date: new Date(date),
                duration: Number(duration),
                massageShop: shop
            })
        })

        if (res.ok) {
            alert("Updated")
            router.push("/showreservation")
        } else {
            alert("Update failed")
        }
    }

    return (
        <div className="p-5 max-w-md mx-auto space-y-4">

            <h1 className="text-2xl font-bold text-center">
                Edit Reservation
            </h1>

            {/* 🏪 เลือกร้าน */}
            <div>
                <label>Massage Shop</label>
                <select
                    value={shop}
                    onChange={(e) => setShop(e.target.value)}
                    className="border p-2 w-full"
                >
                    {shops.map((s) => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* 📅 วันที่ + เวลา */}
            <div>
                <label>Date & Time</label>
                <input
                    type="datetime-local"
                    value={date ? new Date(date).toISOString().slice(0,16) : ""}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>

            {/* ⏱ duration */}
            <div>
                <label>Duration (minutes)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>

            {/* 🔘 ปุ่ม */}
            <button
                onClick={handleUpdate}
                className="bg-green-500 text-white w-full p-2 rounded"
            >
                Save Changes
            </button>

        </div>
    )
}
