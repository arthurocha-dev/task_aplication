<template>

      <div class="formList">
        <div class="contentList">
            <h3 class="namedList">Nome da Lista</h3>

            <input type="text" placeholder="Digite o nome da lista" v-model="listTasks.name_list">


            <h3 class="itensListTitle">Itens da Lista</h3>

            <input type="text" placeholder="Digite os itens da Lista" v-model="listTasks.tasks_list">

            <button class="itenButton" @click="addTask">Adcionar Item</button>


            <button class="buttonSubmit" @click="task">Criar Lista</button>

            <div class="itensList">
                <h1>oi</h1>

            </div>

        </div>

        <h3>{{ mensager}}</h3>

      </div>  


</template>

<script setup lang="ts">
import {ref} from 'vue'
import { type CreateTaskRequest, createTask } from '@/service/task';
import { isAxiosError } from 'axios';


const listTasks = ref<CreateTaskRequest>({
    name_list: '',
    tasks_list: [
        ''
    ]
})
const mensager = ref<string>("")



const newTask = ref<string>('')


function addTask(){
    if (newTask.value.trim() == ''){
        return
    }

    listTasks.value.tasks_list.push(newTask.value)

    newTask.value = ''

}


async function task() {

    if (listTasks.value.name_list == ''){
        return mensager.value = 'Digite o nome da lista'
    }

    else if (listTasks.value.tasks_list.length === 1 || listTasks.value.tasks_list[0] == ''  ){
        return mensager.value = 'Digite os itens da lista'
    }

  
    try{
        const response = await createTask(listTasks.value)
        mensager.value = 'lista criada!'
        console.log('list create with success!', response.tasks)
    }

    catch (err){
        if (isAxiosError(err)){
            mensager.value = 'deu errado na requisição :('
            console.log('erro na requisição: ', err)
        }

        else if (err instanceof Error){
            mensager.value = 'Erro no ts'
            console.log('erro genérico do ts')
        }

    }


} 


</script>



<style scoped lang="css">

.formList{
    height: 30vw;
    width: 30vw;
    background-color: cornflowerblue;
}

.contentList{
    display: flex;
    flex-direction: column;
    margin-top: 5%;
}

.namedList{
    font-weight: bold;
    color: white;
}

.itensListTitle{
    margin-top: 4%;
    font-weight: bold;
    color: white;
}

.buttonSubmit{
    margin-top: 10%;
}

.itensList{
    margin: 10%;
    height: 60%;
    width: 80%;
    background-color: white;
}

.itenButton{
    margin-top: 04%;
}

</style>