<template>
  <v-layout>
    <v-dialog v-model="dialog"  max-width="820px">
      <v-btn
        flat
        color="success"
        v-if="statusSolicitacao == 'Aprovado'"
        @click="Mostrar, buscarInstrumentos(instrumento_um, instrumento_dois)"
        slot="activator"
      >
        <v-icon small left>fas fa-check</v-icon>
        <small>Atender</small>
      </v-btn>
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
              v-on:click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 pt-1 align-center>
            <span
              class="font-weight-bold headline blue--text text--darken-4"
            >Instrumentos disponíveis para atendimento</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs4 sm5 md5 lg5 class="pl-4">
                <v-hover>
                  <v-text-field
                    v-model="procurar"
                    append-icon="search"
                    label="Procurar instrumento ..."
                    color="blue darken-4"
                    hide-details
                  ></v-text-field>
                </v-hover>
              </v-flex>
              <v-flex sm12 md12 lg12>
                <v-data-table
                  :search="procurar"
                  :headers="headers"
                  :pagination.sync="pagination"
                  :items="instrumentos"
                  :item-key="instrumentos.id"
                  class="elevation-0 mt-5"
                  :loading="buscando_instrumentos"
                  loading-text="Loading... Please wait"
                >
                  <template slot="items" slot-scope="props" class="mb-3">
                    <td>{{props.item.tombamento}}</td>
                    <td>{{ props.item.nome }}</td>
                    <td>
                      <center>{{ props.item.caracteristica }}</center>
                    </td>
                    <td>
                      <center>
                        <emprestimo-modal
                          v-bind:numero_do_tombamento="props.item.tombamento"
                          v-bind:numero_do_instrumento="props.item.id"
                          v-bind:irmao="irmao"
                          v-bind:instrumento="props.item"
                          v-bind:nome_instrumento="props.item.nome"
                          v-bind:solicitacao="solicitacao"
                          @emprestimo_sucesso="fecharDialog()"
                        ></emprestimo-modal>
                      </center>
                    </td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import EmprestimoModal from "@/pages/Modulos/Patrimonio/Instrumento/Emprestimo/EmprestimoModal";

import StoreInstrumento from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeInstrumento";

