import {api} from '@/service/apiR'


export interface UserR {
    idTable: number
    nameTable: string
    emailTable: string
    passwordTable: string
    administratorTable: boolean

}

export interface UserResponseR {
    users: UserR[]
}


export async function getUsers(): Promise<UserResponseR> {
    const request = await api.get<UserResponseR>("/auth/get_all_users")
    // console.log("Url final:", api.defaults.baseURL + "/auth/get_all_users")
    return request.data
}


export async function createUser(): Promise<UserResponseR>{
    const request = await api.post<UserResponseR>("/auth/create_user")
    return request.data
}  {
    
}