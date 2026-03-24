"use client"

import { useState } from "react"

export default function AdminPage(){

  const [name,setName] = useState("")
  const [address,setAddress] = useState("")

  const createShop = async(e:any)=>{

    e.preventDefault()

    await fetch("/api/massageshops",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        address
      })
    })

    alert("Shop created")
  }

  return(

    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 flex justify-center items-center p-10">

      <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 w-full max-w-md border border-slate-200">

        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Admin Panel
        </h1>

        <form
          onSubmit={createShop}
          className="flex flex-col gap-4"
        >

          <input
            placeholder="Shop Name"
            onChange={(e)=>setName(e.target.value)}
            className="border border-slate-300 rounded-lg p-3 text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <input
            placeholder="Address"
            onChange={(e)=>setAddress(e.target.value)}
            className="border border-slate-300 rounded-lg p-3 text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white font-semibold p-3 rounded-lg transition"
          >
            Create Shop
          </button>

        </form>

      </div>

    </div>

  )
}