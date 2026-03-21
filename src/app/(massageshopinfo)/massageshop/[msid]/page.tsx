import Image from "next/image"
import getMassageShop from "@/libs/getMassageShop"

export default async function MassageShopDetailPage({params}: {params: any}) {

    const massageshopDetail = await getMassageShop(params.vid)

    const vid = params?.vid ?? "001"
    
    return (
      <main className="text-center p-5">
        <h1 className="text-2xl font-bold">{massageshopDetail.data.name}</h1>
        <div className="flex flex-row my-5 gap-6">
            <Image src={massageshopDetail.data.picture}
                  alt="Venue Image"
                  width={0} height={0} sizes="100vw"
                  className="rounded-lg w-[30%] font-bold"
            />
            <div className="text-md mx-5 text-left ml-16">{massageshopDetail.data.name}
            <div className="text-md mx-5">Address : {massageshopDetail.data.address}</div>
            <div className="text-md mx-5">District : {massageshopDetail.data.district}</div>
            <div className="text-md mx-5">Province : {massageshopDetail.data.province}</div>
            <div className="text-md mx-5">Postal Code : {massageshopDetail.data.postalcode}</div>
            <div className="text-md mx-5">Tel : {massageshopDetail.data.tel}</div>
            <div className="text-md mx-5">Open - Close Time : {massageshopDetail.data.openCloseTime}</div>
            </div>
        </div>
      </main>
    );
}
