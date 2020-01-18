<template>
  <v-flex xs12 sm6 md4 d-flex>
    <v-select
      :items="marcas"
      label="Marca"
      outline
      v-model="marca"
      color="teal darken-3"
      append-icon="fas fa-marker"
      @change="Selecionar(marca)"
      :rules="[() => !!marca || 'Este campo precisa ser selecionado!']"
    >
      <template slot="item" slot-scope="data">
        <v-flex xs10 sm10>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{data.item}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
        <v-flex xs2 sm2>
          <v-btn flat icon color="red" @click="DeletarMarca(data.item)">
            <v-icon>fas fa-trash-alt</v-icon>
          </v-btn>
        </v-flex>
      </template>
    </v-select>
    <cad-marca v-on:marcas="AtualizarMarcas()"></cad-marca>
  </v-flex>
</template>

<script type="text/babel">
import CadMarca from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Marca";
import swal from "sweetalert2";

export default {
  name: "Selecao_Marca",
  components: {
    CadMarca
  },
  data() {
    return {
      autorizacao: false,
      marcas: [],
      marca: ""
    };
  },
  created() {
    this.AtualizarMarcas();
  },

  methods: {
    Selecionar(marca) {
      /*console.log(
        "modificar marca " + marca + " de acordo com o instrumento selecionado!"
      );*/
      this.$emit("marca_instrumento", { marca: this.marca });
    },
    DeletarMarca(marca) {
      swal
        .fire({
          title: "Deseja excluir a marca " + marca + "?",
          text: "Após a confirmação esta ação não poderá ser revertida!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar"
        })
        .then(result => {
          if (result.value) {
            this.Deletar(marca);
            swal.fire(
              "Deletado!",
              "A Marca " + marca + " foi deletado com sucesso.",
              "success"
            );
          }
        });
    },
    Deletar(marca) {
      //endpoit que fará a deleção do item nome
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
          .delete(
            this.$url + "MarcaInstrumento/v1/deletar-por-marca?marca=" + marca,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            //console.log(response.status);
            //console.log("deletando nome");
            if (response.status == 204) {
              //console.log("dados da marca");
              //console.log(response.data);
              this.AtualizarMarcas();
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
    AtualizarMarcas() {
      this.marcas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "MarcaInstrumento/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            response.data.forEach(element => {
              //console.log("Pós cadastro", element.marca);
              this.marcas.push(element.marca);
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
