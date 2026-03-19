export default async function userLogin(email:string, password:string) {

    if(email === "admin@test.com" && password === "1234"){
        return { name: "Admin", role: "admin" }
    }

    if(email === "user@test.com" && password === "1234"){
        return { name: "User", role: "user" }
    }

    return null
}
