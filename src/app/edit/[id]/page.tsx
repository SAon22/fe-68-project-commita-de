"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react" // ต้องใช้ session เพื่อเอา token

export default function EditReservationPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data: session } = useSession() // ดึง session มาใช้

    const [reservation, setReservation] = useState<any>(null)
    const [shops, setShops] = useState<any[]>([])

    const [date, setDate] = useState("")
    const [duration, setDuration] = useState("")
    const [shop, setShop] = useState("")

    useEffect(() => {
        if (!session || !id) return;

        // 1. โหลดร้านทั้งหมด (ใช้ URL ตรงไปที่ Backend)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/massage-shops`)
            .then(res => res.json())
            .then(data => setShops(data.data || data))

        // 2. โหลด reservation (ต้องส่ง Token และใช้ URL ของ Backend)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${(session?.user as any).token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const allReservations = data.data || data; // Backend มักส่งมาใน data.data
            const found = allReservations.find((r: any) => r._id === id);

            if (!found) {
                console.log("Reservation not found");
                return;
            }

            setReservation(found);
            setDate(found.date);
            setDuration(found.duration);
            setShop(found.massageShop._id || found.massageShop);
        })
        .catch(err => console.error("Fetch error:", err));

    }, [id, session])

    if (!reservation) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-800 bg-slate-200">
                <p className="text-xl font-semibold">Loading reservation data...</p>
            </div>
        )
    }

    const handleUpdate = async () => {
        const d = new Date(date);
        const isoDate = d.toISOString().split('.')[0] + "Z";

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(session?.user as any).token}`
            },
            body: JSON.stringify({
                date: isoDate,
                duration: Number(duration)
            })
        })

        if (res.ok) {
            alert("Updated Successful")
            router.push("/showreservation")
            router.refresh();
        } else {
            const err = await res.json();
            alert("Update failed: " + err.message)
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
