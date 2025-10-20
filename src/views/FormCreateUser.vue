<template>
  <div class="form">
    <h1>{{ t('create_user.title') }}</h1>

    <input type="text" v-model="user.name" :placeholder="t('create_user.placeholders.name')" />
    <input type="email" v-model="user.email"  :placeholder="t('create_user.placeholders.email')" />
    <input type="password" v-model="user.password" :placeholder= "t('create_user.placeholders.password')"/>

    <div class="radio-group">
      <label>
        <input type="radio" name="isAdm" v-model="user.adm" :value="true" />
        {{ t('create_user.input_radios.yes') }}
      </label>
      <label>
        <input type="radio" name="isAdm" v-model="user.adm" :value="false" />
        {{t('create_user.input_radios.no')}}
      </label>
    </div>

    <button @click="create">Criar</button>

    <h2>{{ mensager }}</h2>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {type PostUser, createUser} from '@/service/usersR'
import { isAxiosError } from 'axios'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()


const user = ref<PostUser>({
    name: '',
    email: '',
    password: '',
    adm: false
})


const mensager = ref<string>("")


async function create() {


    if(user.value.name == "" || user.value.email == "" || user.value.password == "" ){
        return  mensager.value = t('create_user.mensagers.camps_default')
    }

    try{
        await createUser(user.value)
        mensager.value = t('create_user.mensagers.success')
        console.log('create user!')
    }
    catch (err){
        // mensager.value = "algo deu errado ao tentar criar o usuário"
        if (isAxiosError(err)){
            mensager.value = t('create_user.mensagers.error_request')
            console.log('o erro foi:', err)
        }

        else if (err instanceof Error){
            mensager.value = t('create_user.mensagers.error_generic')
            console.log('Erro genérico', err)
        }

    }
    
}


</script>




<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
  background-color: var(--color-backgound-form);
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

input[type='text'],
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.radio-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1rem;
}

button:hover {
  background-color: #218838;
}

h1 {
  color: #28a745;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

h2 {
  color: #d3c3c3;
  font-weight: normal;
  text-align: center;
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