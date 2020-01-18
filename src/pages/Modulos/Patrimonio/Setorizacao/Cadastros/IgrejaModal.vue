<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn flat dark color="blue darken-4" @click="BuscarEncarregados()" slot="activator" outline>
        <v-icon>fas fa-place-of-worship</v-icon>
        <span class="pl-2">
          <b>Cadastrar igreja</b>
        </span>
      </v-btn>
      <v-card>
        <v-flex xs12 sm12>
          <div class="pt-1">
            <v-btn
              right
              class="white--text"
              small
              fab
              round
              box
              color="red darken-1"
              absolute
              v-on:click="dialog = false, LimparCampos()"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span class="font-weight-bold headline blue--text text--darken-4">Cadastrar igreja</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="cep"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-envelope-open"
                  label="Cep *"
                  required
                  mask="##-###-###"
                  :hint="errorCEP"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="cidade"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-map-marker-alt"
                  label="Cidade *"
                  required
                  :readonly="cepDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field
                  v-model="bairro"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-map-marker"
                  label="Bairro - Localidade * "
                  required
                  :readonly="cepDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-text-field
                  v-model="endereco"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-map-marked-alt"
                  label="Rua *"
                  required
                  :readonly="cepDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="numero"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-home"
                  label="Número "
                  required
                  :readonly="cepDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="nomeRelatorio"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-4"
                  label="Nome no relatório *"
                  required
                  :readonly="cepDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cod_igreja"
                  :mask="mask_cod_igreja"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-4"
                  label="Código no relatório *"
                  required
                  :readonly="cepDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs10 sm10 md6>
                <v-autocomplete
                  v-model="regional"
                  :items="regionais"
                  box
                  label="Encarregado regional *"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-4"
                  single-line
                  append-icon="fas fa-slash"
                  :readonly="cepDisable"
                >
                  <template slot="selection" slot-scope="data">{{ data.item.nome }}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile>
                        <v-list-tile-content
                          @click="EscolherRegional(data.item.nome)"
                          v-html="data.item.nome"
                        ></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs10 sm10 md6>
                <v-autocomplete
                  v-model="local"
                  :items="encLocais"
                  box
                  label="Encarregado local *"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-4"
                  single-line
                  append-icon="fas fa-slash"
                  :readonly="cepDisable"
                >
                  <template slot="selection" slot-scope="data">{{ data.item.nome }}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile>
                        <v-list-tile-content
                          @click="EscolherEncLocal(data.item.nome)"
                          v-html="data.item.nome"
                        ></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md12 lg12 align-center class="mb-4">
            <v-btn
              color="green darken-4"
              center
              class="white--text"
              v-on:click="CadastrarIgreja()"
            >salvar igreja</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="loadingCep" width="500">
      <v-card>
        <v-card-title class="headline blue darken-4 white--text" primary-title>Só um momento ...</v-card-title>

        <v-card-text>
          <v-flex sm12 xs12 md12 lg12 align-center d-flex>
            <span>
              <v-progress-circular
                :size="50"
                color="blue darken-4"
                indeterminate
                :width="3"
                class="align-center mt-4 mb-4"
              >
                <v-icon color="blue darken-4">fas fa-user-maps</v-icon>
              </v-progress-circular>
              <br />
              <small class="blue--text text--darken-4">BUSCANDO ENDEREÇO...</small>
            </span>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";

