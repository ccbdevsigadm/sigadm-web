<template>
  <v-flex xs12 sm6 md8 d-flex>
    <v-autocomplete
      v-model="origem"
      :items="origens"
      box
      label="Origem"
      item-text="cidade"
      item-value="cidade"
      color="teal darken-3"
      single-line
      append-icon="far fa-list-alt"
    >
      <template
        slot="selection"
        slot-scope="data"
      >{{data.item.doador}}, {{data.item.cidade }}-{{data.item.estado}}</template>
      <template slot="item" slot-scope="data">
        <v-flex xs10 sm10>
          <v-list-tile>
            <v-list-tile-content
              @click="Selecionar(data.item.doador,data.item.cidade, data.item.estado)"
            >{{data.item.doador}}, {{data.item.cidade }}-{{data.item.estado}}</v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </template>
    </v-autocomplete>
    <cad-origem @origens="AtualizarOrigens"></cad-origem>
  </v-flex>
</template>
<script type="text/babel">
import CadOrigem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Origem/CadastroOrigem";
import swal from "sweetalert2";
export default {
  name: "SelecaoOrigem",
  components: {
    CadOrigem
  },
  data() {
    return {
      isUpdating: false,
      autorizacao: false,
      origens: [],
      origem: null
    };
  },
  created() {
    this.AtualizarOrigens();
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },
  methods: {
    remove(item) {
      const index = this.origens.indexOf(item.name);
      if (index >= 0) this.origens.splice(index, 1);
    },
    Selecionar(doador, cidade ,estado) {
      //console.log(doador, cidade, estado)
      this.$emit("origem_instrumento", { origem: doador+", "+cidade+"/"+estado });
    },
    DeletarOrigem(id, origem) {
      swal
        .fire({
          title:
            "Deseja excluir a origem " +
            origem.doador +
            " " +
            origem.cidade +
            " " +
            origem.estado +
            "?",
          text: "Após a confirmação esta ação não poderá ser revertida!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar"
        })
        .then(result => {
          if (result.value) {
            this.Deletar(id);
            swal.fire(
              "Deletado!",
              "A origem " +
                origem.doador +
                " " +
                origem.cidade +
                " " +
                origem.estado +
                " foi deletado com sucesso.",
              "success"
            );
          }
        });
    },
    Deletar(id) {
      //endpoit que fará a deleção do item ano
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        this.$router.push("/");
        const toast = swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: "error",
          title: "Sem autorização, entre com seus dados novamente!"
        });
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .delete(this.$url + "OrigemInstrumento/v1/" + id, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            //console.log("deletando origem");
            if (response.status == 204) {
              //console.log("dados do origem");
              //console.log(response.data);
              this.AtualizarOrigens();
              //Criar um loop pois o dado "data" que é recebido é um array
            } else if (response.status == 401) {
              this.$router.push("/");
              const toast = swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });
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
    },
    AtualizarOrigens() {
      this.origens = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "OrigemInstrumento/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log(
            //  "ORIGENS DATA ok! ",
            //  new Date().toISOString().substr(0, 16)
            //);
            this.origens = response.data;
            //console.log(response.data);
            //console.log(this.origens);
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
