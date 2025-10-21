 <template>

      <div class="formList">
        <div class="contentList">
            <h3 class="namedList">{{ t('createList.titles.name_list') }}</h3>

            <input type="text" :placeholder= "t('createList.inputs.name_list')" v-model="listTasks.name_list">


            <h3 class="itensListTitle">{{ t('createList.titles.items_list') }}</h3>

            <input type="text" :placeholder="t('createList.inputs.items_list')" v-model="newTask">

             <div class="itensList">
                <h2 style="color: grey;">{{ listTasks.tasks_list}}</h2>

            </div>

            <button class="buttonItens" @click="addListTask">{{ t('createList.buttons.add_item') }}</button>


            <button class="buttonSubmit" @click="task">{{ t('createList.buttons.create_list') }}</button>

           

        </div>

        <h3>{{ mensager}}</h3>

      </div>  


</template>

<script setup lang="ts">
import {ref} from 'vue'
import { type CreateTaskRequest, createTaskList } from '@/service/task';
import { isAxiosError } from 'axios';
import {useI18n} from 'vue-i18n'


const {t} = useI18n()

const listTasks = ref<CreateTaskRequest>({
    name_list: '',
    tasks_list: [
        
    ]
})

const mensager = ref<string>("")

const newTask = ref<string>("")

function addListTask(){
    if (newTask.value.trim() === ''){
        return
    }

    listTasks.value.tasks_list.push(newTask.value)
    newTask.value = ''
    
}


async function task() {

    if (listTasks.value.name_list == ''){
        return mensager.value = t('createList.erros.inputs.camp_name_list')
    }

    else if (listTasks.value.tasks_list.length === 1 || listTasks.value.tasks_list[0] === ''){
        return mensager.value = t('createList.erros.inputs.camp_items_list')
    }

  
    try{
        const response = await createTaskList(listTasks.value)
        mensager.value = t('createList.success')
        listTasks.value.tasks_list = []
        console.log('list create with success!', response.name_list)
        listTasks.value.name_list = ''
    }

    catch (err){
        if (isAxiosError(err)){
            mensager.value = t('createList.erros.error_request')
            console.log('erro na requisição: ', err)
        }

        else if (err instanceof Error){
            mensager.value = t('createList.erros.error_generic')
            console.log('erro genérico do ts')
        }

    }


} 


</script>



<style scoped lang="css">




.formList {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* background: #f2f2f2; */
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.contentList {
  background: var(--color-backgound-form);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 450px;
  text-align: center;
}

.namedList, 
.itensListTitle {
  color: #333;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  margin: 10px 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type="text"]:focus {
  border-color: #42b883; 
  outline: none;
  box-shadow: 0 0 5px rgba(66, 184, 131, 0.4);
}

.itensList {
  background: #fafafa;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}

.buttonItens,
.buttonSubmit {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.buttonItens {
  background: #35495e;
}

.buttonItens:hover {
  background: #2b3b4d;
}

.buttonSubmit {
  background: #42b883;
}

.buttonSubmit:hover {
  background: #36976d;
}

.namedList {
  color: var(--color-text);
  margin-top: 10px;
}

.itensListTitle{
color: var(--color-text);
  margin-top: 10px;

}

@media (max-width: 480px) {
  .contentList {
    padding: 25px;
  }

  input[type="text"] {
    font-size: 14px;
  }

  .buttonItens,
  .buttonSubmit {
    font-size: 14px;
    padding: 10px;
  }
}


</style>



<!-- 

⚖️ Diferença entre == e === em JavaScript/TypeScript
Operador	Nome	O que faz	Exemplo	Resultado
==	Igualdade solta (ou fraca)	Compara valores, mas tenta converter tipos antes(ou seja ele vai converter 5 para 5.toString por exemplo)	5 == "5"	✅ true
===	Igualdade estrita	Compara valor e tipo, sem conversão automática	5 === "5"	❌ false

💡 Resumo simples:

== → o JavaScript tenta “adivinhar” o que tu quis dizer (faz coerção de tipo).

=== → ele é exigente: “mesmo tipo, mesmo valor, senão é falso”.

🧠 Exemplo real:

console.log(0 == false)   // true 😬 (porque 0 é falsy)
console.log(0 === false)  // false ✅ (porque number !== boolean)


👉 Em TypeScript (e boas práticas JS), sempre usa === e !==.
Assim tu evita bugs estranhos com coerções automáticas do JS. -->