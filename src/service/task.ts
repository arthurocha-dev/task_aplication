import {api} from '@/service/apiR'



export interface CreateTaskRequest{
    name_list: string
    tasks_list: [
        string
    ]
}

export interface CreateTaskResponse{
    tasks: [
        string
    ]
}

export async function createTask(task: CreateTaskRequest): Promise<CreateTaskResponse> {

    const token = localStorage.getItem("token")

    const response = await api.post<CreateTaskResponse>("/tasks/create_list_tasks", task, {headers: {Authorization: `Bearer ${token}`}})

    return response.data

    
}