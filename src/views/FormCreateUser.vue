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
import { isAxiosError } from 'axios'


const user = ref<PostUser>({
    name: '',
    email: '',
    password: '',
    adm: false
})


const mensager = ref<string>("")


async function create() {


    if(user.value.name == "" || user.value.email == "" || user.value.password == "" ){
        return  mensager.value = "Preencha todos os campos"
    }

    try{
        await createUser(user.value)
        mensager.value = "Usuário criado com sucesso!"
        console.log('create user!')
    }
    catch (err){
        mensager.value = "algo deu errado ao tentar criar o usuário"
        if (isAxiosError(err)){
            console.log('o erro foi:', err)
        }

        else if (err instanceof Error){
            console.log('Erro genérico', err)
        }

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





<!-- /*
🧠 RESUMO SOBRE TRATAMENTO DE ERROS EM TYPESCRIPT + AXIOS

1️⃣ try / catch
   - Usado pra tentar executar um código que pode falhar.
   - Se algo der errado dentro do 'try', o código pula pro 'catch'.

2️⃣ err (ou error)
   - É a variável que recebe o erro gerado no 'try'.
   - Ela pode ser de QUALQUER tipo: string, number, objeto, Error, etc.
   - Por isso, no TypeScript, o tipo padrão é 'unknown'.

3️⃣ instanceof Error
   - 'Error' é uma classe nativa do JavaScript.
   - Serve pra representar erros genéricos, tipo: throw new Error("falha!")
   - 'instanceof Error' verifica se o erro capturado é uma instância dessa classe.
   - Exemplo: if (err instanceof Error) { console.log(err.message) }

4️⃣ axios.isAxiosError(err)
   - O Axios tem um tipo de erro próprio chamado 'AxiosError'.
   - Essa função serve pra identificar se o erro veio de uma requisição HTTP feita com Axios.
   - Exemplo: erro 404, falha de rede, servidor off, etc.
   - Assim dá pra acessar propriedades específicas do Axios:
     - err.response.status
     - err.response.data
     - err.config.url
   - Exemplo:
        if (axios.isAxiosError(err)) {
            console.log("Erro do Axios:", err.response?.status)
        }

5️⃣ Ordem comum de verificação:
        try {
            // código que pode falhar
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // erro de requisição HTTP
            } else if (err instanceof Error) {
                // erro genérico da aplicação
            } else {
                // erro de tipo desconhecido
            }
        }

💡 Dica:
   - Sempre use 'axios.isAxiosError' antes de 'instanceof Error',
     porque um AxiosError também é um objeto, mas com propriedades específicas do Axios.

🔥 Resumo curto:
   - instanceof Error → Erro genérico do JS.
   - axios.isAxiosError → Erro vindo do Axios.
   - err: unknown → o TypeScript te força a identificar o tipo antes de usar.
*/ -->










<!-- 🔑 Resumindo:

! não “checa se é vazio” diretamente.

Ele nega o booleano do valor, e valores “vazios” ("", 0, null, undefined, NaN) são considerados false quando convertidos pra booleano.

Por isso, !valor funciona como uma forma rápida de testar “vazio/zero/nulo”. -->