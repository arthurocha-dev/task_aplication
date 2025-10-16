import {api} from '@/service/apiR'


export interface CreateTaskRequest{
    name_list: string,
    tasks_list: string[]
}

interface CreateTaskResponse{
    name_list: string,
    tasks_list: string[]
    


}

export interface SearchTaskRequest{
    name_list: string
}

export interface SearchTaskResponse{
    mensager: string
    task: string,
    list: string[]
}


export async function createTaskList(list: CreateTaskRequest): Promise<CreateTaskResponse> {
    const token = localStorage.getItem("token")
    const request = api.post<CreateTaskResponse>(
        "/tasks/create_list_tasks",
         list,
         {
            headers: {
                Authorization: `Bearer ${token}`
            }
         }
        )

    console.log("token que está sendo enviado:", token)
    console.log("o que ta enviando:", list)

    // const listR = <CreateTaskResponse>({
    //     name_list: (await request).data.name_list,
        
    // })  

    // const response = api.post<CreateTaskResponse>(
    //     "/tasks/resgate_list",
    //      listR,
    //      {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //      }
        
    //  )
    
    const response = (await request).data


    return response
}



export async function searchList(nameList: SearchTaskRequest): Promise<SearchTaskResponse> {
    const token = localStorage.getItem('token')

    const request = api.post<SearchTaskResponse>("/tasks/resgate_list", nameList, {headers: {Authorization: `Bearer ${token}`}})
    
    const responose = (await request).data
    
    return responose
}