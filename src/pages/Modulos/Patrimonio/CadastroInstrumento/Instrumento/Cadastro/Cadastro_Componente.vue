<template>
  <v-dialog v-model="dialog"  max-width="290">
    <v-btn  slot="activator" flat color="blue darken-4">
     <strong>Componente</strong>
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
        <v-card-title class="headline blue--text text--darken-4"><strong>Componente do instrumento</strong></v-card-title>
      </v-flex>
      <v-card-text>
        <v-text-field
          v-model="componente"
          :counter="10"
          label="Nome"
          color="blue darken-4"
          box
          placeholder="Ex. Arco, Case etc ..."
          :rules="rules"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="green darken-4"
            center
            class="white--text"            
            v-on:click="get_Componentes"
            @click="dialog = false"
          >Salvar componente</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script type="text/babel">
import swal from "sweetalert2";
export default {
  name: "Cadastro_Componente",
  data() {
    return {
      autorizacao: false,
      dialog: false,
      componente: "",
      rules: [
        v => !!v || "Nome é obrigatório",
        v =>
          /[A-Z][a-z]+/.test(v) ||
          "A primeita letra deve ser maiuscula e ter no mínimo 2 letras"
      ]
    };
  },
  created() {},

  methods: {
    get_Componentes() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        if(this.componente != ''){
          this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou no cadastro");
        this.$http
          .post(
            this.$url + "ComponenteInstrumento/v1",
            {
              id: 0,
              Componente: this.componente,
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
                  "O componente " +
                  this.componente +
                  " já se encontra disponível para seleção!"
              });
              this.$emit("componentes");
            }
            ////.log(response.data);
          })
          .catch(e => {
            //estar pegando apenas o erro de dados duplicado quando tenta salvar na api e dar erro 500
            swal.fire("Esse componente já existe !", "Escolha outro.", "warning");
            //.error(e);
            //.data(e.data);
          });
        }else{
          swal.fire("Desculpe...", "O componente não pode estar em branco.", "warning");
        }        
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
