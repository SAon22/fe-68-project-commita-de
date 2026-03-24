"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"

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
            //router.push("/api/auth/signin");
            router.push("/login");
        } else {
            alert(data.error || "Register failed");
        }
    }

    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-300 to-slate-700">

    <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">

      <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
        Create Account
      </h1>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          className="border border-slate-300 rounded-lg p-3 text-slate-500 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="border border-slate-300 rounded-lg p-3 text-slate-500 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          placeholder="Tel"
          onChange={e => setTel(e.target.value)}
          className="border border-slate-300 rounded-lg p-3 text-slate-500 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="border border-slate-300 rounded-lg p-3 text-slate-500 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <button
          onClick={handleRegister}
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-slate-600">
          Already have an account?
          <Link href="/login" className="text-slate-700 ml-1 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>

  </div>
)
}
