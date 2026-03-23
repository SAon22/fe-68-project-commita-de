"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        if (!name || !email || !tel || !password) {
            alert("Please fill all information");
            return;
        }

        if (password.length < 6) {
            // alert("Password must be at least 6 characters")
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, tel, password })
        })

        const data = await res.json();

        if (res.ok) {
            alert("Your Register is Completed");
            router.push("/api/auth/signin");
        } else {
            alert(data.error || "Register failed");
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
