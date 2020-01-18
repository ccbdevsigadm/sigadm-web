<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="800px">
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
              v-on:click="dialog = false, editarDisable = true, LimparCampos()"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span
              class="font-weight-bold headline blue--text text--darken-4"
            >Cadastro da Igreja</span>
          </v-flex>
        </v-card-title>
        <v-card-text v-if="editarDisable == true">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex offset-md7 offset-xs7 offset-sm7 xs5 sm5 md5>
                <v-btn
                  color="orange"
                  class="white--text"
                  @click="AtivarEdicao()"
                  v-if="editarDisable == true"
                >Ativar edição</v-btn>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="cep"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-envelope-open"
                  label="Cep *"
                  required
                  :readonly="editarDisable"
                  mask="##-###-###"
                  :hint="errorCEP"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="cidade"
                  box
                  :readonly="editarDisable"
                  color="blue darken-3"
                  append-icon="fas fa-map-marker-alt"
                  label="Cidade *"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field
                  v-model="bairro"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marker"
                  label="Bairro - Localidade * "
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-text-field
                  v-model="endereco"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marked-alt"
                  label="Rua *"
                  required
                  :readonly="editarDisable"
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
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="nomeRelatorio"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-3"
                  label="Nome no relatório *"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cod_igreja"
                  :mask="mask_cod_igreja"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-3"
                  label="Código no relatório *"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-autocomplete
                  class="mt-3"
                  v-model="regional"
                  :items="encRegionais"
                  box
                  append-icon="fas fa-slash"
                  label="Encarregado regional"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-3"
                  single-line
                  :readonly="editarDisable"
                >
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile>
                        <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex>
                <v-autocomplete
                  class="mt-3"
                  v-model="local"
                  :items="encLocais"
                  box
                  append-icon="fas fa-slash"
                  label="Encarregado local"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-3"
                  single-line
                  :readonly="editarDisable"
                >
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile>
                        <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
               <v-flex xs12 sm12 md12 lg12 align-center class="pt-0">
                <v-btn
                  color="green darken-4"
                  class="white--text"
                  center                  
                  v-on:click="CadastrarIgreja()"
                >salvar igreja</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text v-if="editarDisable == false">
          <v-container grid-list-md>
            <v-flex offset-md7 offset-xs7 offset-sm7 xs5 sm5 md5>
              <v-btn
                color="orange"
                outline
                class="white--text"
                @click="DesativarEdicao()"
                v-if="editarDisable == false"
              >Desativar edição</v-btn>
              <v-btn color="red" class="white--text" @click="AlertaDeletar(idIgreja)">Excluir</v-btn>
            </v-flex>
            <v-layout wrap>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="cep"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-envelope-open"
                  label="Cep *"
                  required
                  :readonly="editarDisable"
                  mask="##-###-###"
                  :hint="errorCEP"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="cidade"
                  box
                  :readonly="editarDisable"
                  color="blue darken-3"
                  append-icon="fas fa-map-marker-alt"
                  label="Cidade *"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field
                  v-model="bairro"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marker"
                  label="Bairro - Localidade * "
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-text-field
                  v-model="endereco"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marked-alt"
                  label="Rua *"
                  required
                  :readonly="editarDisable"
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
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="nomeRelatorio"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-3"
                  label="Nome no relatório *"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cod_igreja"
                  :mask="mask_cod_igreja"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-3"
                  label="Código no relatório *"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-autocomplete
                  class="mt-3"
                  v-model="regional"
                  :items="encRegionais"
                  box
                  append-icon="fas fa-slash"
                  label="Encarregado regional"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-3"
                  single-line
                  :readonly="editarDisable"
                >
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile>
                        <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex>
                <v-autocomplete
                  class="mt-3"
                  v-model="local"
                  :items="encLocais"
                  box
                  append-icon="fas fa-slash"
                  label="Encarregado local"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-3"
                  single-line
                  :readonly="editarDisable"
                >
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10>
                      <v-list-tile>
                        <v-list-tile-content v-html="data.item.nome"></v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 align-center class="pt-0">
                <v-btn
                  color="green darken-4"
                  class="white--text"
                  center                  
                  v-on:click="CadastrarIgreja()"
                >salvar igreja</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
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
                color="blue darken-3"
                indeterminate
                :width="3"
                class="align-center mt-4 mb-4"
              >
                <v-icon color="blue darken-1">fas fa-user-maps</v-icon>
              </v-progress-circular>
              <br />
              <small class="blue--text text--darken-1">BUSCANDO ENDEREÇO...</small>
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
  props: ["igreja_edicao", "dialog_ativar"],
  data() {
    return {
      dialog: false,
      modal: false,
      cod_igreja: null,
      cep: null,
      cidade: null,
      bairro: null,
      endereco: null,
      numero: null,
      idIgreja: null,
      nomeRelatorio: null,
      regional: null,
      dataCadastro: null,
      local: null,
      dados: null,
      editarDisable: true,
      errorCEP: "Digite o cep",
      bairroDisable: true,
      cepDisable: true,
      enderecoDisable: true,
      mask_cod_igreja: "BR-##-####",
      encRegionais: [],
      encLocais: [],
      loadingCep: false,
      ativar_edicao_btn: true
    };
  },
  watch: {
    dialog_ativar: function() {
      //console.log("Edicao: ", this.dialog_ativar);
      this.dialog = true;
      this.BuscarEncarregadosRegionais();
      this.BuscarEncarregadosLocais();
    },
    igreja_edicao: function() {
      //console.log("Igreja Edição", this.igreja_edicao);
      this.cep = this.igreja_edicao.cep;
      this.cidade = this.igreja_edicao.cidade;
      this.bairro = this.igreja_edicao.bairro;
      this.endereco = this.igreja_edicao.endereco;
      this.numero = this.igreja_edicao.numero;
      this.cod_igreja = this.igreja_edicao.codigo;
      this.nomeRelatorio = this.igreja_edicao.nomeRelatorio;
      this.dataCadastro = this.igreja_edicao.launchDate;
      this.regional = this.igreja_edicao.encRegional;
      this.local = this.igreja_edicao.encLocal;
      this.idIgreja = this.igreja_edicao.id;
      //console.log(this.local + " - " + this.regional);
    }
  },
  methods: {
    AtivarEdicao() {
      this.editarDisable = false;
    },
    DesativarEdicao() {
      this.editarDisable = true;
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
              if (this.numero == "S/N") {
                this.numero = "0";
              }
              this.$http
                .put(
                  this.$url + "Igreja/v1",
                  {
                    id: this.idIgreja,
                    codigo: this.cod_igreja,
                    cidade: this.cidade,
                    bairro: this.bairro,
                    endereco: this.endereco,
                    cep: this.cep,
                    numero: this.numero,
                    nomeRelatorio: this.nomeRelatorio,
                    encRegional: this.regional,
                    encLocal: this.local,
                    launchDate: this.dataCadastro
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
    LimparCampos() {
      this.cep = this.igreja_edicao.cep;
      this.cidade = this.igreja_edicao.cidade;
      this.bairro = this.igreja_edicao.bairro;
      this.endereco = this.igreja_edicao.endereco;
      this.numero = this.igreja_edicao.numero;
      this.cod_igreja = this.igreja_edicao.codigo;
      this.nomeRelatorio = this.igreja_edicao.nomeRelatorio;
      this.dataCadastro = this.igreja_edicao.launchDate;
      this.regional = this.igreja_edicao.encRegional;
      this.local = this.igreja_edicao.encLocal;
      this.idIgreja = this.igreja_edicao.id;
    },
    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    AlertaDeletar(id) {
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: "btn  btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: true
      });

      return swalWithBootstrapButtons({
        title:
          "Deseja excluir a igreja: " +
          this.nomeRelatorio +
          " - " +
          this.cidade +
          " - " +
          this.cod_igreja +
          "?",
        text:
          "Se confirmar esta ação o registro será excluido definitivamente do nosso banco de dados.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.IgrejaDeletar(id);
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      });
    },
    IgrejaDeletar(item) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        //console.log("Nao autorizado");
      } else if (usuarioAutorize) {
        //console.log("delete o item ", item);
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .delete(this.$url + "Igreja/v1/" + item, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 204) {
              //console.log("Deletado com sucesso, dados:", response.data);
              this.$emit("Igreja");
            }
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarEncarregadosRegionais() {
      //console.log("buscar regional");
      let autorizacaoAux = sessionStorage.getItem("usuario");
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
              this.encRegionais = [];
              response.data.forEach(element => {
                if (element.cargo == "Encarregado Regional") {
                  this.encRegionais.push({ nome: element.nome });
                }
              });
              this.encRegionais.push({ nome: "Sem encarregado regional" });
              this.encRegionais.reverse();
            }
          })
          .catch(e => {
            this.token = Math.random();
            //console.log("Nao autorizado", this.token);
          });
      }
    },
    BuscarEncarregadosLocais() {
      //console.log("buscar encarregado local");
      let autorizacaoAux = sessionStorage.getItem("usuario");
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
          .get(this.$url + "Usuario/v1", {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            if (response.status == 200) {
              this.encLocais = [];
              response.data.forEach(element => {
                if (element.cargo == "Encarregado Local") {
                  this.encLocais.push({ nome: element.nome });
                }
              });
              this.encLocais.push({ nome: "Sem encarregado local" });
              this.encLocais.reverse();
            }
          })
          .catch(e => {
            this.token = Math.random();
            //console.log("Nao autorizado", this.token);
          });
      }
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
