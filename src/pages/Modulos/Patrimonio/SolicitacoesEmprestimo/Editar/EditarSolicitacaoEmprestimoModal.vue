<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-flex xs12 sm12>
          <div class="pt-1">
            <v-btn
              right
              class="white--text"
              small
              fab
              round
              box
              color="red darken-1"
              absolute
              v-on:click="dialog = false, editarDisable = true"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span class="font-weight-bold headline blue--text text--darken-4">Solicitação do irmão</span>
            <br />
            <span class="font-weight-bold headline blue--text text--darken-4">{{nome}}</span>
          </v-flex>
        </v-card-title>
        <v-card-text v-if="editarDisable == true">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-spacer></v-spacer>

              <v-menu bottom left offset-y  :open-delay="1">
                <template v-slot:activator="{ on }">
                  <v-btn outline dark color="amber darken-2" v-on="on">
                    <v-icon small>fas fa-cog</v-icon>
                    <span class="pl-2">
                      <b>Configurações</b>
                    </span>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-tile @click="AtivarEdicao()">
                    <v-list-tile-title>
                      <v-icon color="amber darken-1" left>fas fa-edit</v-icon>Editar
                    </v-list-tile-title>
                  </v-list-tile>
                   <v-list-tile @click="AlertaDesautoriza()" v-if="status == 'Aprovado'">
                    <v-list-tile-title>
                      <v-icon color="red darken-1" left>fas fa-times-circle</v-icon>Retirar autorização
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="AlertaDeletar(idSolicitacao)">
                    <v-list-tile-title>
                      <v-icon color="red lighten-1" left>far fa-trash-alt</v-icon>Excluir
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="nome"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-book"
                  label="Nome do irmão"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6>
                <v-text-field
                  v-model="data_cadastro_desativado"
                  label="Data de solicitação"
                  append-icon="event"
                  readonly
                  color="teal darken-3"
                  hint
                  persistent-hint
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="comumCongregacao"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-place-of-worship"
                  label="Comum congregação"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="primeiro_instrumento"
                  box
                  color="blue darken-3"
                  append-icon
                  label="Primeira opção"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="primeira_categoria"
                  box
                  color="blue darken-3"
                  append-icon
                  label="Característica"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="segundo_instrumento"
                  box
                  color="blue darken-3"
                  append-icon
                  label="Segunda opção"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="segunda_categoria"
                  box
                  color="blue darken-3"
                  append-icon
                  label="Característica"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text v-if="editarDisable == false">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-spacer></v-spacer>

              <v-menu bottom left offset-y :open-on-hover="true" :open-delay="1">
                <template v-slot:activator="{ on }">
                  <v-btn flat dark color="amber darken-2" v-on="on">
                    <v-icon>fas fa-cog</v-icon>
                    <span class="pl-2">
                      <b>Configurações</b>
                    </span>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-tile @click="DesativarEdicao()">
                    <v-list-tile-title>
                      <v-icon color="amber darken-1" left>fas fa-undo</v-icon>Não Editar
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="AlertaDesautoriza()" v-if="status == 'Aprovado'">
                    <v-list-tile-title>
                      <v-icon color="red darken-1" left>fas fa-times-circle</v-icon>Retirar autorização
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="AlertaDeletar(idSolicitacao)">
                    <v-list-tile-title>
                      <v-icon color="red lighten-1" left>far fa-trash-alt</v-icon>Excluir
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-flex xs12 sm12 md12 lg12>
                <v-autocomplete
                  v-model="nome"
                  box
                  hint
                  append-icon="fas fa-book"
                  color="blue darken-4"
                  label="Nome do irmão *"
                  required
                  :items="irmaos"
                  item-text="nome"
                  item-value="nome"
                  single-line
                >
                  <template slot="selection" slot-scope="data">{{ data.item.nome }}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile @click="SelecionarIgreja(data.item.congregacao)">
                        <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6>
                <v-dialog
                  ref="dialog_dataCadastro_modal"
                  v-model="modal_dataCadastro"
                  :return-value.sync="data_cadastro"
                  persistent
                  :readonly="editarDisable"
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Data de solicitação"
                    append-icon="event"
                    readonly
                    color="teal darken-3"
                    hint
                    persistent-hint
                    box
                  ></v-text-field>
                  <v-date-picker
                    v-model="data_cadastro"
                    scrollable
                    locale="pt-BR"
                    color="blue darken-4"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal_dataCadastro = false">Cancelar</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog_dataCadastro_modal.save(data_cadastro)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="comumCongregacao"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-place-of-worship"
                  label="Comum congregação"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6 class="pl-2">
                <v-autocomplete
                  v-model="primeiro_instrumento"
                  :items="instrumentos"
                  label="Instrumento 1ª Opção"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-4"
                  box
                >
                  <template slot="selection" slot-scope="data">{{ data.item.nome}}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex
                      xs10
                      sm10
                      :key="JSON.stringify(data.item.id)"
                      @click="BuscarCaracteristica(data.item.naipe)"
                    >
                      <v-list-tile>
                        <v-list-tile-content>{{data.item.nome}}</v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md6 v-if="ativado_instrumento_01 == false">
                <v-text-field
                  v-model="primeira_categoria"
                  box
                  color="blue darken-3"
                  append-icon
                  label="Característica"
                  required
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6 class="pl-2" v-if="ativado_instrumento_01 == true">
                <v-autocomplete
                  v-model="primeira_categoria"
                  :items="caracteristicas"
                  label="Caracteristica/Tonalidade"
                  item-text="caracteristica"
                  item-value="caracteristica"
                  color="blue darken-4"
                  box
                >
                  <template slot="selection" slot-scope="data">{{ data.item.caracteristica}}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                      <v-list-tile>
                        <v-list-tile-content>{{data.item.caracteristica}}</v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6 class="pl-2">
                <v-autocomplete
                  v-model="segundo_instrumento"
                  :items="instrumentos"
                  label="Instrumento 2ª Opção"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-4"
                  box
                >
                  <template slot="selection" slot-scope="data">{{ data.item.nome}}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex
                      xs10
                      sm10
                      :key="JSON.stringify(data.item.id)"
                      @click="BuscarCaracteristica(data.item.naipe)"
                    >
                      <v-list-tile>
                        <v-list-tile-content>{{data.item.nome}}</v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md6 v-if="ativado_instrumento_02 == false">
                <v-text-field
                  v-model="segunda_categoria"
                  box
                  color="blue darken-3"
                  append-icon
                  label="Característica"
                  required
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6 class="pl-2" v-if="ativado_instrumento_02 == true">
                <v-autocomplete
                  v-model="segunda_categoria"
                  :items="caracteristicas"
                  label="Caracteristica/Tonalidade"
                  item-text="caracteristica"
                  item-value="caracteristica"
                  color="blue darken-4"
                  box
                >
                  <template slot="selection" slot-scope="data">{{ data.item.caracteristica}}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                      <v-list-tile>
                        <v-list-tile-content>{{data.item.caracteristica}}</v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="editarDisable == false">
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md12 lg12 align-center class="mb-4">
            <v-btn
              flat
              outline
              dark
              color="green darken-4"
              @click="SalvarSolicitacaoEmprestimo()"
            ><b>salvar irmão</b></v-btn>
          </v-flex>
        </v-card-actions>
        <v-layout row align-center>
          <v-dialog v-model="buscaCaracteristica" max-width="150" persistent>
            <v-card>
              <v-card-title class="headline light-blue darken-4 white--text">
                <v-flex align-center class="white--text text--darken-4 body-1">                  
                  <span
                    class="grey--text text--lighten-1 body-1"
                  >CARACTERÍSCAS</span>
                </v-flex>
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
                      <v-icon color="light-blue darken-4">fas fa-user-tie</v-icon>
                    </v-progress-circular>
                    <br />
                    <h4 class="light-blue--text text--darken-4">Esperando informações ...</h4>
                  </span>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import axios from "axios";

