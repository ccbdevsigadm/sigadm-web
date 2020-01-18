<template>
  <v-dialog v-model="dialog"  max-width="290">
    <v-btn flat slot="activator"  color="blue darken-4">
     <strong>Tombamento</strong>
    </v-btn>
    <v-card>
      <v-flex xs12 sm12 md12 lg12>
        <div class="pt-3">
          <v-btn
            right
            class="white--text"
            small
            fab
            round            
            color="red darken-4"
            absolute
            v-on:click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 d-flex class="pt-5" align-center>
        <v-card-title class="headline blue--text text--darken-4"><strong>Tombamento do instrumento</strong></v-card-title>
      </v-flex>
      <v-card-text>
        <v-text-field
          v-model="tombamento"
          placeholder="Ex. 0001 ..."
          :mask="mask_tombamento"          
          :rules="rules"
          :counter="4"
          box
          label="Nº Tombamento"
          color="blue darken-4"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="green darken-4"            
            class="white--text"
            v-on:click="get_Tombos"
            @click="dialog = false"
          >Salvar Numero de Tombamento</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script type="text/babel">
import swal from "sweetalert2";

export default {
  name: "Cadastro_Tombamento",
  data() {
    return {
      autorizacao: false,
      dialog: false,
      tombamento: "",
      mask_tombamento: "####",
      rules: [v => !!v || "Este Campo é obrigatório"]
    };
  },
  created() {},

  methods: {
    get_Tombos() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        if(this.tombamento != '' && this.tombamento.length == 4){

        
        //console.log("entrou no cadastro");
        this.$http
          .post(
            this.$url + "TombamentoInstrumento/v1",
            {
              id: 0,
              Numero: this.tombamento,
              Status: 1,
              launchDate: new Date().toISOString().substr(0, 16)
            },
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            if (response.status == 200) {
              this.dialog = false;
              swal.fire({
                type: "success",
                title: "Salvo com sucesso",
                text:
                  "O numero de tombamento " +
                  response.data.numero +
                  " já se encontra disponível para seleção!"
              });
              this.$emit("tombamentos");
            }
            //console.log(response.data);
          })
          .catch(e => {
            //estar pegando apenas o erro de dados duplicado quando tenta salvar na api e dar erro 500
            swal.fire(
              "Esse numero de tombamento já existe !",
              "Escolha outro.",
              "warning"
            );
            //console.error(e);
            //console.data(e.data);
          });
      }else{
          swal.fire(
              "Desculpe...",
              "Mas o numero de tombamento não pode estar em branco.",
              "warning"
            );
      }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
