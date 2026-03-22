export default async function getReservations() {
    const res = await fetch("/api/reservations")

    if (!res.ok) {
        throw new Error("Failed to fetch reservations")
    }

    return await res.json()
}
