"use client"
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/reserveSlice";
import { ReservationItem } from "../../interface";

export default function ReservationList() {

    const reserveItems = useAppSelector((state) => state.reserveSlice.reserveItems);
    const dispatch = useDispatch();

    if (reserveItems.length === 0) {
        return (
            <div className="text-center text-xl font-semibold mt-10">
                No MassageShop Reservation
            </div>
        );
    }

    return (
        <div className="space-y-4 p-5">
            {reserveItems.map((item: ReservationItem) => (
                <div 
                    key={`${item.shopName}-${item.date}-${item.tel}`} 
                    className="bg-slate-100 rounded-lg p-4 shadow-md flex justify-between items-center"
                >
                    <div className="flex flex-col space-y-1">
                        <div className="text-lg font-bold">Name: {item.name}</div>
                        <div className="text-sm font-medium text-blue-700">MassageShop: {item.shopName}</div>
                        <div className="text-sm text-gray-600">Contact: {item.tel}</div>
                        <div className="text-sm text-gray-500">Date: {item.date}</div>
                        <div className="text-sm text-gray-500">Duration: {item.duration}</div>
                    </div>

                    <button
                        onClick={() => dispatch(removeReservation(item))}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Cancel Reservation
                    </button>
                </div>
            ))}
        </div>
    );
}