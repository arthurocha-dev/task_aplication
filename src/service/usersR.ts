import {api} from '@/service/apiR'


export interface UserR {
    idTable: number | null
    nameTable: string
    emailTable: string
    passwordTable: string
    administratorTable: boolean

}

export interface UserResponseR {
    users: UserR[]
}



export interface PostUser{
    name: string
    email: string
    password: string
    adm: boolean
}


export async function getUsers(): Promise<UserResponseR> {
    const request = await api.get<UserResponseR>("/auth/get_all_users")
    // console.log("Url final:", api.defaults.baseURL + "/auth/get_all_users")
    return request.data
}








// ✅ RESUMO - COMO FUNCIONA UM POST COM AXIOS

// A função axios.post() serve para ENVIAR dados ao back-end (normalmente para criar algo).
// Sua estrutura é:
// axios.post<TIPO_DO_RETORNO>(URL, BODY, CONFIG_OPCIONAL)

// 1️⃣ - URL: é o endereço (endpoint) da rota que vai receber a requisição.
//        Ex.: "/auth/create_user" → rota do back-end que cria usuários.

// 2️⃣ - BODY: é o corpo da requisição, ou seja, os dados que queremos enviar.
//        Aqui passamos um objeto (ex.: newUser) que contém as informações necessárias
//        para o servidor criar o recurso no banco de dados.
//        Ex.: 
//        const newUser = {
//          nameTable: "Arthur",
//          emailTable: "arthur@email.com",
//          passwordTable: "12345",
//          administratorTable: false
//        }

// 3️⃣ - TIPO_DO_RETORNO (entre < >): indica ao TypeScript qual o formato esperado
//        da resposta da API. Assim ele pode dar autocomplete e verificar tipos.

// 🧠 Exemplo completo:
// const response = await api.post<UserResponseR>("/auth/create_user", newUser)

// - "/auth/create_user" → endpoint da API.
// - newUser → objeto com os dados do novo usuário, que vai no corpo da requisição.
// - <UserResponseR> → diz ao TS que a resposta será do tipo UserResponseR.

// 📬 Analogia: pensa como enviar uma carta:
// - URL é o endereço do destinatário (pra onde vai).
// - BODY é a carta (o conteúdo que você quer mandar).
// - O servidor lê essa carta (req.body no back-end) e cria o usuário com as informações.

export async function createUser(newUser: PostUser): Promise<PostUser>{
    const request = await api.post<PostUser>("/auth/create_user", newUser)
    return request.data
}  