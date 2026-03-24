import BookingMenu from "@/components/ReservationMenu";

export default function BookingLayout({children} : {children:React.ReactNode}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 flex justify-center items-center p-6">
            <div className="w-full max-w-xl">
                {children}
            </div>
        </div>
    );
}