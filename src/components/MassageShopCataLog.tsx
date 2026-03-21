import Card from "@/components/Card";
import Link from "next/link";

export default function MassageShopCatalog({massageshopsJson} : {massageshopsJson:any}) {

    return (
        <>
        Explore our {massageshopsJson.count} massageshop for your best relax
        <div style={{margin:"20px", display:"flex", 
            flexDirection:"row", alignContent:"space-around", 
            justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
                {
                    massageshopsJson.data.map((massageshopItem:any) => (
                    <Link href={`/massageshop/${massageshopItem.id}`} className="w-1/5" key={massageshopItem.id}>
                        <Card massageshopName={massageshopItem.name} imgSrc={massageshopItem.picture}/>
                    </Link>
                    ))
                }
        </div>
        </>
    )
}
