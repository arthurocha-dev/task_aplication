<template>
    <h1 style="color: white; font-weight: bold;" >Editar Lista</h1>
    <br>

    <div class="editedForm">
       
            <h3 class="requestEdited">Qual a lista que deseja editar?</h3>
            <input type="text" placeholder="Digite o nome da lista" v-model="nameList" class="searchList">
            <h3 class="newNameListTitle">Qual o novo nome da lista?</h3>
            <input type="text" placeholder="Digite o novo nome" v-model="newList.name_edited" class="newNameListInput">
            <h3 class="newItensTitle">Digite os novos itens a serem adicionados</h3>
            <input type="text" placeholder="Digite os novos itens" v-model="item" class="newItensInput" >

            <br>
            <button @click="addItem(item)" class="buttonItem">Adicionar item</button>
            <br>
            <button @click="edit" class="buttonEdit">Fazer edição da lista</button>

            <h3>{{ msg }}</h3>
       

    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {type EditedListRequest, editedList} from '@/service/task'
import { isAxiosError } from 'axios'


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
        msg.value = 'Digite o nome da lista na qual deseja alterar'
    }
    else if (newList.value.name_edited === ''){
        msg.value = 'Escolha um novo nome ou deixe o mesmo'
    }
    else if (newList.value.list_edited.length === 0){
        msg.value = 'Digite algum item ou cancele a edição '
    }

    try{
        const response = await editedList(nameList.value, newList.value)
        msg.value = response.mensager
        console.log("Requisição feita com sucesso")
        console.log('listaaaa:', response.list)
    }
    catch (err){
        if (isAxiosError(err)){
            msg.value = 'erro na requisição'
            console.log('esse foi o erro:',err)
            console.log(`lista antiga: ${nameList.value}, novo nome: ${newList.value.name_edited}, itens: ${newList.value.list_edited}`)
        }

        else if (err instanceof Error){
            msg.value = `erro ts ${err}` 
            console.log('error ts', err)

        }
    }
    
}

</script>



<style scoped lang="css">

.editedForm{
    height: 35vw;
    width: 35vw;
    padding: 5%;
    background-color: rgba(0, 255, 255, 0.435);
}

.requestEdited{
    color: white;
    font-weight: bold;
}

.newNameListTitle{
    margin-top: 3%;
    color: white;
    font-weight: bold;
}
.newItensTitle{
    margin-top: 3%;
    color: white;
    font-weight: bold;
}


.buttonEdit{
    margin-top: 5%;
}


</style>