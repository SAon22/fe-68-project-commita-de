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

  return(
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

        <p className="mt-4">
        Don't have an account? 
        <Link href="/register" className="text-blue-500 ml-1">
             Register
        </Link>
        </p>

    </div>
  )
}