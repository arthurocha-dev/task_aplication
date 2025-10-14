 <template>

      <div class="formList">
        <div class="contentList">
            <h3 class="namedList">Nome da Lista</h3>

            <input type="text" placeholder="Digite o nome da lista" v-model="listTasks.name_list">


            <h3 class="itensListTitle">Itens da Lista</h3>

            <input type="text" placeholder="Digite os itens da Lista" v-model="listTasks.tasks_list">

             <div class="itensList">
                <h3>{{ listTasks.tasks_list}}</h3>

            </div>

            <button class="buttonItens" @click="addListTask">Adicionar Item</button>


            <button class="buttonSubmit" @click="task">Criar Lista</button>

           

        </div>

        <h3>{{ mensager}}</h3>

      </div>  


</template>

<script setup lang="ts">
import {ref} from 'vue'
import { type CreateTaskRequest, createTaskList } from '@/service/task';
import { isAxiosError } from 'axios';


const listTasks = ref<CreateTaskRequest>({
    name_list: '',
    tasks_list: [
        ''
    ]
})

const mensager = ref<string>("")

const newTask = ref<string>("")

function addListTask(){
    if (newTask.value.trim() === ''){
        return
    }

    listTasks.value.tasks_list.push(newTask.value)
    
}


async function task() {

    if (listTasks.value.name_list == ''){
        return mensager.value = 'Digite o nome da lista'
    }

    else if (listTasks.value.tasks_list.length === 1 || listTasks.value.tasks_list[0] === ''){
        return mensager.value = 'Digite os itens da lista'
    }

  
    try{
        const response = await createTaskList(listTasks.value)
        mensager.value = 'lista criada!'
        console.log('list create with success!', response.tasks_list)
    }

    catch (err){
        if (isAxiosError(err)){
            mensager.value = 'deu errado na requisição :('
            console.log('erro na requisição: ', err)
        }

        else if (err instanceof Error){
            mensager.value = 'Erro no ts'
            console.log('erro genérico do ts')
        }

    }


} 


</script>



<style scoped lang="css">

.formList{
    height: 30vw;
    width: 30vw;
    background-color: cornflowerblue;
}

.contentList{
    display: flex;
    flex-direction: column;
    margin-top: 5%;
}

.namedList{
    font-weight: bold;
    color: white;
}

.itensListTitle{
    margin-top: 4%;
    font-weight: bold;
    color: white;
}

.buttonSubmit{
    margin-top: 10%;
}

.itensList{
    margin: 10%;
    height: 60%;
    width: 80%;
    background-color: white;
}

.buttonItens{
    margin-top: 4%;
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