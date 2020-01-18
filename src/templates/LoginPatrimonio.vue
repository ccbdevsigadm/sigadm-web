<template>
  <div>
        <v-img src="https://images.unsplash.com/photo-1527606432722-8b1422ce77a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)" aspect-ratio="2.07" > <slot></slot></v-img>
  </div>
</template>

<script>
export default {
  name: "LoginPatrimonio",
  data() {
    return {
      usuario: false
    };
  },
  components: {},
  created() {
    //console.log("created()");
    let usuarioSecao = sessionStorage.getItem("usuario");
    if (usuarioSecao) {
      this.usuario = JSON.parse(usuarioSecao);
    }
  },
  methods: {
    sair() {
      sessionStorage.clear();
      this.usuario = false;
    }
  }
};
</script>

<style>
</style>
