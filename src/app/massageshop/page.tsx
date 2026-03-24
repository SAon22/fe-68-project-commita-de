import getMassageShops from "@/libs/getMassageShops"
import Link from "next/link"

export default async function MassageShopPage() {

  const shops = await getMassageShops()

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 p-10">

  <h1 className="text-3xl font-bold text-slate-800 mb-8">
    Massage Shops
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {shops.data.map((shop:any)=>(

      <div
        key={shop._id}
        className="bg-white/90 backdrop-blur rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-slate-200"
      >

        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          {shop.name}
        </h2>

        <p className="text-slate-700">
          📍 {shop.address}
        </p>

        <p className="text-slate-700">
          ☎ {shop.tel}
        </p>

        <p className="text-sm text-slate-600 mb-4">
          🕒 {shop.openCloseTime}
        </p>

        <Link
          href={`/reservation?shop=${shop._id}`}
          className="inline-block bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          Reserve
        </Link>

      </div>

    ))}

  </div>

</div>

  )
}