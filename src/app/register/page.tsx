"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async () => {

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, tel, password })
        })

        if (res.ok) {
            alert("Registered")
            router.push("/api/auth/signin")
        } else {
            alert("Register failed")
        }
    }

    return (
        <div className="p-5 flex flex-col gap-3 max-w-md mx-auto">

            <h1 className="text-xl font-bold">Register</h1>

            <input placeholder="Name" onChange={e => setName(e.target.value)} className="border p-2"/>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2"/>
            <input placeholder="Tel" onChange={e => setTel(e.target.value)} className="border p-2"/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2"/>

            <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">
                Register
            </button>

        </div>
    )
}
