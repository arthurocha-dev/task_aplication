<template>

    <div class="listContent">

        <h2 class="request"> Qual o nome da Lista?</h2>

        <div class="search">
            <input type="text" placeholder="Digite o nome da Lista" class="inputList" v-model="nameList">
            <button class="button" @click="search">Procurar</button>

        </div>




        <h2 class="nameList">{{ list.task}}</h2>
        
       <ul v-for="x in list.list">
        <li class="itensList">
            {{ x }}
        </li>
       </ul>

    </div>

</template>


<script setup lang="ts">
import {type  SearchTaskResponse, searchList } from '@/service/task'
import { isAxiosError } from 'axios';
import { ref } from 'vue';

const nameList = ref<string>('')

const list = ref<SearchTaskResponse>({
    mensager: '',
    task: '',
    list: []
})

const mensagerT = ref<string>()

async function search() {

    try{
        const responseF = await searchList(nameList.value)

        list.value.task = responseF.task
        list.value.list = responseF.list

        mensagerT.value = responseF.mensager
        console.log(responseF.mensager)

        console.log(list.value.task)
        console.log(list.value.list)
    }
    catch (err) {
        if (isAxiosError(err)){
            mensagerT.value = 'Erro na requisição'
            console.log('erro na requisição:', err)
        }

        else if (err instanceof Error){
            mensagerT.value = 'Erro no ts'
            console.log('não foi na requisição 🙏')

        }
    }
    
}



</script>


<style scoped lang="css">

.listContent{
    height: 30vw;
    width:  40vw;
    background-color: darkolivegreen;

}

.request{
    margin: 3%;
    font-weight: bold;
    color: white
}


.inputList{
    margin-left: 3%;
    width: 40% ;


    
}

.nameList{
    font-weight: bold;
    margin-top: 3%;
}



</style>