import getMassageShops from "@/libs/getMassageShops";
import MassageShopCatalog from "@/components/MassageShopCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CardPanel from "@/components/CardPanel";

export default async function Venue() {
    const massageshops = await getMassageShops()

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your MassageShop</h1>
            {/* <CardPanel/> */}
            <Suspense fallback={<p>Loading ...<LinearProgress/></p>}>
            <MassageShopCatalog venuesJson={massageshops}/>
            </Suspense>

            {/* <hr className="my-10"/>
            <h1>TYR Client-side Car Panel</h1>
            <CardPanel/> */}
        </main>
    );
}