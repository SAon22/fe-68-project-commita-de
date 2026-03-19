'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function UserMenu({ user }:{ user:any }) {

    const [open,setOpen] = useState(false)

    return (
        <div 
            className="relative"
            onMouseEnter={()=>setOpen(true)}
            onMouseLeave={()=>setOpen(false)}
        >
            <div className="cursor-pointer px-2 text-sm text-cyan-600">
                {user?.name}
            </div>

            {
                open &&
                <div className="absolute right-0 bg-white shadow-md border rounded">
                    <Link href="/profile">
                        <div className="px-4 py-2 hover:bg-gray-100">Profile</div>
                    </Link>
                    <div 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={()=>signOut()}
                    >
                        Logout
                    </div>
                </div>
            }
        </div>
    )
}
