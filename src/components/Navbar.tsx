"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {

  const { data: session } = useSession()

  const role = session?.user?.role

  return (
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"20px",
      borderBottom:"1px solid #ddd"
    }}>

      <div style={{display:"flex",gap:"20px"}}>
        <Link href="/">COMMITA</Link>
        <Link href="/massageshop">Massage Shop</Link>
        <Link href="/reservation">Reservation</Link>
      </div>

      <div>

        {!session && (
          <Link href="/login">Sign in</Link>
        )}

        {session && role === "user" && (
          <>
            <Link href="/showreservation">My Reservation</Link>
            <button onClick={()=>signOut()}>
              Logout
            </button>
          </>
        )}

        {session && role === "admin" && (
          <>
            <Link href="/admin">Manage Shop</Link>
            <Link href="/showreservation">All Reservation</Link>
            <button onClick={()=>signOut()}>
              Logout
            </button>
          </>
        )}

      </div>

    </div>
  )
}