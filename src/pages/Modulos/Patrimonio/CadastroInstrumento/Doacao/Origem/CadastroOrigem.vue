<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-btn  slot="activator" flat color="blue darken-4">
      <strong>Origem da doação</strong>
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
      <v-flex xs12 sm12 md12 lg12 d-flex class="pt-2" align-center>
        <v-card-title class="headline blue--text text--darken-4"><strong>Origem da doação</strong></v-card-title>
      </v-flex>
      <v-card-text xs12 sm12 md12 lg12>
        <v-text-field
          v-model="doador"
          :rules="[() => !!doador || 'Campo obrigatório, precisa ser preenchido!']"
          box
          color="blue darken-4"
          :counter="10"
          label="Doador"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="estado"
          :rules="[() => !!estado || 'Campo obrigatório, precisa ser preenchido!']"
          box
          color="blue darken-4"
          :counter="10"
          label="Estado"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="cidade"
          :rules="[() => !!cidade || 'Campo obrigatório, precisa ser preenchido!']"
          box
          color="blue darken-4"
          :counter="10"
          label="Cidade"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            center
            class="white--text"
            color="green darken-4"
            v-on:click="get_Origens"
            @click="dialog = false"
          >Salvar Origem</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script type="text/babel">
import swal from "sweetalert2";
export default {
  name: "CadastroOrigem",
  data() {
    return {
      autorizacao: false,
      dialog: false,
      doador: "",
      estado: "",
      cidade: ""
    };
  },
  methods: {
    get_Origens() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);

        //console.log("entrou no cadastro de origem");
        this.$http
          .post(
            this.$url + "OrigemInstrumento/v1",
            {
              id: 0,
              doador: this.doador,
              estado: this.estado,
              cidade: this.cidade,
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
                  "A Origem " +
                  this.doador +
                  "-" +
                  this.estado +
                  "/" +
                  this.cidade +
                  " já se encontra disponível para seleção!"
              });
              this.$emit("origens");
            } else if (response.status == 401) {
            } else if (response.status == 500) {
            }
            ////console.log(response.data);
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
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
