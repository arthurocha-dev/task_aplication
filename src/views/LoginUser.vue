<template>

    <div class="formLogin">
        <div class="content">
            
            <div class="email">
            <h2>Email</h2>
            <input type="email" placeholder="Digite o email" v-model="user.email_login">
                
            </div>
            
            <div class="password">
            <h2>Senha</h2>
            <input type="password" placeholder="Digite a senha" v-model="user.password_login">
                
            </div>


            <h4 class="mensager" >{{ menssager }}</h4>

             <button type="submit" class="button" @click="realizedLogin">Logar</button>



        </div>
    </div>


</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { type LoginUserRequest, loginUser} from '@/service/usersR'
import { isAxiosError } from 'axios'

const user = ref<LoginUserRequest>({
    email_login: '',
    password_login: ''
})

const menssager = ref<string>('')

async function realizedLogin() {

    if (user.value.email_login == '') {
        return menssager.value = 'Digite o email'
    }

    else if (user.value.password_login == ''){
        return menssager.value = 'Digite a senha'
    }
    
    try{
     const response = await loginUser(user.value)
     menssager.value = 'Usuário logado com sucesso!'
    }
    catch (err){
       

        if (isAxiosError(err)){
            menssager.value = 'Erro na requisição ou campos incorretos'
            return console.log('O erro da requisição foi:', err)
        }

        else if (err instanceof Error){
            menssager.value = 'Verifique os campos se estão corretos ou o usuário não existe'
            return console.log('Erro do ts:', err)
        }

    }
    
}

// onMounted(()=> {
//     realizedLogin()
// })

</script>




<style scoped lang="css">

.formLogin{
    height: 20vw;
    width:  20vw;
    background-color: green;
}

.content{
    margin-top: 10%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    
}


.password{
    margin-top: 10%;
}

.button{
    margin-top: 4%;
    width: 30%;
}

.mensager{
    margin-top: 10%;
    
 

}


</style>