export default {
  name: "EditarIrmaoModal",
  props: ["solicitacao_dados", "dialog_ativar"],
  data() {
    return {
      irmaos: [],
      idSolicitacao: null,
      dialog_nascimento_modal: false,
      data_cadastro_desativado: null,
      nome: null,
      comumCongregacao: null,
      instrumento: null,
      primeiro_instrumento: null,
      ativado_instrumento_01: false,
      segundo_instrumento: null,
      ativado_instrumento_02: false,
      primeira_categoria: null,
      segunda_categoria: null,
      data_cadastro: null,
      dialog_dataCadastro_modal: null,
      modal_dataCadastro: false,
      caracteristica: null,
      caracteristicas: [],
      dialog: false,
      modal: false,
      autorizacao: "",
      editarDisable: true,
      irmao: [],
      idVinculoIgreja: null,
      busca: false,
      buscaCaracteristica: false,
      status:""
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_cadastro);
    }
  },
  watch: {
    dialog_ativar: function() {
      this.dialog = true;
      this.idSolicitacao = this.solicitacao_dados.id;
      this.nome = this.solicitacao_dados.nome;
      this.primeiro_instrumento = this.solicitacao_dados.primeiroInstrumento;
      this.segundo_instrumento = this.solicitacao_dados.segundoInstrumento;
      this.primeira_categoria = this.solicitacao_dados.primeiraCategoria;
      this.segunda_categoria = this.solicitacao_dados.segundaCategoria;
      this.comumCongregacao = this.solicitacao_dados.comumCongregacao;
      this.instrumento = this.solicitacao_dados.nomeInstrumento;
      this.status = this.solicitacao_dados.status;
      this.data_cadastro_desativado = this.formatDate(
        this.solicitacao_dados.dataCadastro.substr(0, 10)
      );
      this.data_cadastro = this.solicitacao_dados.dataCadastro.substr(0, 10);
      this.BuscarIgrejas();
      this.BuscarInstrumentos();
      this.BuscarIrmao();
      this.BuscarCaracteristica(this.solicitacao_dados.naipe);
    },
    date(val) {
      this.dateFormatted = this.formatDate(
        this.data_cadastro.toISOString().substr(0, 10)
      );
    },
    primeiro_instrumento: function() {
      this.ativado_instrumento_01 = true;
    },
    segundo_instrumento: function() {
      this.ativado_instrumento_02 = true;
    },
    editarDisable: function() {
      if (this.editarDisable == false) {
        this.ativado_instrumento_01 = false;
        this.ativado_instrumento_02 = false;
      }
    },
    data_cadastro: function() {
      console.log(this.data_cadastro);
    }
  },
  methods: {
    AtivarEdicao() {
      this.editarDisable = false;
      //console.log(this.solicitacao_dados);
    },
    DesativarEdicao() {
      this.editarDisable = true;
      this.primeiro_instrumento = this.solicitacao_dados.primeiroInstrumento;
      this.segundo_instrumento = this.solicitacao_dados.segundoInstrumento;
      this.primeira_categoria = this.solicitacao_dados.primeiraCategoria;
      this.segunda_categoria = this.solicitacao_dados.segundaCategoria;
      this.comumCongregacao = this.solicitacao_dados.comumCongregacao;
      this.instrumento = this.solicitacao_dados.nomeInstrumento;
      this.buscaCaracteristica();
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    AlertaDeletar(id) {
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: "btn  btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: true
      });

      return swalWithBootstrapButtons({
        title: "Deseja excluir a solicitacao do irmão " + this.nome + "?",
        text:
          "Se confirmar esta ação o registro será excluido definitivamente do nosso banco de dados.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.SolicitacaoDeletar(id);
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      });
    },
    AlertaDesautoriza() {
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: "btn  btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: true
      });

      return swalWithBootstrapButtons({
        title: "Deseja retirar a autorização da solicitacao do irmão " + this.nome + "?",
        text:
          "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          //this.SolicitacaoDeletar(id);
          this.Salvo("Solicitação alterada com sucesso!","Para autorizar novamente procure na lista de solicitações","success")
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      });
    },
    SolicitacaoDeletar(item) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        //console.log("Nao autorizado");
      } else if (usuarioAutorize) {
        //console.log("delete o item ", item);
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .delete(this.$url + "SolicitacaoEmprestimo/v1/" + item, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 204) {
              //console.log("Deletado com sucesso, dados:", response.data);
              this.$emit("SolicitacaoDeletada");
            }
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarIrmao() {
      this.irmaos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        this.$router.push("/");
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
          .get(this.$url + "Usuario/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              response.data.forEach(element => {
                this.$http
                  .get(
                    this.$url +
                      "UsuarioIgreja/v1/usuario-por-id?id=" +
                      element.id,
                    {
                      headers: {
                        authorization: "Bearer " + this.autorizacao.accessToken
                      }
                    }
                  )
                  .then(response => {
                    ////console.log(response.status);
                    if (response.status == 200) {
                      this.$http
                        .get(
                          this.$url + "Igreja/v1/" + response.data.idIgreja,
                          {
                            headers: {
                              authorization:
                                "Bearer " + this.autorizacao.accessToken
                            }
                          }
                        )
                        .then(response => {
                          ////console.log(response.status);
                          if (response.status == 200) {
                            ////console.log(response.data)

                            this.irmaos.push({
                              nome: element.nome,
                              cargo: element.cargo,
                              endereco: element.rua + ", " + element.numero,
                              cidade: element.cidade,
                              telefone: element.telefone,
                              congregacao:
                                response.data.codigo +
                                " - " +
                                response.data.bairro +
                                " - " +
                                response.data.cidade,
                              regional: response.data.encRegional,
                              local: response.data.encLocal
                            });
                            this.busca = false;

                            ////console.log(this.igreja);
                          }
                          ////console.log(response.data);
                        })
                        .catch(e => {
                          //console.error(e);
                          //console.data(e.data);
                        });
                    }
                  })
                  .catch(e => {
                    //console.error(e);
                    //console.data(e.data);
                  });
              });
            } else if (response.status == 401) {
              swal.fire(
                "Sua autorização expirou!",
                "Entre com suas credencias novamente.",
                "warning"
              );
              this.$router.push("/");
              const toast = swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });
            }
            ////console.log(response.data);
          })
          .catch(e => {
            swal.fire(
              "Sua autorização expirou!",
              "Entre com suas credencias novamente.",
              "warning"
            );
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarIgrejas() {
      this.igrejas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        this.$router.push("/");
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
          .get(this.$url + "Igreja/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              response.data.forEach(element => {
                this.igrejas.push({
                  id: element.id,
                  comum:
                    element.cidade +
                    " - " +
                    element.bairro +
                    " - " +
                    element.codigo
                });
              });
              this.BuscarInstrumentos();
            } else if (response.status == 401) {
            }
            //console.log(response.data);
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarInstrumentos() {
      //console.log("Buscando instrumentos");
      this.instrumentos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        cosole.log("Sem autorização");
      } else if (usuarioAutorize) {
        let autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + "NomeInstrumento/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              response.data.forEach(element => {
                this.instrumentos.push({
                  id: element.id,
                  nome: element.nome,
                  naipe: element.naipe
                });
              });
              this.busca = false;
            } else if (response.status == 401) {
            }
            //console.log(response.data);
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarCaracteristica(naipe) {
      this.buscaCaracteristica = true;
      this.caracteristicas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        cosole.log("Sem autorização");
      } else if (usuarioAutorize) {
        let autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(
            this.$url +
              "CaracteristicaInstrumento/v1/buscar-caracteristica-por-naipe?naipe=" +
              naipe,
            {
              headers: {
                authorization: "Bearer " + autorizacao.accessToken
              }
            }
          )
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              //console.log(response.data.caracteristica);
              this.caracteristicas = response.data;
              this.buscaCaracteristica = false;
            }
          })
          .catch(e => {
            this.buscaCaracteristica = false;
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    SalvarSolicitacaoEmprestimo() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .put(
          this.$url + "SolicitacaoEmprestimo/v1",
          {
            id: this.idSolicitacao,
            nome: this.nome,
            primeiroInstrumento: this.primeiro_instrumento,
            segundoInstrumento: this.segundo_instrumento,
            primeiraCategoria: this.primeira_categoria,
            segundaCategoria: this.segunda_categoria,
            status: this.solicitacao_dados.status,
            comumCongregacao: this.comumCongregacao,
            dataCadastro: this.data_cadastro,
            launchDate: new Date().toISOString().substr(0, 19)
          },
          {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            //console.log("Solicitação de empréstimo salva com sucesso");
            let irmao = response.data;
            this.Salvo(
              "Solicitação do irmão " + this.nome,
              "Editada e salva com sucesso",
              "success"
            );
            this.$emit("solicitacaoSalva");
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },

    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    }
  }
};
</script>
<style>
.mesmo-tamanho {
  width: 100%;
  white-space: normal;
}
</style>
