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

.listContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  /* background: var(--color-backgound-form); */
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
}

.request {
  color: var(--color-text);
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
}

.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 450px;
  margin-bottom: 30px;
}

.inputList {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: all 0.3s ease;
}

.inputList:focus {
  border-color: #42b883;
  outline: none;
  box-shadow: 0 0 5px rgba(66, 184, 131, 0.4);
}

.button {
  background: #42b883;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button:hover {
  background: #36976d;
}

.nameList {
  color: #35495e;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 450px;
}

.itensList {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  color: #333;
  font-size: 16px;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.itensList:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

@media (max-width: 480px) {
  .search {
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .inputList {
    width: 100%;
  }
}



</style>