import  axios  from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();


export const api = axios.create({
    baseURL: "http://127.0.0.1:8000", //apartir dessa url, vai ser feito as próximas requisições. ex: url/users, url/tasks
    timeout: 10000, //tempo máximo pra resposta
    headers: {
        'Content-Type': 'application/json' // definindo cabeçalhos de como será enviados e recebidos as requisições
    }
});


// export async function getUsers() {
//     const response = await api.get("/auth/get_all_users")
//     console.log(response.data)
// }

