export default async function getMassageShops() {
    //await new Promise((resolve => setTimeout(resolve, 5000)))

    const response = await fetch("http://localhost:5000/api/v1/massage-shops/", {next: {tags: ['massage-shops']}})

    if(!response.ok) {
        throw new Error("Failed to fetch massageshops")
    }

    return await response.json()
}


