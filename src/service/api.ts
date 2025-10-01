import  axios  from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();


const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});


export async function getUsers() {
    const response = await api.get("/auth/get_all_users")
    console.log(response.data)
}

