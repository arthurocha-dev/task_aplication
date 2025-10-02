import {api} from '@/service/api';


// 1️⃣ - Interface que descreve o formato de cada "dicionário"
export interface User {
    idTable: number,
    nameTable: string,
    emailTable: string,
    passwordTable: string,
    administratorTable: boolean
}


// 2️⃣ - Função que busca usuários na API

export async function searchUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/auth/get_all_users")
    return response.data;    
}

















/*
3️⃣ Interface
   - Serve para o TypeScript entender o formato esperado dos dados
   - Não cria nada em tempo de execução
   - Os nomes das chaves devem ser idênticos aos do JSON
   - A ordem das chaves NÃO importa
*/
// export interface User {
//   id: number;    // precisa existir e ser number
//   name: string;  // precisa existir e ser string
//   email: string; // precisa existir e ser string
// }

/*
4️⃣ Função assíncrona fetchUsers
   - async → transforma a função em assíncrona (sempre retorna uma Promise)
   - await → pausa a execução até que a Promise retorne o resultado
   - Promise<User[]> → a função retorna uma Promise que resolve com User[]
   - api.get<User[]>('/users') → o generic <User[]> garante que response.data será tratado como User[]
   - TypeScript usa isso para autocomplete, checagem de tipos e prevenção de erros
*/
// export async function fetchUsers(): Promise<User[]> {
//   const response = await api.get<User[]>('/users'); // ⏳ espera a API responder
//   return response.data; // ✅ aqui já temos User[]
// }

/*
5️⃣ Observações importantes:
   - TypeScript não valida se a API realmente retornou o formato correto
   - Se o JSON tiver chaves diferentes (ex: "nome" em vez de "name"), response.data.name será undefined
   - Se quiser validar de verdade, precisa de bibliotecas como Zod ou io-ts
*/

/*
6️⃣ Sobre export/import:
   - Export nomeado: export const api = ... → import { api } from './api';
   - Export default: export default api → import api from './api';
   - Export de objeto: export default { minhaFuncao } → import utils from './utils'; utils.minhaFuncao();
   - Função sem export → só pode ser usada dentro do próprio arquivo
*/

/*
7️⃣ async/await resumido:
   - async → função que retorna Promise, pode usar await dentro
   - await → pausa execução até a Promise resolver
   - Sem await, response seria uma Promise, não os dados
   - await garante que a próxima linha só execute depois que a operação assíncrona terminar
*/