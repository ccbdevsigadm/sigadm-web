<template>
  <v-dialog v-model="dialog"  max-width="290">
    <v-btn flat slot="activator"  color="blue darken-4">
     <strong>INSTRUMENTO</strong>
    </v-btn>
    <v-card>
      <div classe="row">
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
      </div>
      <v-flex xs12 sm12 md12 lg12 d-flex class="pt-5 pl-2" align-center>
        <v-card-title class="headline blue--text text--darken-4"><strong>Nome do instrumento</strong></v-card-title>
      </v-flex>
      <v-card-text>
        <v-text-field
          v-model="nome"
          :rules="rules"
          :counter="10"
          box
          label="Nome"
          color="blue darken-4"
          placeholder="Ex. Violino ..."
          required
        ></v-text-field>
        <v-flex xs12 sm12 md12>
          <v-select
            :items="naipes"
            :rules="naipe_rules"
            box
            placeholder="Ex. Cordas ..."
            color="blue darken-4"
            label="Naipe"
            v-model="naipe"
          ></v-select>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="green darken-4"
            center
            class="white--text"                        
            v-on:click="get_Nomes"
            @click="dialog = false"
          >Salvar Nome do instrumento</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script type="text/babel">
import swal from "sweetalert2";

export default {
  name: "Cadastro_Nome",
  data() {
    return {
      autorizacao: false,
      dialog: false,
      nome: "",
      naipe: "",
      naipes: ["Cordas", "Madeiras", "Metais"],
      rules: [
        v => !!v || "Nome é obrigatório",
        v =>
          /[A-Z][a-z]+/.test(v) ||
          "A primeita letra deve ser maiuscula e ter no mínimo 2 letras"
      ],
      naipe_rules: [v => !!v || "Naipe é obrigatório"]
    };
  },
  created() {},

  methods: {
    get_Nomes() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        if(this.nome != ''){
        //console.log("entrou no cadastro");
        this.$http
          .post(
            this.$url + "NomeInstrumento/v1",
            {
              id: 0,
              Nome: this.nome,
              Naipe: this.naipe,
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
                  "O nome " +
                  this.nome +
                  " já se encontra disponível para seleção!"
              });
              this.$emit("nomes");
            } else if (response.status == 401) {
            }
            //console.log(response.data);
          })
          .catch(e => {
            //estar pegando apenas o erro de dados duplicado quando tenta salvar na api e dar erro 500
            swal.fire("Esse nome já existe !", "Escolha outro.", "warning");
            //console.error(e);
            //console.data(e.data);
          });
          }else{
             swal.fire("Desculpe...", "O nome não pode estar em branco", "warning");
          }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
