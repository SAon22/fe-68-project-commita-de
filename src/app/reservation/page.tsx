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
        fetch("/api/massageshops")
            .then(res => res.json())
            .then(data => setShops(data))
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
            user: session.user._id,
            massageShop: shop,
            date: dateTime,
            duration: Number(duration)
        }

        const res = await fetch("/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })

        if (res.ok) {
            alert("Reservation Successful")
        } else {
            alert("Error creating reservation")
        }
    }

    return (
        <main className="p-5 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold">Reserve Massage</h1>

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
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    sx={{ width: '100%' }}
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
                fullWidth
            />

            <Button variant="contained" onClick={handleReservation} fullWidth>
                Reserve
            </Button>
        </main>
    )
}
