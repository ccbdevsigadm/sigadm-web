<template>
  <v-layout row justify-left class="">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" flat color="red" class="align-left">
        <small>DEVOLVER</small>
      </v-btn>
      <v-card>
        <v-flex xs12 sm12>
          <div class="pt-3">
            <v-btn
              right
              class="white--text"
              small
              fab
              round
              outline
              color="red darken-1"
              absolute
              v-on:click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span class="headline teal--text text--darken-3">Devolução</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-dialog
                  ref="dialog_devolucao"
                  v-model="modal"
                  :return-value.sync="data_devolucao"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Data da Devolução *"
                    append-icon="event"
                    readonly
                    hint
                    persistent-hint
                    outline
                  ></v-text-field>
                  <v-date-picker v-model="data_devolucao" scrollable locale="pt-BR">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancelar</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog_devolucao.save(data_devolucao)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="observacao"
                  outline
                  color="teal darken-3"
                  append-icon="fas fa-eye"
                  label="Observação"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 align-center>
                <small>*campos com asterisco (*) são obrigatórios.</small>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <v-btn
              color="teal darken-2"
              round
              center
              outline
              v-on:click="CadastrarDevolucao()"
              @click="dialog = false"
            >DEVOLVER</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";

export default {
  data() {
    return {
      dialog: false,
      dialog_devolucao: false,
      data_devolucao: new Date().toISOString().substr(0, 10),
      modal: false,
      emprestimos: [],
      id_emprestimo: 0,
      observacao: ""
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_devolucao);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_devolucao);
    }
  },
  props: ["numero_do_tombamento_devolucao", "numero_do_instrumento_devolucao"],
  methods: {    
    CadastrarDevolucao() {
      ////console.log("cadastrar devolução");
      let autorizacaoAux = sessionStorage.getItem("usuario");
      var id_emprestimo_buscado;
      if (!autorizacaoAux) {
        swal.fire(
          "Sua autorização expirou!",
          "Entre com suas credencias novamente.",
          "warning"
        );
        this.$router.push("/");
      }
      if (autorizacaoAux) {
        //console.log("cadastrar devolução buscando");
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro de devolucao");
        this.$http
          .get(
            this.$url +
              "EmprestimoInstrumento/v1/buscar-emprestimo?tombamento=" +
              this.numero_do_tombamento_devolucao,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            if (response.status == 200) {
              this.emprestimos = response.data;
              this.Loading("Realizando devolução...","hourglass-half")              
              ////console.log(this.emprestimos);
              this.emprestimos.forEach(element => {
                ////console.log("status: ", element.id);
                id_emprestimo_buscado = element.id;
                ////console.log(id_emprestimo_buscado);
                if (element.status == 2) //console.log("cadastrar devolução");                
                this.$http
                  .post(
                    this.$url + "DevolucaoInstrumento/v1",
                    {
                      id: 0,
                      idInstrumento: this.numero_do_instrumento_devolucao,
                      idEmprestimo: id_emprestimo_buscado,
                      tombamento: this.numero_do_tombamento_devolucao,
                      status: "1",
                      devolucaoDate: this.data_devolucao,
                      observacao: this.observacao,
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
                      // //console.log("data value emprestimo", response.data);                     
                      this.$emit("devolucao_atualizar");
                    }
                  })
                  .catch(e => {
                    swal.fire(
                      "Sua autorização expirou!",
                      "Entre com suas credencias novamente.",
                      "warning"
                    );
                    this.$router.push("/");
                    //console.error(e);
                    //console.data(e.data);
                    //console.log("status", e.data.status);
                  });
              });
            }
          })
          .catch(e => {
            swal.fire(
              "Sua autorização expirou!",
              "Entre com suas credencias novamente.",
              "warning"
            );
            this.$router.push("/");
            //console.log("Erro no emprestimo");
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    Loading(title,icon) {
      swal.fire({
        title: title,
        html:
          "Por favor só um momento... " +
          '<i class="fas fa-'+icon+'></i>',
        timer: 3000,
        onOpen: () => {
          swal.enableLoading();
        }
      });
    },
    Salvo(title,msg,type) {
      swal.fire(title, msg,type);
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
