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
  <div className="page-container">

    <h1 className="page-title">Login</h1>

    <div className="page-section">

      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" type="email"/>
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input className="form-input" type="password"/>
      </div>

      <button className="form-button">
        Login
      </button>

    </div>

  </div>
)
}