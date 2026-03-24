"use client"
import { useEffect, useState } from "react"
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { useSession } from "next-auth/react"

export default function ReservationPage() {

    const { data: session } = useSession()

    const [shops, setShops] = useState<any[]>([])
    const [shop, setShop] = useState("")
    const [date, setDate] = useState<Dayjs | null>(null)
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState("")

    // from backend
    useEffect(() => {
        // fetch("/api/massageshops")
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/massage-shops`)
            .then(res => res.json())
            .then(data => { setShops(data.data || data) })
    }, [])

    const toMinutes = (t: string) => {
        const [h, m] = t.split(":").map(Number)
        return h * 60 + m
    }

    const handleReservation = async () => {

        if (!session) {
            alert("Please login")
            return
        }

        if (!shop || !date || !time || !duration) {
            alert("Please fill all information")
            return
        }

        const selectedShop = shops.find(s => s._id === shop)

        if (!selectedShop) {
            alert("Invalid shop")
            return
        }

        const [openTime, closeTime] = selectedShop.openCloseTime.split(" - ")

        const start = toMinutes(time)
        const open = toMinutes(openTime)
        const close = toMinutes(closeTime)
        const end = start + Number(duration)

        if (start < open || end > close) {
            alert(`Shop open from ${openTime} to ${closeTime}`)
            return
        }

        const dateTime = new Date(`${date.format("YYYY-MM-DD")}T${time}:00`)

        const item = {
            // user: session.user._id,
            massageShop: shop,
            date: dateTime,
            duration: Number(duration)
        }

        // const res = await fetch("/api/reservations", {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(session?.user as any).token}` 
            },
            body: JSON.stringify(item)
        })

        if (res.ok) {
            alert("Reservation Successful")
        } else {
            const errorData = await res.json();
            alert(`Error: ${errorData.message || "creating reservation"}`);
}
    }

    return (

    <main className="bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 border border-slate-200">

        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Reserve Massage
        </h1>

        <div className="flex flex-col gap-5">

            {/* select massageshop */}
            <FormControl fullWidth>
                <InputLabel>Massage Shop</InputLabel>
                <Select
                    value={shop}
                    label="Massage Shop"
                    onChange={(e) => setShop(e.target.value)}
                >
                    {shops.map((s: any) => (
                        <MenuItem key={s._id} value={s._id}>
                            {s.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Reservation Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    sx={{ width: "100%" }}
                />
            </LocalizationProvider>

            {/* time */}
            <TextField
                label="Start Time (HH:mm)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="14:00"
                fullWidth
            />

            {/* duration */}
            <TextField
                label="Duration (minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="60"
                fullWidth
            />

            <Button
                variant="contained"
                onClick={handleReservation}
                fullWidth
                sx={{
                    backgroundColor: "#334155",
                    padding: "12px",
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: "#1e293b"
                    }
                }}
            >
                Reserve
            </Button>

        </div>

    </main>

)
}
