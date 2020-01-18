<template>
  <v-btn    
    outline
    :color="ativar ? 'teal darken-2': 'orange darken-4'"
    @click="ativar = !ativar, Selecionar(ativar)"
  >
   <small> {{ ativar ? 'fechar edição' : 'editar'}}</small>
    <v-icon right small>{{ ativar ? 'fas fa-arrow-left' : 'fas fa-edit'}}</v-icon>
  </v-btn>
</template>

<script type="text/babel">
import swal from "sweetalert2";

export default {
  name: "Adicionar",
  components: {},
  data() {
    return {
      ativar: false
    };
  },

  methods: {
    Selecionar(ativar) {
      //console.log(this.ativar);
      this.$emit("ativar_edicao", { ativar: this.ativar });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
