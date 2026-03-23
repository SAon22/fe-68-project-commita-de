import getMassageShops from "@/libs/getMassageShops"

export default async function MassageShopPage() {

    const shops = await getMassageShops();

    return (
        <div className="p-5 grid grid-cols-3 gap-4">
            {shops.data.map((shop: any) => (
                <div key={shop._id} className="border p-4 rounded shadow">
                    <div className="text-lg font-bold">{shop.name}</div>
                    <div>{shop.address}</div>
                    <div>{shop.tel}</div>
                    <div className="text-sm text-gray-500">{shop.openCloseTime}</div>
                </div>
            ))}
        </div>
    );
}
