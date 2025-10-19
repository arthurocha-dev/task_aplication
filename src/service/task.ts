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

export interface DeleteTaskRequest{
    name_list: string
}

interface DeleteTaskResponse{
    mensager: string
}


export interface EditedListRequest{
    name_edited: string,
    list_edited: string[]
}

interface EditedListResponse{
    mensager: string,
    new_name: string,
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



export async function searchList(list: string): Promise<SearchTaskResponse> {
    const token = localStorage.getItem('token')

    const request = api.get<SearchTaskResponse>("/tasks/resgate_list", {params: {nameList: list } , headers: {Authorization: `Bearer ${token}`}})
    
    const responose = (await request).data
    
    return responose
}




export async function deleteTask(nameList: string): Promise<DeleteTaskResponse>{
    const token = localStorage.getItem("token")

    const request = api.delete<DeleteTaskResponse>(
        "/tasks/delete_list_of_task",
        
        { 
            params: {name_listP: nameList},
            headers: {Authorization: `Bearer ${token}`
}
        } 
        )

    const response = (await request).data

    return response

}


export async function editedList(nameList: string, list: EditedListRequest): Promise <EditedListResponse> {
    const token = localStorage.getItem("token")

    const request = api.patch<EditedListResponse>(
        "/tasks/edit_list",
        list,
        {
            params: {name_listE: nameList},
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    console.log(`lista parametro: ${nameList}`)
    console.log(`body completo do que esta sendo enviado: ${JSON.stringify(list)}`)

    const response = (await request).data

    return response

    
}