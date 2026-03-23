import Image from "next/image"

export default function Banner(){

  return(
    <div className="relative w-full h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/img/homepic.png"
        alt="massage"
        fill
        className="object-cover brightness-50"
        priority
      />

      {/* COOL FOG OVERLAY */}
      <div className="absolute inset-0 bg-blue-200/10 backdrop-blur-sm"></div>

      {/* TEXT BOX */}
      <div className="relative max-w-2xl text-center text-white p-10
                      bg-white/10 backdrop-blur-md rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold mb-6">
          Relax & Refresh
        </h1>

        <p className="text-lg leading-relaxed text-gray-200">
          Experience the authentic art of traditional Thai massage in a calm 
          and welcoming environment. Our professional therapists are trained 
          to help relieve muscle tension, reduce stress, and improve blood 
          circulation through carefully designed massage techniques.
          <br/><br/>
          Whether you are looking to relax after a long day, recover from 
          physical fatigue, or simply take a moment to care for your body 
          and mind, our massage services are designed to bring balance and 
          comfort to your everyday life.
        </p>

      </div>

    </div>
  )
}