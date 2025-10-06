<template>
    <div>
        <button @click="loadUsers" :disabled="loading">Buscar usuários</button>

        <div v-if="loading">Carregando...</div>
        <div v-if="error" class="error">Erro: {{ error }}</div>

        <ul v-if="!loading && user.length">
            <li v-for="x in user" :key =x.idTable>
                {{ x.nameTable }}: {{ x.emailTable }}

            </li>
        </ul>

        <div v-if="!loading && !user.length && !error"> Nenhum usuário encontrado</div>

    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { searchUsers, type User } from '@/service/users';


const user = ref<User[]>([]);
const loading = ref(false);
const error = ref<string | null>(null)


async function loadUsers(){
    loading.value = true;
    error.value = null;

    try{
        const result = await searchUsers(); //pega o objeto vindo da api, que vai ser um dicionário
        user.value = result.users; //pega o valor da chave desse dicionário
        console.log('users:', result)
        // console.log(Array.isArray(result))
        // console.log('tamanho:', result.length)

    }
    catch (erroT: unknown){
        if (erroT instanceof Error){
            error.value = erroT.message
        }
        else{
            error.value = 'Erro desconhecido'
        }
    }
    finally{
        loading.value = false
    }
}

onMounted(()=> {
    loadUsers();
});

</script>