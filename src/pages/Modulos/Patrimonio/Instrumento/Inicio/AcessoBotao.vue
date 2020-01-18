<template>
  <!-- Bootstrap Default Buttons -->
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="card mt-5">
        <div class="header">
          <h2 class="teal--text text--darken-3">
            SECRETARIA
            <small class="teal--text text--lighten-1">ACESSO RÁPIDO</small>
          </h2>
        </div>
        <div>
          <v-flex xs12 sm12 md12 text-xs-center class="mt-3 pb-3">

            <v-btn round outline color="teal darken-3" @click="Inicio" >
              <small>ESTOQUE de instrumentos</small>
              <v-icon right small>fas fa-home</v-icon>
            </v-btn>

            <v-btn round outline color="teal darken-2" @click="CadastrarInstrumento" >
              <small>Cadastro de instrumentos</small>
              <v-icon right small>fas fa-guitar</v-icon>
            </v-btn>
            <!--
                 <v-btn depressed outline round color="info" dark>PESQUISAR</v-btn>
              <v-btn depressed outline round color="indigo" dark>ESTATÍSTICAS</v-btn>
              <v-btn depressed outline round color="black" dark>BAIXAS</v-btn>
            -->
          </v-flex>
        </div>
      </div>
    </div>
  </div>
  <!-- #END# Bootstrap Default Buttons -->
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "AcessoBotao",
  data() {
    return {
      inicio: true
    };
  },

  methods: {
    CadastrarInstrumento() {
      this.$router.push("/cadastro-patrimonio-instrumento");
    },
    Inicio() {
      this.$router.push("/inicio-patrimonio");
      this.inicio = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
