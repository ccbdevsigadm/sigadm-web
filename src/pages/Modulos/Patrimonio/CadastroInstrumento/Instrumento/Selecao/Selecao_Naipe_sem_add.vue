<template>
  <v-flex xs12 sm12 md12 d-flex>
    <v-select
      :items="naipes"
      label="Naipe"
      box
      color="teal darken-3"
      v-model="nome"
      @change="SelecionarCaracteristicas(nome)"
      :rules="[() => !!nome || 'Este campo precisa ser selecionado!']"
    ></v-select>
  </v-flex>
</template>

<script type="text/babel">
import swal from "sweetalert2";

export default {
  name: "Selecao_nome",  
  data() {
    return {
      autorizacao: false,
      naipes: ['Cordas', 'Madeiras', 'Metais'],
      nome: ""
    };
  },
  created() {
    this.AtualizarNomes();
  },

  methods: {
    SelecionarCaracteristicas(nome) {
      /*console.log(
        "modificar caracteristicas " +
          nome +
          " de acordo com o instrumento selecionado!"
      );*/
      this.$emit("nome_instrumento", { nome: this.nome });
    },
    AtualizarNomes() {
      this.nomes = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "NomeInstrumento/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            response.data.forEach(element => {
              //console.log("Pós cadastro", element.nome);
              this.nomes.push(element.nome);
            });
          } else if (response.status == 401) {
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
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
