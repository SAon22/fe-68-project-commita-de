import TopMenuItem from "./TopMenuItem";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from "next/link";

export default async function TopMenu() {

    const session = await getServerSession(authOptions)
    const role = session?.user?.role

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center h-[60px] z-50 bg-transparent text-white">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Image src="/img/logo2.png" alt="logo" width={90} height={90}/>
                    {/* <Image src="/img/shopname.png" alt="shop name" width={120} height={40}/> */}
                </div>

                <TopMenuItem title="Home" pageRef="/"/>
                <TopMenuItem title="MassageShop" pageRef="/massageshop"/>
                {
                    session ? <TopMenuItem title="Reservation" pageRef="/reservation"/> 
                    : <TopMenuItem title="Reservation" pageRef="/api/auth/signin"/>
                }

                {
                    session && role === 'user' && <TopMenuItem title="My Reservation" pageRef="/showreservation"/>
                }

                {
                    session && role === 'admin' && <TopMenuItem title="All Reservation" pageRef="/showreservation"/>
                }

                {
                    session ? <UserMenu user={session.user}/>
                    : <Link href="/login">
                        <div className="px-4 py-1.5 text-sm font-medium text-white border border-white
                        rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                            Log in
                        </div>
                      </Link>
                }
                
            </div>
        </div>
    )
}

