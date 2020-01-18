<template>
  <v-flex xs12 sm6 md4 d-flex>
    <v-select
      :items="anos"
      label="Ano de Fabricação"
      box
      color="teal darken-2"
      v-model="ano"
      append-icon="fas fa-calendar-check"
      @change="Selecionar(ano)"
      :rules="[() => !!ano || 'Este campo precisa ser selecionado!']"
    >
      <template slot="item" slot-scope="data">
        <v-flex xs10 sm10>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{data.item}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-flex>
      </template>
    </v-select>
  </v-flex>
</template>

<script type="text/babel">
import CadAno from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Ano";
import swal from "sweetalert2";

export default {
  name: "Selecao_Ano",
  components: {
    CadAno
  },
  data() {
    return {
      autorizacao: false,
      anos: [],
      ano: ""
    };
  },
  created() {
    this.AtualizarAnos();
  },

  methods: {
    Selecionar(ano) {
      this.$emit("ano_instrumento", { ano: this.ano });
    },
    DeletarAno(ano) {
      swal
        .fire({
          title: "Deseja excluir o ano " + ano + "?",
          text: "Após a confirmação esta ação não poderá ser revertida!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar"
        })
        .then(result => {
          if (result.value) {
            this.Deletar(ano);
            swal.fire(
              "Deletado!",
              "O ano " + ano + " foi deletado com sucesso.",
              "success"
            );
          }
        });
    },
    Deletar(ano) {
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
          .delete(this.$url + "Ano/v1/deletar-por-ano?ano=" + ano, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            //console.log("deletando ano");
            if (response.status == 204) {
              //console.log("dados do ano");
              //console.log(response.data);
              this.AtualizarAnos();
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
    AtualizarAnos() {
      this.anos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "Ano/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            response.data.forEach(element => {
              //console.log("Pós busca - ano: ", element.numeroAno);
              this.anos.push(element.numeroAno);
              if (element.numeroAno > 0) {
                //console.log("Numero ", element.numeroAno);
                this.anos.sort();
                this.anos.reverse();
              } else {
                //console.log("Texto", element.numeroAno);
              }
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
