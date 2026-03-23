"use client"

//mport Navbar from "@/components/Navbar"
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

    <main>

      {/* <Navbar/> */}

      <div style={{
        padding:"40px",
        maxWidth:"500px",
        margin:"auto"
      }}>

        <h1>Create Massage Shop</h1>

        <form
          onSubmit={createShop}
          style={{
            display:"flex",
            flexDirection:"column",
            gap:"15px"
          }}
        >

          <input
            placeholder="Shop Name"
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            placeholder="Address"
            onChange={(e)=>setAddress(e.target.value)}
          />

          <button type="submit">
            Create
          </button>

        </form>

      </div>

    </main>
  )
}