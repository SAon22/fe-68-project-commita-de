export default async function getMassageShop(id:string) {

    //await new Promise((resolve) => setTimeout(resolve, 5000))
    
    const response = await fetch(`http://localhost:5000/api/v1/massage-shops/${id}`);

    if(!response.ok) {
        throw new Error("Failed to fetch massageshop");
    }

    return await response.json();
}