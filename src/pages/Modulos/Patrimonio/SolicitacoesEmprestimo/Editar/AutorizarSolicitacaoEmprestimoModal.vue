<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-btn
        flat
        color="warning"
        v-if="statusSolicitacao == 'Aguardando'"
        @click="Mostrar"
        slot="activator"
      >
      <v-icon small left>fas fa-exclamation-circle</v-icon>
        <small>AUTORIZAR</small>
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
          <v-flex xs12 sm12 md12 lg12 pt-4 align-center>
            <span class="font-weight-bold headline blue--text text--darken-4">
              Solicitação de intrumento para
              <br />
              o irmão {{irmao}}
            </span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <br />
          <h3
            class="light-blue--text text--darken-4"
          >Qual foi tipo de autorização?</h3>
          <v-flex sm12 xs12 md12 lg12 align-center d-flex>
            <v-radio-group v-model="radios" :mandatory="false">
              <v-radio label="Reunião de encarregados regionais" value="reuniao"></v-radio>
              <v-radio label="Fundo musical" value="fundo_musical"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12>
            <v-dialog
              ref="dialog_dataCadastro_modal"
              v-model="modal_dataCadastro"
              :return-value.sync="data_cadastro"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="computedDateFormatted"
                label="Data da deliberação"
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
          <v-flex sm12 xs12 md12 lg12 align-center d-flex>
            <span>
              <v-btn
                outline
                color="error"
                v-if="statusSolicitacao == 'Aguardando'"
                @click="SalvarStatusNaoAutorizadoSolicitacaoEmprestimo"
              >
                <small>Não autorizar</small>
              </v-btn>
              <v-btn
                flat
                color="success"
                v-if="statusSolicitacao == 'Aguardando'"
                @click="SalvarStatusAprovadoSolicitacaoEmprestimo"
              >
                <v-icon small left>fas fa-check</v-icon>
                <small>Autorizar</small>
              </v-btn>
            </span>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import StoreInstrumento from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeInstrumento";

export default {
  props: ["statusSolicitacao", "irmao", "solicitacao"],
  data() {
    return {
      dialog: false,
      modal: false,
      radios: "reuniao",
      dialog_dataCadastro_modal: null,
      modal_dataCadastro: false,
      data_cadastro: new Date().toISOString().substr(0, 10)
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
    SalvarDeliberacao(){
       let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);

      this.$http
        .post(
          this.$url + "DeliberacaoEmprestimo/v1",
          {
            id: 0,
            tipo: this.radios+"_"+this.solicitacao.id,            
            dataCadastro: this.solicitacao.dataCadastro,           
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
          }
        console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
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
            irmao:this.solicitacao.irmao,
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
            this.SalvarDeliberacao();
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
            irmao:this.solicitacao.irmao,
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
            this.SalvarDeliberacao();
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
