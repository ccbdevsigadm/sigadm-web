<template>
  <v-dialog v-model="dialog_ano"  max-width="290">  
      <v-btn flat  color="blue darken-4" slot="activator" >
        <strong>Ano</strong>
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
            v-on:click="dialog_ano = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 d-flex class="pt-5 pl-4" align-center>
        <v-card-title class="headline blue--text text--darken-4"><strong>Ano do instrumento</strong></v-card-title>
      </v-flex>
      <v-card-text>
        <v-text-field
          v-model="ano"
          :counter="4"
          label="Ano"
          required
          box
          color="blue darken-4"
          placeholder="Ex. 2018"
          append-icon="fas fa-calendar-week"
          :rules="anoRules"
          :mask="anoMask"
          :hint="hint"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="green darken-4"
            class="white--text"
            v-on:click="get_Anos"
            @click="dialog_ano = false"
          >Salvar Ano</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "Cadastro_Ano",
  data() {
    return {
      autorizacao: false,
      dialog_ano: false,
      ano: "",
      anoRules: [
        v => !!v || "Ano é obrigatório",
        v => (v >= 1969 && v < 2050) || "Ano maior que 1969 e menor que 2015"
      ],
      hint: "O Ano digitado é válido.",
      anoMask: "####"
    };
  },
  created() {},

  methods: {
    get_Anos() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        if (this.ano < 1980 || this.ano > 2050) {
          swal.fire({
            type: "error",
            title: "Desculpe..",
            text: "O ano " + this.ano + " não pode ser cadastrado!"
          });
        } else {
          //console.log("entrou no cadastro de ano");
          this.$http
            .post(
              this.$url + "Ano/v1",
              {
                id: 0,
                numeroAno: this.ano,
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
                this.dialog_ano = false;
                swal.fire({
                  type: "success",
                  title: "Salvo com sucesso",
                  text:
                    "O ano " +
                    this.ano +
                    " já se encontra disponível para seleção!"
                });
                this.$emit("anos");
              } else if (response.status == 401) {
                swal.fire({
                  type: "success",
                  title: "Não autorizado",
                  text: "entre novamente no sistema!"
                });
                this.$router.push("/");
              } else if (response.status == 500) {
              }
              ////console.log(response.data);
            })
            .catch(e => {
              //estar pegando apenas o erro de dados duplicado quando tenta salvar na api e dar erro 500
              swal.fire("Esse ano já existe !", "Escolha outro.", "warning");
              //console.error(e);
              //console.data(e.data);
            });
        }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