export default {
  props: [
    "statusSolicitacao",
    "irmao",
    "solicitacao",
    "instrumento_um",
    "instrumento_dois"
  ],
  components: { EmprestimoModal },
  data() {
    return {
      buscando_instrumentos: true,
      dados_obrigatorios_irmao: true,
      dados_obrigatorios_solicitacao: true,
      comum_obrigatorio: true,
      e6: 1,
      dialog: false,
      modal: false,
      radios: 1,
      dialog_dataCadastro_modal: null,
      modal_dataCadastro: false,
      data_cadastro: new Date().toISOString().substr(0, 10),
      procurar: "",
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: -1,
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16]
      },
      headers: [
        {
          text: "TOMBAMENTO",
          value: "tombamento",
          class: "blue darken-3 white--text"
        },
        { text: "NOME", value: "nome", class: "blue darken-3 white--text" },
        {
          text: "CARACTERÍSTICA/TONALIDADE",
          value: "caracteristica",
          align: "center",
          class: "blue darken-3 white--text"
        },
        { class: "blue darken-3 white--text", sortable: false }
      ],
      instrumentos_tipo_um: [],
      instrumentos_tipo_dois: [],
      instrumentos: []
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_cadastro);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_cadastro);
    }
  },
  methods: {
    buscarInstrumentos(nome_um, nome_dois) {
      this.instrumentos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "Instrumento/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          if (response.status == 200) {
            response.data.forEach(element => {
              if (element.status == "1") {
                if (element.nome == nome_um || element.nome == nome_dois) {
                  console.log(element);
                  this.instrumentos.push(element);
                }
              }
            });
          }
        })
        .catch(e => {});
      this.buscando_instrumentos = false;
    },
    buscarInstrumento_dois(nome_instrumento) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(
          this.$url + "Instrumento/v1/instrumentos?nome=" + nome_instrumento,
          {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          }
        )
        .then(response => {
          if (response.status == 200) {
            response.data.forEach(element => {
              this.instrumentos.push(element);
            });
          }
        })
        .catch(e => {});
    },
    Emprestar(nome, tombamento) {
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: "btn  btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: true
      });

      return swalWithBootstrapButtons({
        title: "Deseja emprestar  " + nome + " - " + tombamento + " ?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.Salvo(
            "Atendimento realizado com sucesso!",
            "O irmão " +
              this.irmao +
              " agora é responsável pelo instrumento <br>" +
              nome +
              " - " +
              tombamento,
            "success"
          );
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      });
    },
    Instrumento() {
      console.log(this.radios);
    },
    AlertaMixin(type, title, time) {
      const Toast = swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: time
      });

      Toast.fire({
        type: type,
        title: title
      });
    },
    Mostrar() {
      //console.log(this.solicitacao)
    },
    SalvarStatusAprovadoSolicitacaoEmprestimo() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);

      this.$http
        .put(
          this.$url + "SolicitacaoEmprestimo/v1",
          {
            id: this.solicitacao.id,
            nome: this.solicitacao.nome,
            irmao: this.solicitacao.irmao,
            comumCongregacao: this.solicitacao.comumCongregacao,
            primeiroInstrumento: this.solicitacao.primeiroInstrumento,
            primeiraCategoria: this.solicitacao.primeiraCategoria,
            segundoInstrumento: this.solicitacao.segundoInstrumento,
            segundaCategoria: this.solicitacao.segundaCategoria,
            dataCadastro: this.solicitacao.dataCadastro,
            status: "Aprovado",
            launchDate: this.solicitacao.launcDate
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
            this.$emit("solicitacaoSalva");
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    SalvarStatusNaoAutorizadoSolicitacaoEmprestimo() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .put(
          this.$url + "SolicitacaoEmprestimo/v1",
          {
            id: this.solicitacao.id,
            nome: this.solicitacao.nome,
            comumCongregacao: this.solicitacao.comumCongregacao,
            primeiroInstrumento: this.solicitacao.primeiroInstrumento,
            primeiraCategoria: this.solicitacao.primeiraCategoria,
            segundoInstrumento: this.solicitacao.segundoInstrumento,
            segundaCategoria: this.solicitacao.segundaCategoria,
            dataCadastro: this.solicitacao.dataCadastro,
            status: "Não aprovado",
            launchDate: this.solicitacao.launcDate
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
            this.$emit("solicitacaoSalva");
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    Loading(title, icon) {
      swal.fire({
        title: title,
        html:
          "Por favor só um momento... " + '<i class="fas fa-' + icon + "></i>",
        timer: 3000,
        onOpen: () => {
          swal.enableLoading();
        }
      });
    },
    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    cpf: function() {
      if (this.cpf.length == 11) {
        let usuarioAutorize = sessionStorage.getItem("usuario");
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(this.$url + "Usuario/v1/" + this.cpf, {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            if (response.status == 200) {
              let irmao = response.data;
              console.log(irmao.numero);
              if (irmao.id == null) {
                this.irmao_cadastrado = false;
                this.AlertaMixin(
                  "warning",
                  "Irmão não se encontra cadastrado no sistema",
                  4000
                );
              } else {
                this.$http
                  .get(
                    this.$url +
                      "UsuarioIgreja/v1/usuario-por-id?id=" +
                      irmao.id,
                    {
                      headers: {
                        authorization: "Bearer " + this.autorizacao.accessToken
                      }
                    }
                  )
                  .then(response => {
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
                          if (response.status == 200) {
                            this.nome = irmao.nome;
                            this.bairro = irmao.bairro;
                            this.cep = irmao.cep;
                            this.cidade = irmao.cidade;
                            this.complemento = irmao.complemento;
                            this.ddd = irmao.ddd;

                            this.numero = irmao.numero;
                            this.rua = irmao.rua;
                            this.telefone = irmao.telefone;
                            this.cargo = irmao.cargo;
                            this.data_nascimento = irmao.nascimento.substr(
                              0,
                              10
                            );
                            this.congregacao =
                              response.data.cidade +
                              " - " +
                              response.data.bairro +
                              " - " +
                              response.data.codigo;
                          }
                        })
                        .catch(e => {});
                    }
                  })
                  .catch(e => {
                    /*/console.error(e);//console.data(e.data);*/
                  });
              }
            }
          })
          .catch(e => {
            /*console.error(e); //console.data(e.data);*/
          });
      }
    },
    fecharDialog() {
      this.dialog = false;
      this.$emit("emprestimo_sucesso");
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
