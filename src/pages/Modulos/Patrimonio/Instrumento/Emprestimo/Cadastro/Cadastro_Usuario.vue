<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-fade-transition slot="activator">
      <v-btn outline fab dark small color="teal darken-2">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-fade-transition>
    <v-card>
      <v-flex xs12 sm12 md12 lg12>
        <div class="pt-3">
          <v-btn
            right
            class="white--text"
            small
            fab
            round
            outline
            color="red darken-1"
            absolute
            v-on:click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 class="pt-2" align-center>
        <v-card-title class="headline teal--text text--darken-3">Novo Irmão</v-card-title>
        <v-divider></v-divider>
      </v-flex>
      <v-card-text>
        <v-flex xs12 sm12 md12 d-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field
              v-model="nome"
              outline
              label="Nome"
              required
              color="teal darken-3"
              append-icon="fas fa-user-tie"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4 class="pl-1">
            <v-text-field
              v-model="endereco"
              outline
              label="Endereço"
              required
              color="teal darken-3"
              append-icon="fas fa-map-marked-alt"             
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4 class="pl-1">
            <v-text-field
              v-model="cidade"
              outline
              label="Cidade"
              required
              color="teal darken-3"
              append-icon="fas fa-city"              
            ></v-text-field>
          </v-flex>
        </v-flex>
        <v-flex xs12 sm12 md12 d-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field
              v-model="telefone"
              outline
              label="Tel."
              required
              color="teal darken-3"
              append-icon="fas fa-phone"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6 class="pl-1">
            <v-text-field
              v-model="congregacao"
              outline
              label="Congregação"
              required
              color="teal darken-3"
              append-icon="fas fa-place-of-worship"
            ></v-text-field>
          </v-flex>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md12 lg12 align-center>
          <v-btn
            color="teal darken-2"
            round
            outline
            v-on:click="Salvar"
          >Salvar dados</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script type="text/babel">
import swal from "sweetalert2";

export default {
  name: "Cadastro_Usuario",
  data() {
    return {
      nome:'',
      endereco:'',
      cidade:'',
      telefone:'',
      congregacao:'',
      autorizacao: false,
      dialog: false,
      ano: "",
      anoRules: [
        v => !!v || "Ano é obrigatório",
        v => (v >= 1969 && v < 2050) || "Ano maior que 1969 e menor que 2015"
      ],
      hint: "O Ano digitado é válido.",
      anoMask: "####"
    };
  },
  created() {},

  methods: {
    Salvar() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        if (this.nome == '' || this.endereco == '' || this.cidade == '' || this.telefone == '' || this.congregacao == '') {
          swal.fire({
            type: "error",
            title: "Verifique...",
            text: "todos os campos devem estar preenchidos!"
          });
          this.dialog = true;

        } else {

          ////console.log("entrou no cadastro de ano");
          this.$http
            .post(
              this.$url + "AtendidoInstrumento/v1",
              {
                id: 0,
                nome: this.nome,
                endereco:this.endereco,
                cidade: this.cidade,
                telefone: this.telefone,
                congregacao: this.congregacao,
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
                    "O irmão " +
                    this.nome +
                    " cadastrado com sucesso!"
                });
                this.dialog = false;
                //this.$emit("anos");
                this.$emit("nome", { nome: this.nome});
              } else if (response.status == 401) {
                swal.fire({
                  type: "success",
                  title: "Não autorizado",
                  text: "entre novamente no sistema!"
                });
                this.$router.push("/");
              } else if (response.status == 500) {
              }
              //////console.log(response.data);
            })
            .catch(e => {
              //estar pegando apenas o erro de dados duplicado quando tenta salvar na api e dar erro 500
              swal.fire("Esse ano já existe !", "Escolha outro.", "warning");
              ////console.error(e);
              ////console.data(e.data);
            });
        }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
