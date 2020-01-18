<template>
  <site-patrimonio>
    <div class="block-header align-center pt-4">
      <h2
        class="font-weight-bold headline blue--text text--darken-4"
      >SOLICITAÇÕES PARA EMPRÉSTIMO DE INSTRUMENTOS</h2>
    </div>
    <v-flex xs12 sm12 md12 lg12>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab>
         <v-badge color="blue">
      <template v-slot:badge>
       {{total_solicitacao_emprestimo}}
      </template>
      <span>Todas</span>
    </v-badge>
        </v-tab>
        <v-tab>
           <v-badge color="green">
      <template v-slot:badge>
       {{total_solicitacao_andamento}}
      </template>
      <span>Em andamento</span>
    </v-badge>
        </v-tab>
        <v-tab>
           <v-badge color="brown">
      <template v-slot:badge>
       {{total_solicitacao_finalizadas}}
      </template>
      <span>Finalizadas ou Não aprovadas</span>
    </v-badge>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card class="elevation-0">
            <v-flex xs12 sm12 md12 lg12 d-flex>
              <v-flex xs4 sm4 md6 lg3 v-if="busca == false" class="pt-5 pl-4">
                <v-hover>
                  <v-text-field
                    v-model="procurar"
                    append-icon="search"
                    label="Procurar solicitação ..."
                    color="blue darken-4"
                    hide-details
                  ></v-text-field>
                </v-hover>
              </v-flex>
              <v-flex
                xs6
                sm6
                md4
                lg4
                offset-md5
                align-center
                class="pt-5 pl-4"
                v-if="busca == false"
              >
                <solicitacao-emprestimo @solicitacaoSalva="BuscarSolicitacoesEmprestimo()"></solicitacao-emprestimo>
              </v-flex>
            </v-flex>
            <v-layout row align-center>
              <v-dialog v-model="busca" max-width="150" persistent>
                <v-card>
                  <v-card-title class="subheader light-blue darken-4 white--text">
                    <v-flex align-center class="white--text text--darken-4">SOLICITAÇÕES</v-flex>
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
                          <v-icon color="light-blue darken-4" small>fas fa-file-import</v-icon>
                        </v-progress-circular>
                        <br />
                        <h5 class="light-blue--text text--darken-4">Buscando ...</h5>
                      </span>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-data-table
              class="mt-5"
              :search="procurar"
              :headers="headers"
              v-if="busca == false"
              :items="solicitacoes_emprestimos"
              :item-key="solicitacoes_emprestimos.id"
              :pagination.sync="pagination"
            >
              <template slot="items" slot-scope="props" class="mb-3">
                <tr class="pl-4 text-xs-left" style="cursor:pointer;">
                  <td @click.stop="AtivarEdicao(props.item.dados)" class>{{ props.item.nome }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.primeiroInstrumento + " " + props.item.primeiraCategoria }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.segundoInstrumento + " " + props.item.segundaCategoria}}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.comumCongregacao }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{formatDate(props.item.dataCadastro)}}</td>
                  <td>
                    <span v-if="props.item.status == 'Aguardando'">
                      <autorizar-solicitacao
                        :statusSolicitacao="props.item.status"
                        :irmao="props.item.nome"
                        :solicitacao="props.item.dados"
                        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
                      ></autorizar-solicitacao>
                    </span>
                    <span v-if="props.item.status == 'Aprovado'">
                      <atender-solicitacao
                        :statusSolicitacao="props.item.status"
                        :irmao="props.item.id_irmao"
                        :solicitacao="props.item.dados"
                        :instrumento_um="props.item.primeiroInstrumento"
                        :instrumento_dois="props.item.segundoInstrumento"
                        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
                        @emprestimo_sucesso="BuscarSolicitacoesEmprestimo"
                      ></atender-solicitacao>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Não aprovado'">
                      <v-btn flat color="error">
                        <small>
                          <v-icon small left>fas fa-times-circle</v-icon>
                          {{props.item.status}}
                        </small>
                      </v-btn>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Anexar'">
                      <anexar-solicitacao
                        :solicitacao="props.item.dados"
                        :statusSolicitacao="props.item.status"
                        @anexar_sucesso="BuscarSolicitacoesEmprestimo"
                      ></anexar-solicitacao>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Finalizada'">
                      <v-btn flat color="brown">
                        <small>
                          <v-icon small left>fas fa-file-alt</v-icon>
                          {{props.item.status}}
                        </small>
                      </v-btn>
                    </span>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="elevation-0">
            <v-flex xs12 sm12 md12 lg12 d-flex>
              <v-flex xs4 sm4 md6 lg3 v-if="busca == false" class="pt-5 pl-4">
                <v-hover>
                  <v-text-field
                    v-model="procurar"
                    append-icon="search"
                    label="Procurar solicitação ..."
                    color="blue darken-4"
                    hide-details
                  ></v-text-field>
                </v-hover>
              </v-flex>
              <v-flex
                xs6
                sm6
                md4
                lg4
                offset-md5
                align-center
                class="pt-5 pl-4"
                v-if="busca == false"
              >
                <solicitacao-emprestimo @solicitacaoSalva="BuscarSolicitacoesEmprestimo()"></solicitacao-emprestimo>
              </v-flex>
            </v-flex>
            <v-layout row align-center>
              <v-dialog v-model="busca" max-width="150" persistent>
                <v-card>
                  <v-card-title class="subheader light-blue darken-4 white--text">
                    <v-flex align-center class="white--text text--darken-4">SOLICITAÇÕES</v-flex>
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
                          <v-icon color="light-blue darken-4" small>fas fa-file-import</v-icon>
                        </v-progress-circular>
                        <br />
                        <h5 class="light-blue--text text--darken-4">Buscando ...</h5>
                      </span>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-data-table
              class="mt-5"
              :search="procurar"
              :headers="headers"
              v-if="busca == false"
              :items="solicitacoes_andamento"
              :item-key="solicitacoes_andamento.id"
              :pagination.sync="pagination"
            >
              <template slot="items" slot-scope="props" class="mb-3">
                <tr class="pl-4 text-xs-left" style="cursor:pointer;">
                  <td @click="AtivarEdicao(props.item.dados)">{{ props.item.nome }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.primeiroInstrumento + " " + props.item.primeiraCategoria }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.segundoInstrumento + " " + props.item.segundaCategoria}}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.comumCongregacao }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{formatDate(props.item.dataCadastro)}}</td>
                  <td>
                    <span v-if="props.item.status == 'Aguardando'">
                      <autorizar-solicitacao
                        :statusSolicitacao="props.item.status"
                        :irmao="props.item.nome"
                        :solicitacao="props.item.dados"
                        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
                      ></autorizar-solicitacao>
                    </span>
                    <span v-if="props.item.status == 'Aprovado'">
                      <atender-solicitacao
                        :statusSolicitacao="props.item.status"
                        :irmao="props.item.id_irmao"
                        :solicitacao="props.item.dados"
                        :instrumento_um="props.item.primeiroInstrumento"
                        :instrumento_dois="props.item.segundoInstrumento"
                        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
                        @emprestimo_sucesso="BuscarSolicitacoesEmprestimo"
                      ></atender-solicitacao>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Não aprovado'">
                      <v-btn flat color="error">
                        <small>
                          <v-icon small left>fas fa-times-circle</v-icon>
                          {{props.item.status}}
                        </small>
                      </v-btn>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Anexar'">
                      <anexar-solicitacao
                        :solicitacao="props.item.dados"
                        :statusSolicitacao="props.item.status"
                        @anexar_sucesso="BuscarSolicitacoesEmprestimo"
                      ></anexar-solicitacao>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Finalizada'">
                      <v-btn flat color="brown">
                        <small>
                          <v-icon small left>fas fa-file-alt</v-icon>
                          {{props.item.status}}
                        </small>
                      </v-btn>
                    </span>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="elevation-0">
            <v-flex xs12 sm12 md12 lg12 d-flex>
              <v-flex xs4 sm4 md6 lg3 v-if="busca == false" class="pt-5 pl-4">
                <v-hover>
                  <v-text-field
                    v-model="procurar"
                    append-icon="search"
                    label="Procurar solicitação ..."
                    color="blue darken-4"
                    hide-details
                  ></v-text-field>
                </v-hover>
              </v-flex>
              <v-flex
                xs6
                sm6
                md4
                lg4
                offset-md5
                align-center
                class="pt-5 pl-4"
                v-if="busca == false"
              >
                <solicitacao-emprestimo @solicitacaoSalva="BuscarSolicitacoesEmprestimo()"></solicitacao-emprestimo>
              </v-flex>
            </v-flex>
            <v-layout row align-center>
              <v-dialog v-model="busca" max-width="150" persistent>
                <v-card>
                  <v-card-title class="subheader light-blue darken-4 white--text">
                    <v-flex align-center class="white--text text--darken-4">SOLICITAÇÕES</v-flex>
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
                          <v-icon color="light-blue darken-4" small>fas fa-file-import</v-icon>
                        </v-progress-circular>
                        <br />
                        <h5 class="light-blue--text text--darken-4">Buscando ...</h5>
                      </span>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-data-table
              class="mt-5"
              :search="procurar"
              :headers="headers"
              v-if="busca == false"
              :items="solicitacoes_finalizadas"
              :item-key="solicitacoes_finalizadas.id"
              :pagination.sync="pagination"
            >
              <template slot="items" slot-scope="props" class="mb-3">
                <tr class="pl-4 text-xs-left" style="cursor:pointer;">
                  <td @click="AtivarEdicao(props.item.dados)" class>{{ props.item.nome }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.primeiroInstrumento + " " + props.item.primeiraCategoria }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.segundoInstrumento + " " + props.item.segundaCategoria}}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{ props.item.comumCongregacao }}</td>
                  <td
                    @click="AtivarEdicao(props.item.dados)"
                    class
                  >{{formatDate(props.item.dataCadastro)}}</td>
                  <td>
                    <span v-if="props.item.status == 'Aguardando'">
                      <autorizar-solicitacao
                        :statusSolicitacao="props.item.status"
                        :irmao="props.item.nome"
                        :solicitacao="props.item.dados"
                        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
                      ></autorizar-solicitacao>
                    </span>
                    <span v-if="props.item.status == 'Aprovado'">
                      <atender-solicitacao
                        :statusSolicitacao="props.item.status"
                        :irmao="props.item.id_irmao"
                        :solicitacao="props.item.dados"
                        :instrumento_um="props.item.primeiroInstrumento"
                        :instrumento_dois="props.item.segundoInstrumento"
                        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
                        @emprestimo_sucesso="BuscarSolicitacoesEmprestimo"
                      ></atender-solicitacao>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Não aprovado'">
                      <v-btn flat color="error">
                        <small>
                          <v-icon small left>fas fa-times-circle</v-icon>
                          {{props.item.status}}
                        </small>
                      </v-btn>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Anexar'">
                      <anexar-solicitacao
                        :solicitacao="props.item.dados"
                        :statusSolicitacao="props.item.status"
                        @anexar_sucesso="BuscarSolicitacoesEmprestimo"
                      ></anexar-solicitacao>
                    </span>
                    <span class="center-block" v-if="props.item.status == 'Finalizada'">
                      <v-btn flat color="brown">
                        <small>
                          <v-icon small left>fas fa-file-alt</v-icon>
                          {{props.item.status}}
                        </small>
                      </v-btn>
                    </span>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <editar-solicitacao
        :dialog_ativar="ativar_edicao"
        :solicitacao_dados="solicitacao_edicao"
        @SolicitacaoDeletada="BuscarSolicitacoesEmprestimo"
        @solicitacaoSalva="BuscarSolicitacoesEmprestimo"
      ></editar-solicitacao>
    </v-flex>
  </site-patrimonio>
