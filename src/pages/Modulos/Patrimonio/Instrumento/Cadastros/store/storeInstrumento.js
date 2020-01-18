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
        nome: 'Clarinete',
        ano: '2018',
        tombamento: '0001',
        caracteristica: 'Sib',
        nomesTest: [],
        nomes: [],
        anos: [],
        tombamentos: [],
        marcas: [],
        componentes: []
    },
    getters: {
        /** Compute derived state based on the current state. More like computed property.
        *   como propriedades computadas para store o resultado de um getter é armazenado em cache com base em suas dependências 
        *   e só será reavaliado quando algumas de suas dependências forem alteradas.
        **/
    },
    mutations: {
        // MUDANÇAS NO ESTADO ATUAL
        atualizarNomeInstrumento(state, nome) {
            state.nome = nome
        },
        MudandoStateNomesTest(state, payload) {
            state.nomesTest = payload;
        },
        MudandoStateNomes(state, payload) {
            state.nomes = payload;
        },
        MudandoStateAnos(state, payload) {
            state.anos = payload;
        },
        MudandoStateTombamentos(state, payload) {
            state.tombamentos = payload;
        },
        MudandoStateMarcas(state, payload) {
            state.marcas = payload;
        },
        MudandoStateComponente(state, payload) {
            state.componentes = payload;
        }
    },
    actions: {
        // Obter dados do servidor e enviá-los para mutações para alterar o estado atual
        // Ação é disparada com Store.dispatch('nome da ação');
        InserindoNomesInstrumentos(context) {
            let nomes = ['Clarinete', 'Violino', 'Flauta']
            context.commit('MudandoStateNomesTest', nomes)
        },
        BuscandoNomesInstrumentos(context) {
            let Usuario = sessionStorage.getItem("usuario");
            let autorizacao = JSON.parse(Usuario);
            http.get(url + "NomeInstrumento/v1", {
                headers: { authorization: "Bearer " + autorizacao.accessToken }
            }).then(response => {
                ////console.log(response.status);
                if (response.status == 200) {
                    ////console.log(response.data)
                    let nomes = [];
                    response.data.forEach(element => {
                        nomes.push(element)
                    });
                    context.commit('MudandoStateNomes', nomes)
                }
            }).catch(e => {
                //console.error(e);
                //console.data(e.data);
            });
        },
        BuscandoAnosInstrumentos(context) {
            let Usuario = sessionStorage.getItem("usuario");
            let autorizacao = JSON.parse(Usuario);
            http.get(url + "Ano/v1", {
                headers: { authorization: "Bearer " + autorizacao.accessToken }
            }).then(response => {
                ////console.log(response.status);
                if (response.status == 200) {
                    ////console.log(response.data)
                    let anos = []
                    response.data.forEach(element => {
                        anos.push(element)
                    });
                    context.commit('MudandoStateAnos', anos)
                }
            }).catch(e => {
                //console.error(e);
                //console.data(e.data);
            });
        },
        BuscandoTombamentosInstrumentos(context) {
            let Usuario = sessionStorage.getItem("usuario");
            let autorizacao = JSON.parse(Usuario);
            http.get(url + "TombamentoInstrumento/v1", { headers: { authorization: "Bearer " + autorizacao.accessToken } }).then(response => {
                ////console.log(response.status);
                if (response.status == 200) {
                    let tombamento = [];
                    response.data.forEach(element => {
                        if (element.status == 1) {
                            tombamento.push({ id: element.id, numero: element.numero })
                            context.commit('MudandoStateTombamentos', tombamento)
                        }
                    });
                }
            }).catch(e => {
                //console.error(e);
                //console.data(e.data);
            });
        },
        BuscandoMarcasInstrumentos(context) {
            let Usuario = sessionStorage.getItem("usuario");
            let autorizacao = JSON.parse(Usuario);
            http.get(url + "MarcaInstrumento/v1", {
                headers: { authorization: "Bearer " + autorizacao.accessToken }
            }).then(response => {
                ////console.log(response.status);
                if (response.status == 200) {
                    ////console.log(response.data)
                    let marcas = [];
                    response.data.forEach(element => {
                        marcas.push(element)
                    });
                    context.commit('MudandoStateMarcas', marcas)
                }
            }).catch(e => {
                //console.error(e);
                //console.data(e.data);
            });
        },
        BuscandoComponentesInstrumentos(context) {
            let Usuario = sessionStorage.getItem("usuario");
            let autorizacao = JSON.parse(Usuario);
            http.get(url + "ComponenteInstrumento/v1", {
                headers: { authorization: "Bearer " + autorizacao.accessToken }
            }).then(response => {
                ////console.log(response.status);
                if (response.status == 200) {
                    ////console.log(response.data)
                    let componentes = [];
                    response.data.forEach(element => {
                        componentes.push(element)
                    });
                    context.commit('MudandoStateComponente', componentes)
                }
            }).catch(e => {
                //console.error(e);
                //console.data(e.data);
            });
        }
    }
})



