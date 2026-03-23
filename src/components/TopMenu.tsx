"use client"

import TopMenuItem from "./TopMenuItem";
import UserMenu from "./UserMenu";
import HomeButton from "./HomeButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TopMenu() {

    const pathname = usePathname();
    const { data: session } = useSession();
    const role = session?.user?.role;

    if (pathname !== "/") {
        return <HomeButton />;
    }

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center h-[60px] z-50 bg-white/10 backdrop-blur-md text-white">
            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <Image src="/img/logo2.png" alt="logo" width={90} height={90}/>
                </div>

                <TopMenuItem title="Home" pageRef="/"/>
                <TopMenuItem title="MassageShop" pageRef="/massageshop"/>

                {
                    session
                        ? <TopMenuItem title="Reservation" pageRef="/reservation"/>
                        : <TopMenuItem title="Reservation" pageRef="/login"/>
                }

                {
                    session && role === "user" &&
                    <TopMenuItem title="My Reservation" pageRef="/showreservation"/>
                }

                {
                    session && role === "admin" &&
                    <TopMenuItem title="All Reservation" pageRef="/showreservation"/>
                }

                {
                    session
                        ? <UserMenu user={session.user}/>
                        : (
                            <Link href="/login">
                                <div className="px-4 py-1.5 text-sm font-medium text-white border border-white rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                                    Log in
                                </div>
                            </Link>
                        )
                }

            </div>
        </div>
    );
}