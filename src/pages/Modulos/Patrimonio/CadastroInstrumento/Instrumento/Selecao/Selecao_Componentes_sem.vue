<template>
  <v-flex xs12 sm6 md4 d-flex>
    <v-autocomplete
      v-model="selectComponentes"
      :items="componentes"
      box
      label="Componentes do Instrumento"
      multiple
      item-text="componente"
      item-value="componente"
      chips
      color="teal darken-3"
      single-line
      append-icon="far fa-list-alt"
      @change="Selecionar(selectComponentes)"
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          :key="JSON.stringify(data.item.id)"
          close
          color="teal darken-3 "
          class="chip--select-multi white--text"
          @input="data.parent.selectItem(data.item.componente)"
        >{{ data.item.componente }}</v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <v-flex xs10 sm10>
          <v-list-tile>
            <v-list-tile-content v-html="data.item.componente"></v-list-tile-content>
          </v-list-tile>
        </v-flex>        
      </template>
    </v-autocomplete>
  </v-flex>
</template>

<script type="text/babel">
import CadComponente from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Componente";
import swal from "sweetalert2";

export default {
  name: "Selecao_Componente",
  components: {
    CadComponente
  },
  data() {
    return {
      autorizacao: false,
      componentes: [],
      ano: "",
      selectComponentes: []
    };
  },

  created() {
    this.AtualizarComponentes();
  },

  methods: {
    Selecionar(componentes) {
      this.$emit("componentes_instrumento", {
        componentes: this.selectComponentes
      });
    },
    DeletarComponente(id, componente) {
      swal
        .fire({
          title: "Deseja excluir o componente " + componente + "?",
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
              "O componente " + componente + " foi deletado com sucesso.",
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
          .delete(this.$url + "ComponenteInstrumento/v1/" + id, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            //console.log("deletando componente");
            if (response.status == 204) {
              //console.log("dados do componente");
              //console.log(response.data);
              this.AtualizarComponentes();
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
    AtualizarComponentes() {
      this.componentes = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "ComponenteInstrumento/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            this.componentes = response.data;
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
