<template>
  <div class="formLogin">
    <div class="content">
      <h1 class="title">Login</h1>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" :placeholder="t('login.input.email')" v-model="user.email_login" />
      </div>

      <div class="input-group">
        <label for="password">Senha</label>
        <input type="password" id="password" :placeholder="t('login.input.password')" v-model="user.password_login" />
      </div>

      <h4 class="mensager">{{ menssager }}</h4>

      <button type="submit" class="button">{{ t('login.login') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { type LoginUserRequest, loginUser} from '@/service/usersR'
import { isAxiosError } from 'axios'
import {useI18n} from 'vue-i18n'



const {t} = useI18n()


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





<style scoped>
.formLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-background-form);
  transition: background-color 0.4s ease;
}

.content {
  background-color: var(--color-backgound-form);
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 420px;
  text-align: center;
  transition: background-color 0.4s ease, box-shadow 0.3s ease;
}

.title {
  font-weight: bold;
  color: #28a745;
  font-size: 2rem;
  margin-bottom: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 18px;
  width: 100%;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text);
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 1rem;
  background-color: white;
  color: black;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  outline: none;
  border-color: #28a745;
  box-shadow: 0 0 6px rgba(40, 167, 69, 0.4);
}

.button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: #218838;
  transform: scale(1.02);
}

.mensager {
  color: #ff4444;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

@media (max-width: 500px) {
  .content {
    padding: 30px 20px;
  }

  .title {
    font-size: 1.6rem;
  }

  input {
    font-size: 0.95rem;
  }

  .button {
    font-size: 1rem;
  }
}
</style>