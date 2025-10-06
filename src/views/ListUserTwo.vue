<template>
    <h1>Página de buscar Usuários</h1>

     <ul v-for="value in usersV" :key="value.id">

        <li>
           {{ value.name }}
        </li>

     </ul>   

     <h1>{{ mensageError }}</h1>


    <button @click="searchUsers">Buscar</button>
</template>

<script setup lang="ts">
import {type UserTwo, getUsers } from '@/service/userstwo'
import { ref } from 'vue';


const isSearch = ref(false)
const usersV = ref<UserTwo[]>([])
const mensageError = ref('')


async function searchUsers() {
    isSearch.value = false

    try{
        usersV.value = await getUsers()
        console.log('User laoding with success!')
    }

    catch{ 
        mensageError.value = 'Error! Verifique o código'
        console.log('erro no code')

    }
    
}



</script>