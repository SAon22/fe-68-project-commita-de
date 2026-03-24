import Image from "next/image"

export default function Banner(){

  return(
    <div className="relative w-full h-screen flex items-center justify-center text-white pt-[60px]">

      {/* BACKGROUND */}
      <Image
        src="/img/homepic.png"
        alt="massage"
        fill
        className="object-cover brightness-50"
        priority
      />

      {/* FOG */}
      <div className="absolute inset-0 bg-blue-200/10 backdrop-blur-sm"></div>

      {/* MAIN LAYOUT */}
      <div className="relative w-full max-w-[1500px] grid grid-cols-3 gap-16 px-16">

        {/* LEFT SIDE */}
        <div className="col-span-2">

          <div className="bg-white/10 backdrop-blur-md rounded-xl px-14 py-12 shadow-lg">

            {/* HERO */}
            <div className="mb-14">

              <h1 className="text-5xl font-bold mb-6 text-center tracking-wide">
                Relax & Refresh
              </h1>

              <p className="text-gray-200 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-4">
                Experience the authentic art of traditional Thai massage in a calm 
                and welcoming environment. Our professional therapists help relieve 
                stress, improve circulation and restore balance to your body.
              </p>

              <p className="text-gray-300 text-base leading-relaxed text-center max-w-2xl mx-auto">
                Whether you're recovering from physical fatigue, easing muscle tension, 
                or simply seeking a peaceful moment for yourself, our carefully crafted 
                treatments are designed to help your body and mind feel renewed.
              </p>

            </div>

            {/* SERVICES */}
            <div>

              <h2 className="text-2xl font-semibold mb-8 text-center">
                Our Services
              </h2>

              <div className="grid grid-cols-4 gap-10 text-center">

                <div>
                  <div className="text-3xl mb-2">🧘</div>
                  <div className="font-semibold text-lg">Thai Massage</div>
                  <div className="text-gray-200 text-sm">
                    Traditional stretch therapy
                  </div>
                </div>

                <div>
                  <div className="text-3xl mb-2">🌿</div>
                  <div className="font-semibold text-lg">Aroma Oil</div>
                  <div className="text-gray-200 text-sm">
                    Relaxing oil massage
                  </div>
                </div>

                <div>
                  <div className="text-3xl mb-2">💪</div>
                  <div className="font-semibold text-lg">Deep Tissue</div>
                  <div className="text-gray-200 text-sm">
                    Muscle tension relief
                  </div>
                </div>

                <div>
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="font-semibold text-lg">Hot Stone</div>
                  <div className="text-gray-200 text-sm">
                    Heated stone therapy
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE (STEPS) */}
<div className="flex flex-col justify-center gap-10 pr-10">

  {/* STEP 0 */}
  <div className="flex items-start gap-5">
    <div className="text-4xl font-bold text-white/80">0</div>
    <div>
      <div className="font-semibold text-lg">Register</div>
      <div className="text-gray-200 text-sm">
        Create your account to start booking
      </div>
    </div>
  </div>

  {/* STEP 1 */}
  <div className="flex items-start gap-5">
    <div className="text-4xl font-bold text-white/80">1</div>
    <div>
      <div className="font-semibold text-lg">Browse</div>
      <div className="text-gray-200 text-sm">
        Browse massage shops available near you
      </div>
    </div>
  </div>

  {/* STEP 2 */}
  <div className="flex items-start gap-5">
    <div className="text-4xl font-bold text-white/80">2</div>
    <div>
      <div className="font-semibold text-lg">Pick Date</div>
      <div className="text-gray-200 text-sm">
        Select your preferred date and time
      </div>
    </div>
  </div>

  {/* STEP 3 */}
  <div className="flex items-start gap-5">
    <div className="text-4xl font-bold text-white/80">3</div>
    <div>
      <div className="font-semibold text-lg">Confirm</div>
      <div className="text-gray-200 text-sm">
        Confirm reservation quickly online
      </div>
    </div>
  </div>

  {/* STEP 4 */}
  <div className="flex items-start gap-5">
    <div className="text-4xl font-bold text-white/80">4</div>
    <div>
      <div className="font-semibold text-lg">Relax</div>
      <div className="text-gray-200 text-sm">
        Enjoy a comfortable and relaxing massage
      </div>
    </div>
  </div>

</div>

      </div>

    </div>
  )
}