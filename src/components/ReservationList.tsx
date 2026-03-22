"use client"
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/reserveSlice";
import { ReservationItem } from "../../interface";

export default function ReservationList() {

    const reserveItems = useAppSelector((state) => state.reserveSlice.reserveItems);
    const dispatch = useDispatch();

    const calculateEndTime = (startTime: string, duration: number) => {
        const [hour, minute] = startTime.split(":").map(Number)
        const totalMinutes = hour * 60 + minute + duration

        const endHour = Math.floor(totalMinutes / 60) % 24
        const endMinute = totalMinutes % 60

        return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`
    }

    if (reserveItems.length === 0) {
        return (
            <div className="text-center text-xl font-semibold mt-10">
                No Reservation
            </div>
        );
    }

    return (
        <div className="space-y-4 p-5">
            {reserveItems.map((item: ReservationItem) => (
                <div key={`${item.shopName}-${item.date}-${item.startTime}`}
                    className="bg-slate-100 rounded-lg p-4 shadow-md flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <div className="text-lg font-bold">{item.shopName}</div>
                        <div className="text-sm text-gray-600">Date: {item.date}</div>
                        <div className="text-sm text-blue-700">Start: {item.startTime}</div>
                        <div className="text-sm text-gray-600">Duration: {item.duration} mins</div>
                        <div className="text-sm text-green-600">End: {calculateEndTime(item.startTime, item.duration)}</div>
                    </div>

                    <button onClick={() => dispatch(removeReservation(item))}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Cancel
                    </button>
                </div>
            ))}
        </div>
    );
}
