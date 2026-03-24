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
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch reservations")
            }
            return res.json()
        })
.then(data => {
    const found = data.find((r: any) => r._id === id)

    if (!found) {
        console.log("Reservation not found")
        return
    }

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

    if (!reservation) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading reservation...
    </div>
  )
}

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

    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 flex justify-center items-center p-10">

        <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 w-full max-w-md border border-slate-200 space-y-5">

            <h1 className="text-3xl font-bold text-slate-800 text-center">
                Edit Reservation
            </h1>

            {/* 🏪 เลือกร้าน */}
            <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-medium">
                    Massage Shop
                </label>

                <select
                    value={shop}
                    onChange={(e) => setShop(e.target.value)}
                    className="border border-slate-300 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                    {shops.map((s) => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* 📅 วันที่ + เวลา */}
            <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-medium">
                    Date & Time
                </label>

                <input
                    type="datetime-local"
                    value={date ? new Date(date).toISOString().slice(0,16) : ""}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-slate-300 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
            </div>

            {/* ⏱ duration */}
            <div className="flex flex-col gap-1">
                <label className="text-slate-700 font-medium">
                    Duration (minutes)
                </label>

                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border border-slate-300 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
            </div>

            {/* 🔘 ปุ่ม */}
            <button
                onClick={handleUpdate}
                className="bg-slate-700 hover:bg-slate-800 text-white font-semibold p-3 rounded-lg transition w-full"
            >
                Save Changes
            </button>

        </div>

    </div>

)
}
