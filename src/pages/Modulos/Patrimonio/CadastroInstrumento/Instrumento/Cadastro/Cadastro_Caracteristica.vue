<template>
  <v-dialog v-model="dialog"  max-width="290">
    <v-btn  slot="activator" flat  color="blue darken-4">
    <strong>Característica</strong>
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
            v-on:click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 d-flex class="pt-5 pl-2" align-center>
        <v-card-title
          class="headline blue--text text--darken-4"
        ><strong>Caracteristica ou Tonalidade do instrumento</strong></v-card-title>
      </v-flex>
      <v-card-text>
        <v-text-field
          v-model="caracteristica"
          :counter="10"
          box
          color="blue darken-4"
          :rules="rules"
          placeholder="Ex. Sib ou 4/4 ..."
          label="Caracteristica/Tonalidade"
          required
        ></v-text-field>
        <selecao-naipe @nome_instrumento="SelecionarNome"></selecao-naipe>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="green darken-4"
            center
            box
            class="white--text"
            placeholder="Ex. Sib ou 4/4 ..."
            v-on:click="get_Caracteristicas"
            @click="dialog = false"
          >Salvar característica</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script type="text/babel">
import swal from "sweetalert2";
import SelecaoNaipe from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Naipe_sem_add";
export default {
  name: "Cadastro_Caracteristica",
  components: {
    SelecaoNaipe
  },
  data() {
    return {
      autorizacao: false,
      dialog: false,
      caracteristica: "",
      nome: "",
      rules: [
        v => !!v || "Nome é obrigatório",
        v =>
          /[A-Z][a-z]+/.test(v) ||
          "A primeita letra deve ser maiuscula e ter no mínimo 2 letras"
      ]
    };
  },
  methods: {
    SelecionarNome(payload) {
      //console.log("antes: ", this.nome);
      this.nome = payload.nome;
      //console.log("depois: ", this.nome);
    },
    get_Caracteristicas() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou no cadastro");
        if (this.caracteristica != "") {
          this.$http
            .post(
              this.$url + "CaracteristicaInstrumento/v1",
              {
                id: 0,
                caracteristica: this.caracteristica,
                naipe: this.nome,
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
                    "A característica " +
                    this.caracteristica +
                    " estar associada ao nome " +
                    this.nome +
                    " e já se encontra disponível para seleção!"
                });
                this.$emit("caracteristicas");
              }
              //console.log(response.data);
            })
            .catch(e => {
              //estar pegando apenas o erro de dados duplicado quando tenta salvar na api e dar erro 500
              swal.fire(
                "Essa característica ou tonalidade já existe !",
                "Escolha outra.",
                "warning"
              );
              //console.error(e);
              //console.data(e.data);
            });
        }else{
          swal.fire(
                "Desculpe...",
                "Caracteristicas/ Tonalidade não pode estar em branco.",
                "warning"
              );
        }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
