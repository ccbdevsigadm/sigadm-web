<template>
  <v-dialog v-model="dialog"  max-width="290">
    <v-btn  slot="activator" flat color="blue darken-4">
      <strong>Empresa</strong>
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
      <v-flex xs12 sm12 md12 lg12 align-center class="pt-5">
        <v-card-title class="headline blue--text text--darken-4"><strong>Nome da Empresa</strong></v-card-title>
      </v-flex>

      <v-card-text>
        <v-text-field
          v-model="empresa"
          box
          color="blue darken-4"
          :counter="10"
          :rules="[() => !!empresa || 'Campo obrigatório, precisa ser preenchido!']"
          label="Empresa"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="green darken-4"
           class="white--text"
            v-on:click="get_Empresas"
            @click="dialog = false"
          >Salvar empresa</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script type="text/babel">
import swal from "sweetalert2";

export default {
  name: "Cadastro_Empresa",
  data() {
    return {
      autorizacao: false,
      dialog: false,
      empresa: ""
    };
  },
  created() {},

  methods: {
    get_Empresas() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);

        //console.log("entrou no cadastro de empresas");
        this.$http
          .post(
            this.$url + "Empresa/v1",
            {
              id: 0,
              Nome: this.empresa,
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
                  "A Empresa " +
                  this.empresa +
                  " já se encontra disponível para seleção!"
              });
              this.$emit("empresas");
            } else if (response.status == 401) {
            }
            //console.log(response.data);
          })
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
