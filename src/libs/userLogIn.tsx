export default async function userLogin(userEmail:string, userPassword:string) {

    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })

    if(!response.ok) {
        return null;
        //throw new Error("Failed to log-in");
    }

    const loginData = await response.json();
    const token = loginData.token; // get Token

    const userResponse = await fetch("http://localhost:5000/api/v1/auth/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(!userResponse.ok) {
        return null;
        //throw new Error("Failed to get user info");
    }

    const userData = await userResponse.json();
    console.log(userData);
    return {
        id: userData.data._id || userData.data.id,
        name: userData.data.name,
        email: userData.data.email,
        role: userData.data.role,
        token: token,
        ...userData.data
    }
}

// Log-In demo
// export default async function userLogin(email:string, password:string) {

//     if(email === "admin@test.com" && password === "1234"){
//         return { name: "Admin", role: "admin" }
//     }

//     if(email === "user@test.com" && password === "1234"){
//         return { name: "User", role: "user" }
//     }

//     return null
// }