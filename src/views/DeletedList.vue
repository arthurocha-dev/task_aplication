
<template>

    <div class="deleteForm">
        <h1 class="title">Deletar Lista</h1>

        <input type="text" placeholder="Digite o nome da lista" v-model="list">
        <button @click="deleteFunction">Deletar</button>

        <h2>{{ msg }}</h2>
    </div>


</template>

<script setup lang="ts">

import {ref} from 'vue'
import {type DeleteTaskRequest, deleteTask} from '@/service/task'
import { isAxiosError } from 'axios'

const list = ref<string>('')


const msg = ref<string>('')

async function deleteFunction(){

    try{
        const response = await deleteTask(list.value)
        msg.value = response.mensager
        console.log(msg)
    }

    catch (err){
        if (isAxiosError(err)){
            msg.value = "erro na requisição"
            console.log("erro foi:", err)
        }

        else if (err instanceof Error){
            msg.value = 'erro não foi na requisição'
            console.log("Erro não foi na requisição")
        }
    }
    

}



</script>


<style scoped lang="css">

.deleteForm{
    height: 30vw;
    width: 30vw;
    background-color: maroon;
    padding-top: 3%;
    padding-left: 3%;
}

.title{
    font-weight: bold;
    color: white
}

</style>