'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function UserMenu({ user }:{ user:any }) {

    const [open,setOpen] = useState(false)

    return (
        <div className="relative" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
            <div className="px-4 py-1.5 text-sm font-medium text-white border border-white
            rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                {user?.name}
            </div>
            {
                open &&
                <div className="absolute right-0 bg-white shadow-md border rounded text-gray-800">
                    <Link href="/profile">
                        <div className="px-4 py-2 hover:bg-gray-100">Profile</div>
                    </Link>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>signOut()}>
                        Logout
                    </div>
                </div>
            }
        </div>
    )
}
