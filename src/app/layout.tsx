import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

import TopMenu from "@/components/TopMenu";
import HomeButton from "@/components/HomeButton";

import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Massage Booking",
  description: "Massage reservation system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession}>

            <TopMenu/>

            {children}

          </NextAuthProvider>
        </ReduxProvider>

      </body>
    </html>
  );
}