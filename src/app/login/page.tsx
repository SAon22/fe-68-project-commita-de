"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e:any)=>{
    e.preventDefault()

    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    })

    if(res?.ok){
      router.push("/")
    }else{
      alert("Login failed")
    }
  }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-300 to-slate-700">

    <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">

      <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
        Login
      </h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 text-slate-500 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 text-slate-500 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Login
        </button>

      </form>

      <p className="text-sm text-center mt-6 text-slate-600">
        Don't have an account?
        <Link href="/register" className="text-sky-500 ml-1 hover:underline">
          Register
        </Link>
      </p>

    </div>

  </div>
)
}