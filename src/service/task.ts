import {api} from '@/service/apiR'


export interface CreateTaskRequest{
    name_list: string,
    tasks_list: string[]
}

interface CreateTaskResponse{
    name_list: string,
    tasks_list: string[]


}


export async function createTaskList(list: CreateTaskRequest): Promise <CreateTaskResponse> {
    const token = localStorage.getItem("token")
    const request = api.post<CreateTaskResponse>(
        "/tasks/create_list_tasks",
         list,
         {
            headers: {
                Authorization: `bearer ${token}`
            }
         }
        )

    console.log("o que ta enviando:", list)
    const response = (await request).data
    


    return response
}