<template>
    
    <div class="form">
        <h1>Criar Usuário</h1>

        <input type="text" v-model="user.name" placeholder="Digite o nome ">
        <br>
        <input type="email" v-model="user.email" placeholder="Digite o email" >
        <br>
        <input type="text"  v-model="user.password" placeholder="Digite a senha">
        <br>

            <div> 
            <input type="radio" name="isAdm" v-model="user.adm" :value="true" > 
            <label for="true">Sim</label>
        </div>

        <div>
            <input type="radio" name="isAdm" v-model="user.adm" :value="false">
            <label for="false">Não</label>
        </div>
            

        <input type="submit" @click="create">


        <h2>{{ mensager }}</h2>
        
    </div>


</template>

<script setup lang="ts">
import {ref} from 'vue'
import {type PostUser, createUser} from '@/service/usersR'


const user = ref<PostUser>({
    name: '',
    email: '',
    password: '',
    adm: false
})


const mensager = ref<string>("")


async function create() {

    try{
        createUser(user.value)
        mensager.value = "Usuário criado com sucesso!"
        console.log('create user!')
    }
    catch{
        mensager.value = "algo deu errado ao tentar criar o usuário"
        console.log('no create user :/')

    }
    
}


</script>




<style lang="css" >

.form{
    display: table-column;
    width: 300px;
    height: 300pxs;
    background-color: chocolate;
}

</style>