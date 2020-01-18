<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center wrap>
      <v-flex xs12 sm12 md4 v-show="com_data == true">
        <v-dialog
          ref="dialog_doacao"
          v-model="modal_doacao"
          :return-value.sync="data_doacao"
          persistent
          lazy
          full-width
          width="290px"
          color="blue lighten-2"
        >
          <v-text-field
            slot="activator"
            v-model="computedDateFormatted"
            label="Data da doação *"
            append-icon="event"
            readonly
            hint
            single-line=""
            persistent-hint
            box
            color="blue lighten-2"
          ></v-text-field>
          <v-date-picker v-model="data_doacao" scrollable locale="pt-BR">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal_doacao = false">Cancelar</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog_doacao.save(data_doacao)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <selecionar-origem @origem_instrumento="SelecionarOrigemDoInstrumento"></selecionar-origem>
      
      <v-flex xs12 sm12 md12 v-if="com_data == true">
        <v-text-field
          append-icon="fas fa-eye"
          v-model="observacao_instrumento"
          box
          label="Observações"
          color="teal darken-3"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md8 v-if="com_data == false">
        <v-text-field
          append-icon="fas fa-eye"
          v-model="observacao_instrumento"
          outline
          label="Observações"
          color="teal darken-3"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md8 offset-md4>
        <v-checkbox
          color="teal darken-3"
          label="Selecione se o instrumento não possui data da doação."
          @change="SemDataDoacao()"
        ></v-checkbox>
      </v-flex>
    </v-layout>
    <cad-termos
      v-on:cadastrarDoacao="CadastrarDoacao"
      v-bind:numero_tombamento="numero_do_instrumento"
    ></cad-termos>
  </v-container>
</template>
<script type="text/babel">
import swal from "sweetalert2";
import SelecionarOrigem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Origem/SelecaoOrigem";
import CadTermos from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Termos/CadastroTermos";
import CadOrigem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Origem/CadastroOrigem";
export default {
  name: "CadDoacao",
  components: { SelecionarOrigem, CadTermos, CadOrigem },
  data() {
    return {
      com_data: true,
      dialog_doacao: "",
      modal_doacao: false,
      data_doacao: new Date().toISOString().substr(0, 10),
      origem_instrumento: "",
      observacao_instrumento: "",
      dialog: false,
      items: [{ id: 1, icon: true, title: "Documento" }]
    };
  },
  created() {},
  props: ["numero_do_instrumento"],
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_doacao);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_doacao);
    }
  },
  methods: {
    criarDoc() {
      if (this.items.length < 6) {
        this.items.push({
          id: this.items.length + 1,
          icon: true,
          title: "Documento"
        });
        const toast = swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: "success",
          title: "Adicionado um novo campo de anexo de documento"
          //Colocar uma seta para o botão sair
        });
      } else {
        const toast = swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: "warning",
          title: "Quantidade permitida é de " + this.items.length + " campos"
          //Colocar uma seta para o botão sair
        });
      }
    },
    removeDoc(id) {
      if (id > -1) {
        this.items.forEach(element => {
          //console.log("ID: ", element.id);
        });
        //console.log("ID: ", id);
        let i = this.items.map(item => item.id).indexOf(id);
        this.items.splice(i, 1);
        //console.log("ID removido: ", i + 1);
        this.items.forEach(element => {
          //console.log(element.id);
        });
        const toast = swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: "warning",
          title: "Removido o documento "
          //Colocar uma seta para o botão sair
        });
      } else {
        const toast = swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000
        });

        toast({
          type: "error",
          title: "Não é permitido remover este campo."
          //Colocar uma seta para o botão sair
        });
      }
    },
    SelecionarOrigemDoInstrumento(payload) {
      //console.log("antes: ", this.origem_instrumento);
      this.origem_instrumento = payload.origem;
      //console.log("depois: ", this.origem);
    },

    CadastrarDoacao() {
      /*console.log(
        this.data_doacao,
        this.origem_instrumento,
        this.observacao_instrumento,
        this.numero_do_instrumento
      );*/
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou no cadastro doacao");
        this.$http
          .post(
            this.$url + "DoacaoInstrumento/v1",
            {
              id: 0,
              tombamento: this.numero_do_instrumento,
              origem: this.origem_instrumento,
              observacao: this.observacao_instrumento,
              dataDoacao: this.data_doacao,
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
              //console.log("doação cadastrada");
              this.$emit("cadastrarInstrumentos");
            }
            //console.log(response.data);
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
          });
      }
    },
    SemDataDoacao() {
      this.com_data = !this.com_data;
      if (this.com_data == false) {
        this.data_doacao = new Date(1970, 0, 1).toISOString().substr(0, 10);
        swal.fire(
          "Atenção!",
          "O instrumento não terá data de doação registrada!",
          "warning"
        );
      } else {
        this.data_doacao = new Date().toISOString().substr(0, 10);
      }
      //console.log(this.data_doacao);
      //console.log(this.data_doacao_sem_definicao);
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
