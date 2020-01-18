 
<template>
  <site-patrimonio>
    <div class="block-header align-center mt-5">
      <h2 class="font-weight-bold headline blue--text text--darken-4">Igrejas do Rio Grande do Norte</h2>
    </div>
    <v-card></v-card>
    <!-- Exportable Table -->
    <v-card>
      <v-flex xs12 sm12 md12 lg12 d-flex>
        <v-flex xs4 sm4 md6 lg3 v-if="busca == false" class="pt-5 pl-4">
          <v-hover>
            <v-text-field
              box
              v-model="procurar"
              append-icon="search"
              label="Procurar igrejas ..."
              class="text--pink"
              color="blue darken-4"
              hide-details
            ></v-text-field>
          </v-hover>
        </v-flex>
        <v-flex xs6 sm6 md3 lg3 offset-md5 align-center class="pt-5 pl-4" v-if="busca == false">
          <cad-igreja @Igreja="BuscarIgrejas()"></cad-igreja>
          <cad-editar
            :dialog_ativar="ativar_edicao"
            :igreja_edicao="igreja_edicao"
            @Igreja="BuscarIgrejas()"
          ></cad-editar>
        </v-flex>
        <!--
        BOTÃO PARA ATIVAR MODO EDIÇÃO
        <v-flex-- class="pt-5 pl-4" v-if="busca == false">
          <v-btn outline color="red" @click="openEdicao">
            <v-icon>fas fa-cog</v-icon>
          </v-btn>
        </v-flex
        -->
      </v-flex>
      <v-layout row align-center>
        <v-dialog v-model="busca" max-width="350" persistent>
          <v-card>
            <v-card-title class="headline light-blue darken-4 white--text">
              <v-flex align-center class="white--text text--darken-4">SETORIZAÇÃO |
            <span class="grey--text text--lighten-1">IGREJAS</span></v-flex>
            </v-card-title>
            <v-card-text>
              <v-flex sm12 xs12 md12 lg12 align-center d-flex>
                <span>
                  <v-progress-circular
                    :size="50"
                    :width="3"
                    color="light-blue darken-4"
                    indeterminate
                  >
                    <v-icon color="light-blue darken-4">fas fa-map-marker-alt</v-icon>
                  </v-progress-circular>
                  <br />
                  <h5 class="light-blue--text text--darken-4">Esperando informações ...</h5>
                </span>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-data-table
        class="pt-5"
        :search="procurar"
        :headers="headers"
        v-if="busca == false"
        :items="igrejas"
        :item-key="igrejas.id"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td
              class="pl-4 text-xs-left"
              @click="AtivarEdicao(props.item)"
              style="cursor:pointer;"
            >{{props.item.codigo.substring(2,'')+'-'+props.item.codigo.substring(2,4)+'-'+props.item.codigo.substring(4,8)}}</td>
            <td
              class="pl-4 text-xs-left"
              @click="AtivarEdicao(props.item)"
              style="cursor:pointer;"
            >{{props.item.cidade}}</td>
            <td
              class="pl-4 text-xs-left"
              @click="AtivarEdicao(props.item)"
              style="cursor:pointer;"
            >{{props.item.nomeRelatorio}}</td>
            <td class="pl-3 text-xs-center">
              <v-edit-dialog
                :return-value.sync="props.item.encRegional"
                lazy
                @save="saveRegional(props.item.encRegional,props.item)"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                <span class="ml-1">{{ props.item.encRegional }}</span>
                <template v-slot:input>
                  <v-autocomplete
                    class="mt-3"
                    v-model="props.item.encRegional"
                    :items="regionais"
                    box
                    label="Encarregado regional"
                    item-text="nome"
                    item-value="nome"
                    color="teal darken-3"
                    single-line
                  >
                    <template slot="item" slot-scope="data">
                      <v-flex xs10 sm10>
                        <v-list-tile>
                          <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                    </template>
                  </v-autocomplete>
                </template>
              </v-edit-dialog>
            </td>
            <td class="pl-3 text-xs-center">
              <v-edit-dialog
                :return-value.sync="props.item.encLocal"
                lazy
                @save="saveEncLocal(props.item.encLocal,props.item)"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                <span class="ml-1">{{ props.item.encLocal }}</span>
                <template v-slot:input>
                  <v-autocomplete
                    class="mt-3"
                    v-model="props.item.encLocal"
                    :items="encLocais"
                    box
                    label="Encarregado local"
                    item-text="nome"
                    item-value="nome"
                    color="teal darken-3"
                    single-line
                  >
                    <template slot="item" slot-scope="data">
                      <v-flex xs10 sm10>
                        <v-list-tile>
                          <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                    </template>
                  </v-autocomplete>
                </template>
              </v-edit-dialog>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-snackbar v-model="snack" :timeout="5000" :color="snackColor" :botton="true" :right="true">
        {{ snackText }}
        <v-btn flat @click="snack = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-snackbar v-model="snackEdicao" :timeout="1000000" color="yellow" :top="true" :right="true">
        <span class="black--text">{{ snackTextEdicao }}</span>
        <v-btn color="indigo" @click="closeEdicao">Desativar</v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="snackDesativadaEdicao"
        :timeout="5000"
        color="green"
        :top="true"
        :right="true"
      >
        <span class="white--text">{{ snackTextEdicao }}</span>
      </v-snackbar>
    </v-card>

    <!-- #END# Exportable Table -->
  </site-patrimonio>
