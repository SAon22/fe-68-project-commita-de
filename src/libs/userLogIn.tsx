export default async function userLogin(email:string, password:string) {

    if(email === "admin@test.com" && password === "1234"){
        return { name: "Admin", role: "admin" }
    }

    if(email === "user@test.com" && password === "1234"){
        return { name: "User", role: "user" }
    }

    return null
}
// export default async function userLogin(userEmail:string, userPassword:string) {

//     const response = await fetch("http://localhost:5000/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: userEmail,
//             password: userPassword
//         }),
//     })
//     if(!response.ok) {
//         //return null
//         throw new Error("Failed to log-in")
//     }

//     return await response.json()
// }