<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="450px">
      <v-btn
        flat
        color="purple"
        v-if="statusSolicitacao == 'Anexar'"     
        slot="activator"
      >
      <v-icon small left>fas fa-paperclip</v-icon>
        <small>Anexar</small>
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
              Documentos para anexar a solicitação
            </span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
               <v-flex align-center>
                <termos
                  v-on:anexar-solicitacao="
                   (dialog = false),SalvarStatusAprovadoSolicitacaoEmprestimo()
                  "
                  :solicitacao="solicitacao"
                ></termos>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from 'sweetalert2';
import Termos from "@/pages/Modulos/Patrimonio/Instrumento/Emprestimo/Termos";
export default {
  props: [
    'statusSolicitacao',    
    'solicitacao'
  ],
  components:{Termos},
  data() {
    return {
      dialog: false,
      modal: false      
    };
  },  
  methods: {        
      SalvarStatusAprovadoSolicitacaoEmprestimo() {
      let usuarioAutorize = sessionStorage.getItem('usuario');
      this.autorizacao = JSON.parse(usuarioAutorize);

      this.$http
        .put(
          this.$url + 'SolicitacaoEmprestimo/v1',
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
            status: 'Finalizada',
            launchDate: this.solicitacao.launcDate
          },
          {
            headers: {
              authorization: 'Bearer ' + this.autorizacao.accessToken
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            //console.log("Solicitação de empréstimo salva com sucesso");
            let irmao = response.data;
            this.fecharDialog();
            this.Loading("Salvando Anexos","")
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
          'Por favor só um momento... ' + '<i class="fas fa-' + icon + '></i>',
        timer: 3000,
        onOpen: () => {
          swal.enableLoading();
        }
      });
    },
    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    },
    fecharDialog(){
      this.dialog=false;
      this.$emit("anexar_sucesso")
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
