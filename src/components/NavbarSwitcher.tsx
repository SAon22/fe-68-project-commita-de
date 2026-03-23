"use client"

import { usePathname } from "next/navigation"
import TopMenu from "@/components/TopMenu"
import HomeButton from "@/components/HomeButton"

export default function NavbarSwitcher(){

  const pathname = usePathname()

  if(pathname === "/"){
    return <TopMenu/>
  }

  return <HomeButton/>
}