</template>

<script>
import SolicitacaoEmprestimo from "@/pages/Modulos/Patrimonio/SolicitacoesEmprestimo/Cadastros/CadastroSolicitacaoEmprestimoModal.vue";
import SitePatrimonio from "@/templates/SitePatrimonio.vue";
import EditarSolicitacao from "@/pages/Modulos/Patrimonio/SolicitacoesEmprestimo/Editar/EditarSolicitacaoEmprestimoModal.vue";
import AutorizarSolicitacao from "@/pages/Modulos/Patrimonio/SolicitacoesEmprestimo/Editar/AutorizarSolicitacaoEmprestimoModal.vue";
import AtenderSolicitacao from "@/pages/Modulos/Patrimonio/SolicitacoesEmprestimo/Editar/AtenderSolicitacaoEmprestimoModal.vue";
import AnexarSolicitacao from "@/pages/Modulos/Patrimonio/SolicitacoesEmprestimo/Editar/AnexarSolicitacaoEmprestimoModal.vue";
import Termos from "@/pages/Modulos/Patrimonio/Instrumento/Emprestimo/Termos";

import swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    SitePatrimonio,
    SolicitacaoEmprestimo,
    EditarSolicitacao,
    AutorizarSolicitacao,
    AtenderSolicitacao,
    AnexarSolicitacao
  },
  data() {
    return {
      total_solicitacao_emprestimo: 0,
      total_solicitacao_andamento: 0,
      total_solicitacao_finalizadas: 0,
      tab: null,
      ativar_edicao: "",
      solicitacao_edicao: Object,
      procurar: "",
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: -1,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16]
      },
      headers: [
        {
          text: "NOME",
          align: "left",
          value: "nome",
          class: "blue darken-3 white--text"
        },
        {
          text: "INSTRUMENTO 01",
          align: "left",
          value: "primeiroInstrumento",
          class: "blue darken-3 white--text"
        },
        {
          text: "INSTRUMENTO 02",
          align: "left",
          value: "segundoInstrumento",
          class: "blue darken-3 white--text"
        },
        {
          text: "CASA DE ORAÇÃO",
          align: "left",
          value: "comumCongregacao",
          sortable: false,
          class: "blue darken-3 white--text"
        },
        {
          text: "DATA DE CADASTRO",
          align: "left",
          value: "dataCadastro",
          sortable: false,
          class: "blue darken-3 white--text"
        },
        {
          text: "SITUAÇÃO",
          align: "justify",
          value: "status",
          class: "blue darken-3 white--text"
        }
      ],
      autorizacao: false,
      solicitacoes_emprestimos: [],
      solicitacoes_andamento: [],
      solicitacoes_finalizadas: [],
      show: false,
      busca: true,
      identificacaoIgreja: "",
      igreja: [],
      idUsuario: null,
      dataCadastro: null
    };
  },
  created() {
    this.BuscarSolicitacoesEmprestimo();
  },
  methods: {
    AtivarEdicao(irmao) {
      this.ativar_edicao = Math.random();
      this.solicitacao_edicao = irmao;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    CadastrarIrmao() {
      this.$router.push("/cadastro-patrimonio-novo-irmao");
    },
    BuscarSolicitacoesEmprestimo() {
      this.solicitacoes_emprestimos = [];
      this.solicitacoes_andamento = [];
      this.solicitacoes_finalizadas = [];
      this.total_solicitacao_emprestimo = 0;
      this.total_solicitacao_andamento = 0;
      this.total_solicitacao_finalizadas = 0;
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        //this.$router.push("/");
        const toast = swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: "error",
          title: "Sem autorização, entre com seus dados novamente!"
        });
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + "SolicitacaoEmprestimo/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            if (response.status == 200) {
              this.busca = false;
              response.data.forEach(element => {
                this.solicitacoes_emprestimos.push({
                  id: element.id,
                  nome: element.nome,
                  id_irmao: element.irmao,
                  primeiroInstrumento: element.primeiroInstrumento,
                  segundoInstrumento: element.segundoInstrumento,
                  primeiraCategoria: element.primeiraCategoria,
                  segundaCategoria: element.segundaCategoria,
                  comumCongregacao: element.comumCongregacao,
                  dataCadastro: element.dataCadastro.substring(0, 10),
                  status: element.status,
                  dados: element
                });
                this.total_solicitacao_emprestimo++;
                if (
                  element.status != "Não aprovado" &&
                  element.status != "Finalizada"
                ) {
                  this.solicitacoes_andamento.push({
                    id: element.id,
                    nome: element.nome,
                    id_irmao: element.irmao,
                    primeiroInstrumento: element.primeiroInstrumento,
                    segundoInstrumento: element.segundoInstrumento,
                    primeiraCategoria: element.primeiraCategoria,
                    segundaCategoria: element.segundaCategoria,
                    comumCongregacao: element.comumCongregacao,
                    dataCadastro: element.dataCadastro.substring(0, 10),
                    status: element.status,
                    dados: element
                  });
                  this.total_solicitacao_andamento++;
                }
                if (
                  element.status == "Não aprovado" ||
                  element.status == "Finalizada"
                ) {
                  this.solicitacoes_finalizadas.push({
                    id: element.id,
                    nome: element.nome,
                    id_irmao: element.irmao,
                    primeiroInstrumento: element.primeiroInstrumento,
                    segundoInstrumento: element.segundoInstrumento,
                    primeiraCategoria: element.primeiraCategoria,
                    segundaCategoria: element.segundaCategoria,
                    comumCongregacao: element.comumCongregacao,
                    dataCadastro: element.dataCadastro.substring(0, 10),
                    status: element.status,
                    dados: element
                  });
                  this.total_solicitacao_finalizadas++;
                }
              });
              this.solicitacoes_emprestimos.reverse();
              this.solicitacoes_andamento.reverse();
              this.solicitacoes_finalizadas.reverse();

              //console.log(this.igreja);
            }
            //console.log(response.data);
          })
          .catch(e => {
            //console.error(e.status);
            //console.data(e.data);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
