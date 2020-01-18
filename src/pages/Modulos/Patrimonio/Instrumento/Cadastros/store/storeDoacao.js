import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
let url = 'https://sigadm-patrimonio-services.herokuapp.com/api/';
let local = 'http://localhost:49775/api/'
let http = axios;



export default new Vuex.Store({
    state: {
        // O estado atual da aplicação está aqui
        origens:[]
    },
    getters: {
        /** Compute derived state based on the current state. More like computed property.
        *   como propriedades computadas para store o resultado de um getter é armazenado em cache com base em suas dependências 
        *   e só será reavaliado quando algumas de suas dependências forem alteradas.
        **/
    },
    mutations: {
        // MUDANÇAS NO ESTADO ATUAL
        
        MudandoStateOrigens(state, payload){
            state.origens = payload;
        }
    },
    actions: {
        // Obter dados do servidor e enviá-los para mutações para alterar o estado atual
        // Ação é disparada com Store.dispatch('nome da ação');
        
        BuscandoOrigensInstrumentos(context) {
            let Usuario = sessionStorage.getItem("usuario");
            let autorizacao = JSON.parse(Usuario);
            http.get(url + "OrigemInstrumento/v1", {
                headers: { authorization: "Bearer " + autorizacao.accessToken }
            }).then(response => {
                //console.log(response.status);
                if (response.status == 200) {
                    //console.log(response.data)
                    context.commit('MudandoStateOrigens', response.data)
                }
            }).catch(e => {
                //console.error(e);
                //console.data(e.data);
            });
        }
    }
})



