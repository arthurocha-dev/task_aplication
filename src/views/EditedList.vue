<template>
  <h1>{{ t('editedList.title') }}</h1>
  <br>

  <div class="editedForm">
    <h3 class="requestEdited">{{ t('editedList.request.what_list') }}</h3>
    <input
      type="text"
      :placeholder="t('editedList.inputs.enter_name_list')"
      v-model="nameList"
      class="searchList"
    />

    <h3 class="newNameListTitle">{{ t('editedList.request.new_name_list') }}</h3>
    <input
      type="text"
      :placeholder="t('editedList.inputs.enter_new_name')"
      v-model="newList.name_edited"
      class="newNameListInput"
    />

    <h3 class="newItensTitle">{{ t('editedList.request.enter_itens') }}</h3>
    <input
      type="text"
      :placeholder="t('editedList.inputs.enter_items')"
      v-model="item"
      class="newItensInput"
    />

    <button @click="addItem(item)" class="buttonItem">{{ t('editedList.buttons.add_item') }}</button>

    <div v-if="newList.list_edited && newList.list_edited.length" class="addedItemsBox">
      <h3 class="addedTitle">{{ t('editedList.request.new_items') }}</h3>
      <ul>
        <li v-for="(it, index) in newList.list_edited" :key="index">{{ it }}</li>
      </ul>
    </div>

    <button @click="edit" class="buttonEdit">{{ t('editedList.buttons.realized_edit') }}</button>

    <h3>{{ msg }}</h3>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {type EditedListRequest, editedList} from '@/service/task'
import { isAxiosError } from 'axios'
import { useI18n } from 'vue-i18n'


const {t} = useI18n()

const nameList = ref<string>('')


const item = ref<string>('')

const msg = ref<string>('')

const newList = ref<EditedListRequest>({
    name_edited: '',
    list_edited: []
})


function addItem(valueItem: string){

    if (valueItem === ''){
        return
    }

    newList.value.list_edited.push(valueItem)

    item.value = ''

}


async function edit() {

    if (nameList.value === ''){
        msg.value = t('editedList.erros.camps_default.name_list_old')
    }
    else if (newList.value.name_edited === ''){
        msg.value = t('editedList.erros.camps_default.new_name')
    }
    else if (newList.value.list_edited.length === 0){
        msg.value = t('editedList.erros.camps_default.item')
    }

    try{
        const response = await editedList(nameList.value, newList.value)
        msg.value = t('editedList.success')
        console.log("Requisição feita com sucesso")
        console.log('listaaaa:', response.list)
    }
    catch (err){
        if (isAxiosError(err)){
            msg.value = t('editedList.erros.error_request')
            console.log('esse foi o erro:',err)
            console.log(`lista antiga: ${nameList.value}, novo nome: ${newList.value.name_edited}, itens: ${newList.value.list_edited}`)
        }

        else if (err instanceof Error){
            msg.value =  t('editedList.erros.error_generic') 
            console.log('error ts', err)

        }
    }
    
}

</script>



<style scoped lang="css">

.editedForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  /* background: #f2f2f2; */
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
  border-radius: 12px;
}

h1 {
  text-align: center;
  margin-top: 20px;
  color: #42b883;
  font-weight: 700;
  font-size: 28px;
}

.requestEdited,
.newNameListTitle,
.newItensTitle {
  color: var(--color-text);
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 18px;
  text-align: center;
}

.searchList,
.newNameListInput,
.newItensInput {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: all 0.3s ease;
}

.searchList:focus,
.newNameListInput:focus,
.newItensInput:focus {
  border-color: #42b883;
  outline: none;
  box-shadow: 0 0 5px rgba(66, 184, 131, 0.4);
}

.buttonItem,
.buttonEdit {
  background: #42b883;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  margin-top: 15px;
}

.buttonItem:hover,
.buttonEdit:hover {
  background: #36976d;
  transform: translateY(-2px);
}

.addedItemsBox {
  background: var(--color-backgound-form);
  border-radius: 10px;
  padding: 15px 25px;
  margin-top: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.addedItemsBox ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.addedItemsBox li {
  background: #e9f8f2;
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  color: #333;
  font-size: 15px;
}

.addedTitle {
  color: #42b883;
  font-weight: 600;
  margin-bottom: 10px;
}

h3 {
  color: #333;
  margin-top: 20px;
  font-size: 17px;
  text-align: center;
}

@media (max-width: 480px) {
  .editedForm {
    padding: 30px 15px;
  }

  .searchList,
  .newNameListInput,
  .newItensInput {
    max-width: 100%;
  }

  .buttonItem,
  .buttonEdit {
    width: 100%;
  }

  .addedItemsBox {
    max-width: 100%;
  }
}



</style>