export default {
  data() {
    return {
      dialog: false,
      modal: false,
      cod_igreja: null,
      cep: null,
      cidade: null,
      bairro: null,
      endereco: null,
      numero: "",
      nomeRelatorio: null,
      regional: null,
      local: null,
      dados: null,
      errorCEP: "Digite o cep",
      bairroDisable: true,
      cepDisable: true,
      enderecoDisable: true,
      mask_cod_igreja: "BR-##-####",
      regionais: [],
      encLocais: [],
      loadingCep: false
    };
  },
  watch: {
    cep: function() {
      if (this.cep.length === 8) {
        this.loadingCep = true;
        //console.log("Buscando endereço", this.loadingCep);
        this.$http
          .get("https://viacep.com.br/ws/" + this.cep + "/json/")
          .then(response => {
            if (response.status == 200) {
              this.dados = response.data;
              //console.log(this.dados);
              this.cidade = this.dados.localidade;
              this.bairro = this.dados.bairro;
              this.endereco = this.dados.logradouro;
              this.loadingCep = false;
              if (this.dados.uf == "RN") {
                this.cod_igreja = "BR-17";
              } else {
                this.cod_igreja = "BR-17";
              }
            }
          });
      }
      if (this.cep.length < 8) {
        this.errorCEP = "CEP Inválido";
      } else {
        this.errorCEP = "CEP válido";
        this.cepDisable = false;
      }
    }
  },
  methods: {
    LimparCampos() {
      this.cod_igreja = null;
      this.cep = null;
      this.cidade = null;
      this.bairro = null;
      this.endereco = null;
      this.numero = "";
      this.nomeRelatorio = null;
      this.regional = null;
      this.local = null;
      this.dados = null;
    },
    EscolherRegional(regional) {
      this.regional = regional;
    },
    EscolherEncLocal(local) {
      this.local = local;
    },
    CadastrarIgreja() {
      //console.log("cadastrar igreja");
      let autorizacaoAux = sessionStorage.getItem("usuario");
      var id_emprestimo_buscado;
      if (!autorizacaoAux) {
        swal.fire(
          "Sua autorização expirou!",
          "Entre com suas credencias novamente.",
          "warning"
        );
        this.$router.push("/");
      }
      if (autorizacaoAux) {
        //console.log("cadastrar igreja buscando");
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro de devolucao");
        if (this.cod_igreja == "BR17" || this.cod_igreja == null) {
          //console.log(this.cod_igreja);
          const toast = swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 15000
          });

          toast({
            type: "warning",
            title:
              "Não foi possível cadastrar a igreja" +
              "<br>" +
              "O campo código da igreja ficou incompleto verifique se estar correto!"
          });
          this.dialog = true;
        } else {
          if (this.regional != null) {
            if (this.local != null) {
              this.$http
                .post(
                  this.$url + "Igreja/v1",
                  {
                    id: 0,
                    codigo: this.cod_igreja,
                    cidade: this.cidade,
                    bairro: this.bairro,
                    endereco: this.endereco,
                    cep: this.cep,
                    numero: this.numero,
                    nomeRelatorio: this.nomeRelatorio,
                    encRegional: this.regional,
                    encLocal: this.local,
                    launchDate: new Date().toISOString().substr(0, 19)
                  },
                  {
                    headers: {
                      authorization: "Bearer " + this.autorizacao.accessToken
                    }
                  }
                )
                .then(response => {
                  if (response.status == 200) {
                    ////console.log(this.emprestimos);
                    const toast = swal.mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 15000
                    });

                    toast({
                      type: "sucess",
                      title: "Igreja " + this.bairro + "salvo com sucesso."
                    });
                    this.dialog = false;
                    this.$emit("Igreja");
                  }
                })
                .catch(e => {
                  swal.fire(
                    "Descupe,mas não foi possivel salvar igreja!",
                    "Entre em contato com a equipe de desenvolvimento para resolver esse problema.",
                    "warning"
                  );

                  //console.log("Erro no emprestimo");
                  //console.error(e);
                  //console.data(e.data);
                });
            } else {
              const toast = swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 15000
              });

              toast({
                type: "warning",
                title:
                  "Não foi possível cadastrar a igreja" +
                  "<br>" +
                  "Selecione um encarregado local para salvar a igreja!"
              });
              this.dialog = true;
            }
          } else {
            const toast = swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 15000
            });

            toast({
              type: "warning",
              title:
                "Não foi possível cadastrar a igreja" +
                "<br>" +
                "Selecione um encarregado regional para salvar a igreja!"
            });
            this.dialog = true;
          }
        }
      }
    },
    BuscarEncarregados() {
      //console.log("buscar regional");
      let autorizacaoAux = sessionStorage.getItem("usuario");
      var id_emprestimo_buscado;
      if (!autorizacaoAux) {
        swal.fire(
          "Sua autorização expirou!",
          "Entre com suas credencias novamente.",
          "warning"
        );
        this.$router.push("/");
      }
      if (autorizacaoAux) {
        //console.log("regional buscando");
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro de devolucao");
        this.$http
          .get(this.$url + "Usuario/v1", {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.regionais = [];
              response.data.forEach(element => {
                if (element.cargo == "Encarregado Regional") {
                  this.regionais.push({ nome: element.nome });
                } else if (element.cargo == "Encarregado Local") {
                  this.encLocais.push({ nome: element.nome });
                }
              });
              this.regionais.push({ nome: "Sem encarregado" });
              this.regionais.reverse();
              this.encLocais.push({ nome: "Sem encarregado" });
              this.encLocais.reverse();
              ////console.log(this.emprestimos);
            }
          })
          .catch(e => {
            swal.fire(
              "Descupe,mas não foi possivel buscar encarregados!",
              "Entre em contato com a euqipe de desenvolviemnto para resolver esse problema.",
              "warning"
            );

            //console.log("Erro no emprestimo");
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarEncLocal() {
      //console.log("buscar local");
      let autorizacaoAux = sessionStorage.getItem("usuario");
      var id_emprestimo_buscado;
      if (!autorizacaoAux) {
        swal.fire(
          "Sua autorização expirou!",
          "Entre com suas credencias novamente.",
          "warning"
        );
        this.$router.push("/");
      }
      if (autorizacaoAux) {
        //console.log("local buscando");
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro de devolucao");
        this.$http
          .get(this.$url + "EncarregadoLocal/v1", {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.encLocais = [];
              this.encLocais = response.data;
              this.encLocais.push({ nome: "Sem encarregado" });
              this.encLocais.reverse();
              ////console.log(this.emprestimos);
            }
          })
          .catch(e => {
            swal.fire(
              "Descupe,mas não foi possivel buscar encarregados locais!",
              "Entre em contato com a euqipe de desenvolviemnto para resolver esse problema.",
              "warning"
            );

            //console.log("Erro no encarregado local");
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    Loading(title, icon) {
      swal.fire({
        title: title,
        html:
          "Por favor só um momento... " + '<i class="fas fa-' + icon + "></i>",
        timer: 3000,
        onOpen: () => {
          swal.enableLoading();
        }
      });
    },
    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>
<style>
.mesmo-tamanho {
  width: 100%;
  white-space: normal;
}
</style>
