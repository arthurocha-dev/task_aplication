
<template>

    <div class="deleteForm">
        <h1 class="title">{{ t('deleteList.title') }}</h1>

        <input type="text" :placeholder="t('deleteList.input')" class="inputDelete" v-model="list">
        <button @click="deleteFunction" class="deleteButton">{{ t('deleteList.buttons') }}</button>

        <h2>{{ msg }}</h2>
    </div>


</template>

<script setup lang="ts">

import {ref} from 'vue'
import {type DeleteTaskRequest, deleteTask} from '@/service/task'
import { isAxiosError } from 'axios'
import { useI18n } from 'vue-i18n'


const {t} = useI18n()

const list = ref<string>('')


const msg = ref<string>('')

async function deleteFunction(){

    try{
        const response = await deleteTask(list.value)
        msg.value = response.mensager
        console.log(msg)
    }

    catch (err){
        if (isAxiosError(err)){
            msg.value = t('deleteList.erros.error_request')
            console.log("erro foi:", err)
        }

        else if (err instanceof Error){
            msg.value = t('deleteList.erros.error_generic')
            console.log("Erro não foi na requisição")
        }
    }
    

}



</script>


<style scoped lang="css">

.deleteForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  /* background: #f8f8f8; */
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
  border-radius: 12px;
}

.title {
  text-align: center;
  color: #e63946; /* vermelho de alerta */
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
}

.inputDelete {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: all 0.3s ease;
}

.inputDelete:focus {
  border-color: #e63946;
  outline: none;
  box-shadow: 0 0 5px rgba(230, 57, 70, 0.4);
}

.deleteButton {
  background: #e63946;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.deleteButton:hover {
  background: #b91c1c;
  transform: translateY(-2px);
}

.msg {
  color: #333;
  margin-top: 25px;
  font-size: 18px;
  text-align: center;
}

/* Responsividade */
@media (max-width: 480px) {
  .inputDelete {
    max-width: 100%;
  }

  .deleteButton {
    width: 100%;
  }
}

</style>