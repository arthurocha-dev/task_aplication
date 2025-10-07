<template>

    <h1>Buscar Usuários</h1>
    

    <ul v-for="value in user" :key="value.idTable">

        <li>
            {{ value.nameTable }}
        </li>

    </ul>
    <h1 v-if="loading">Carregando...</h1>
    <br>
    <h1>{{ erro }}</h1>
    <br>
    <button @click="searchUser">Buscar</button>



</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { type UserR, type UserResponseR, getUsers } from '@/service/usersR';


const user = ref<UserR[]>([])
const erro = ref<string>('')
const loading = ref<boolean>(false)



async function searchUser() {
    loading.value = true

    try{
        const response = await getUsers()
        user.value = response.users
    }

    catch{
        erro.value = 'Não foi possível fazer a busca dos usuários'
        const response = await getUsers()
        console.log( 'api:',response)
        // console.log('reponse:', response)

    }

    finally{
        loading.value = false
    }
    
}

// onMounted(() => {
//     searchUser()
// })

</script>