</template>

<script>
import SitePatrimonio from "@/templates/SitePatrimonio";
import CadIgreja from "@/pages/Modulos/Patrimonio/Setorizacao/Cadastros/IgrejaModal";
import CadEditar from "@/pages/Modulos/Patrimonio/Setorizacao/Cadastros/IgrejaEditarModal";

import swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    SitePatrimonio,
    CadIgreja,
    CadEditar
  },
  data() {
    return {
      ativar_edicao: "",
      igreja_edicao: Object,
      procurar: "",
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: -1,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16]
      },
      snack: false,
      snackEdicao: false,
      snackDesativadaEdicao: false,
      snackColor: "",
      snackText: "",
      snackTextEdicao: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      headers: [
        {
          text: "CÓDIGO RELATÓRIO",
          align: "left",
          value: "codigo",
          class: "blue darken-3 white--text",
          width: "1%"
        },
        {
          text: "CIDADE",
          align: "left",
          class: "blue darken-3 white--text",
          value: "cidade",
          width: "1%"
        },
        {
          text: "CASA DE ORAÇÃO",
          align: "left",
          class: "blue darken-3 white--text",
          value: "nomeRelatorio",
          width: "1%"
        },
        {
          text: "ENCARREGADO REGIONAL",
          value: "encRegional",
          class: "blue darken-3 white--text",
          width: "1%"
        },
        {
          text: "ENCARREGADO LOCAL",
          value: "encLocal",
          class: "blue darken-3 white--text",
          width: "1%"
        }
      ],
      autorizacao: false,
      igrejas: [],
      show: false,
      busca: true,
      regionais: [{ nome: "Sem encarregado" }],
      encLocais: [{ nome: "Sem encarregado" }],
      token: ""
    };
  },
  created() {
    this.BuscarIgrejas();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate();
    }
  },
  watch: {
    /* eslint-disable */
    date(val) {
      this.dateFormatted = this.formatDate();
    }
  },
  methods: {
    AtivarEdicao(igreja) {
      // //console.log(igreja);
      this.ativar_edicao = Math.random();
      this.igreja_edicao = igreja;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    BuscarIgrejas() {
      /* eslint-disable */
      this.igrejas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        this.token = Math.random();
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + "Igreja/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            if (response.data.length == 0) {
              this.busca = false;
            }
            //console.log(response.status);
            if (response.status == 200) {
              this.igrejas = response.data;
              this.BuscarEncarregadosRegionais();
              this.BuscarEncarregadosLocais();
              this.busca = false;
              //console.log("Igrejas N Relatorio:", this.igrejas);
            } else if (response.status == 401) {
              this.token = Math.random();
            }
            ////console.log(response.data);
          })
          .catch(e => {
            this.token = Math.random();
            //console.log("Nao autorizado", this.token);
            ////console.error(e);
            ////console.data(e.data);
          });        
      }
    },
    IgrejaPut(item) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        //console.log("Nao autorizado");
      } else if (usuarioAutorize) {
        //console.log("Put list ", item);
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .put(
            this.$url + "Igreja/v1",
            {
              id: item[0].id,
              codigo: item[0].codigo,
              cidade: item[0].cidade,
              bairro: item[0].bairro,
              endereco: item[0].endereco,
              cep: item[0].cep,
              encRegional: item[0].encRegional,
              encLocal: item[0].encLocal,
              launchDate: item[0].launchDate
            },
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              //console.log("Salvo com sucesso, dados:", response.data);
              //this.closeEdicao();
              this.busca = false;
            }
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarEncarregadosRegionais() {
      //console.log("buscar regional");
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (!autorizacaoAux) {
        swal.fire(
          "Sua autorização expirou!",
          "Entre com suas credencias novamente.",
          "warning"
        );
        this.$router.push("/");
      }
      if (autorizacaoAux) {
        //console.log("regional buscando");
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro de devolucao");
        this.$http
          .get(this.$url + "Usuario/v1", {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.regionais = [];
              response.data.forEach(element => {
                if (element.cargo == "Encarregado Regional") {
                  this.regionais.push({ nome: element.nome });
                }
              });
              this.regionais.push({ nome: "Sem encarregado" });
              this.regionais.reverse();
            }
          })
          .catch(e => {
            this.token = Math.random();
            //console.log("Nao autorizado", this.token);
          });
      }
    },
    BuscarEncarregadosLocais() {
      //console.log("buscar encarregado local");
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (!autorizacaoAux) {
        swal.fire(
          "Sua autorização expirou!",
          "Entre com suas credencias novamente.",
          "warning"
        );
        this.$router.push("/");
      }
      if (autorizacaoAux) {
        //console.log("local buscando");
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro de devolucao");
        this.$http
          .get(this.$url + "Usuario/v1", {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.encLocais = [];
              response.data.forEach(element => {
                if (element.cargo == "Encarregado Local") {
                  this.encLocais.push({ nome: element.nome });
                }
              });
              this.encLocais.push({ nome: "Sem encarregado" });
              this.encLocais.reverse();
            }
          })
          .catch(e => {
            this.token = Math.random();
            //console.log("Nao autorizado", this.token);
          });
      }
    },
    saveRegional(item, lista) {
      this.snack = true;
      this.snackColor = "green accent-4";
      this.snackText = "Edição salva";
      //console.log("item: " + item);
      //console.log("lista: ", lista);
      let listaNova = [];
      listaNova.push({
        id: lista.id,
        codigo: lista.codigo,
        cidade: lista.cidade,
        bairro: lista.cidade,
        endereco: lista.endereco,
        cep: lista.cep,
        encRegional: item,
        encLocal: lista.encLocal,
        launchDate: lista.launchDate
      });
      //console.log(listaNova);
      this.IgrejaPut(listaNova);
    },
    saveEncLocal(item, lista) {
      this.snack = true;
      this.snackColor = "green accent-4";
      this.snackText = "Edição salva";
      //console.log("item: ", item);
      //console.log("lista: ", lista);
      let listaNova = [];
      listaNova.push({
        id: lista.id,
        codigo: lista.codigo,
        cidade: lista.cidade,
        bairro: lista.cidade,
        endereco: lista.endereco,
        cep: lista.cep,
        encRegional: lista.encRegional,
        encLocal: item,
        launchDate: lista.launchDate
      });
      //console.log(listaNova);
      this.IgrejaPut(listaNova);
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Edição cancelada";
    },
    open() {
      this.snack = true;
      this.snackColor = "indigo";
      this.snackText = "Edição iniciada";
    },
    open() {
      this.snack = true;
      this.snackColor = "indigo";
      this.snackText = "Edição iniciada";
    },
    openEdicao() {
      this.snackEdicao = true;
      this.snackTextEdicao = "Modo de edição ativado";
    },
    closeEdicao() {
      this.snackEdicao = false;
      this.snackDesativadaEdicao = true;
      this.snackTextEdicao = "Modo de edição desativado";
    },
    close() {
      //console.log("Dialog closed");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 1px;
}
</style>
