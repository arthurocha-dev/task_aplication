import {apiTwo} from '@/service/apitwo'

export interface UserTwo{
    id: number
    name: string
    username: string
    email: string
    phone: string

}

export async function getUsers(): Promise<UserTwo[]>{
    const response = await apiTwo.get<UserTwo[]>("/users")
    return response.data
}