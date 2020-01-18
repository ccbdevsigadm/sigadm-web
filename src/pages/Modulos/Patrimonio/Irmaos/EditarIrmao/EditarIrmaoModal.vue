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
              v-on:click="dialog = false, editarDisable = true"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span class="font-weight-bold headline blue--text text--darken-4"> Cadastro do Irmão {{nome}}</span>
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
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cpf"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-book"
                  label="CPF do Irmão"
                  mask="###.###.###-##"
                  :readonly="editarDisable"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6>
                <v-text-field
                  v-model="computedDateFormatted"
                  box
                  color="blue darken-3"
                  append-icon="event"
                  label="Data de nascimento"
                  :readonly="editarDisable"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="nome"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-book"
                  label="Nome"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="cep"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-envelope-open"
                  label="CEP"
                  mask="##.###-###"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="cidade"
                  box
                  color="blue darken-3"
                   append-icon="fas fa-map-marker-alt"
                  label="Cidade"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field
                  v-model="bairro"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marker"
                  label="Bairro - Localidade"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-text-field
                  v-model="rua"
                  box
                  color="blue darken-3"
                   append-icon="fas fa-map-marked-alt"
                  label="Rua"
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
                  label="Número"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="complemento"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-puzzle-piece"
                  label="Complemento"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md2>
                <v-text-field
                  v-model="ddd"
                  box
                  color="blue darken-3"
                   append-icon= " fas fa-broadcast-tower"
                  label="DDD"
                  required
                  mask="(##)"
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="telefone"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-phone"
                  label="Telefone"
                  mask="# #### - ####"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cargo"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-user-tie"
                  label="Cargo"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="congregacao"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-place-of-worship"
                  label="Comum congregação"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
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
              <v-btn color="red" class="white--text" @click="AlertaDeletar(idIrmao)">Excluir</v-btn>
            </v-flex>
            <v-layout wrap>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cpf"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-book"
                  label="CPF do Irmão"
                  :readonly="editarDisable"
                  mask="###.###.###-##"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6>
                <v-dialog
                  ref="dialog_nascimento_modal"
                  v-model="modal"
                  :return-value.sync="data_nascimento"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Data de nascimento"
                    append-icon="event"
                    readonly                   
                    color="teal darken-3"
                    hint
                    persistent-hint
                    box
                  ></v-text-field>
                  <v-date-picker
                    v-model="data_nascimento"
                    scrollable
                    locale="pt-BR"
                    color="blue darken-4"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancelar</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog_nascimento_modal.save(data_nascimento)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="nome"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-book"
                  label="Nome"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="cep"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-envelope-open"
                  label="CEP"
                  required
                  mask="##.###-###"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="cidade"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marker-alt"
                  label="Cidade"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field
                  v-model="bairro"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marker"
                  label="Bairro - Localidade"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-text-field
                  v-model="rua"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-map-marked-alt"
                  label="Rua"
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
                  label="Número"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="complemento"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-puzzle-piece"
                  label="Complemento"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md2>
                <v-text-field
                  v-model="ddd"
                  box
                  color="blue darken-3"
                  append-icon= " fas fa-broadcast-tower"
                  label="DDD"
                  required
                  mask="(##)"
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  v-model="telefone"
                  box
                  color="blue darken-3"
                  append-icon="fas fa-phone"
                  label="Telefone"
                  mask="# ####-####"
                  required
                  :readonly="editarDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6>              
                  <v-select v-model="cargo" :readonly="editarDisable" append-icon="fas fa-user-tie"  color="blue darken-3" label="Cargo" box  :items="cargos"></v-select>  
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-autocomplete
                  v-model="congregacao"
                  :items="igrejas"
                  label="Comum congregação"
                  item-text="comum"
                  item-value="comum"
                  color="blue darken-4"
                  append-icon="fas fa-place-of-worship"
                  box
                >
                  <template slot="selection" slot-scope="data">{{ data.item.comum}}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex
                      xs10
                      sm10
                      :key="JSON.stringify(data.item.id)"
                      @click="EscolherIgreja(data.item.id)"
                    >
                      <v-list-tile>
                        <v-list-tile-content>{{data.item.comum}}</v-list-tile-content>
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
              @click="SalvarIrmao() , VincularIgreja()"
              class="white--text"
            >salvar irmão</v-btn>
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
import axios from "axios";

export default {
  name: "EditarIrmaoModal",
  props: ["irmao_dados", "dialog_ativar"],
  data() {
    return {
      idIrmao: null,
      cpf: null,
      dialog_nascimento_modal: false,
      data_nascimento: null,
      nome: null,
      cep: null,
      loadingCep: false,
      cidade: null,
      bairro: null,
      rua: null,
      numero: null,
      complemento: null,
      ddd: null,
      telefone: null,
      cargo: null,
       cargos: [
        "Aluno",
        "Músico",
        "Instrutor",
        "Encarregado Local",
        "Encarregado Regional"
      ],
      congregacao: null,
      igrejas: [],
      idCongregacao: null,
      dialog: false,
      modal: false,
      autorizacao: "",
      editarDisable: true,
      irmao: [],
      idVinculoIgreja: null
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_nascimento);
    }
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
              this.rua = this.dados.logradouro;
              this.loadingCep = false;
              if (this.bairro == "") {
                this.bairroDisable = false;
                this.enderecoDisable = false;
              }
              if (this.endereco == "") {
                this.enderecoDisable = false;
              }
              if (this.dados.erro == true) {
                this.enderecoDisable = false;
                const toast = swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000
                });

                toast({
                  type: "error",
                  title: "cep não encontrado!"
                });
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
    },
    dialog_ativar: function() {
      this.dialog = true;
      this.idIrmao = this.irmao_dados.id;
      this.cpf = this.irmao_dados.cpf;
      this.data_nascimento = this.irmao_dados.nascimento.substr(0, 10);
      this.nome = this.irmao_dados.nome;
      this.cep = this.irmao_dados.cep;
      this.cidade = this.irmao_dados.cidade;
      this.bairro = this.irmao_dados.bairro;
      this.rua = this.irmao_dados.rua;
      this.numero = this.irmao_dados.numero;
      this.complemento = this.irmao_dados.complemento;
      this.ddd = this.irmao_dados.ddd;
      this.telefone = this.irmao_dados.telefone;
      this.cargo = this.irmao_dados.cargo;
      this.BuscarIgreja();
      this.BuscarIgrejas();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.data_nascimento);
    },
    congregacao: function() {
      //console.log("Id do irmao: ", this.idIrmao);
      //console.log("Id do vinculo: ", this.idVinculoIgreja);
      //console.log("Id da igreja: ", this.idCongregacao);
    }
  },
  methods: {
    EscolherIgreja(idCongregacao) {
      this.idCongregacao = idCongregacao;
      //console.log("igreja: ", this.idCongregacao);
      //console.log("irmao: ", this.idIrmao);
      //console.log("id vinculo: ", this.idVinculoIgreja);
    },
    AtivarEdicao() {
      this.editarDisable = false;
    },
    DesativarEdicao() {
      this.editarDisable = true;
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
        title: "Deseja excluir o irmão " + this.nome + "?",
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
          this.IrmaoDeletar(id);
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
        }
      });
    },
    IrmaoDeletar(item) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        //console.log("Nao autorizado");
      } else if (usuarioAutorize) {
        //console.log("delete o item ", item);
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .delete(this.$url + "Usuario/v1/" + item, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 204) {
              //console.log("Deletado com sucesso, dados:", response.data);
              this.$emit("IrmaoDeletado");
            }
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarIgrejas() {
      this.igrejas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
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
          .get(this.$url + "Igreja/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              response.data.forEach(element => {
                this.igrejas.push({
                  id: element.id,
                  comum:
                    element.cidade +
                    " - " +
                    element.bairro +
                    " - " +
                    element.codigo
                });
              });
              this.busca = false;
            } else if (response.status == 401) {
            }
            //console.log(response.data);
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarIgreja() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      if (!usuarioAutorize) {
        //this.$router.push("/");
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
        this.$http
          .get(
            this.$url + "UsuarioIgreja/v1/usuario-por-id?id=" + this.idIrmao,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              this.idVinculoIgreja = response.data.id;
              this.$http
                .get(this.$url + "Igreja/v1/" + response.data.idIgreja, {
                  headers: {
                    authorization: "Bearer " + this.autorizacao.accessToken
                  }
                })
                .then(response => {
                  ////console.log(response.status);
                  if (response.status == 200) {
                    //console.log("Igreja: ", response.data);
                    this.congregacao =
                      response.data.cidade +
                      " - " +
                      response.data.nomeRelatorio +
                      " - " +
                      response.data.codigo;
                    //console.log(this.congregacao);
                    this.idCongregacao = response.data.id;
                  }
                })
                .catch(e => {
                  //console.error(e.status);
                  //console.data(e.data);
                });
            }
          })
          .catch(e => {
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    SalvarIrmao() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .put(
          this.$url + "Usuario/v1",
          {
            id: this.idIrmao,
            cpf: this.cpf,
            nascimento: this.data_nascimento,
            nome: this.nome,
            cep: this.cep,
            cidade: this.cidade,
            bairro: this.bairro,
            rua: this.rua,
            numero: this.numero,
            complemento: this.complemento,
            ddd: this.ddd,
            telefone: this.telefone,
            cargo: this.cargo,
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
            //console.log("Irmão salvo com sucesso");
            let irmao = response.data;
            swal.fire(
              this.cargo + " atualizado com sucesso!",
              "Irmão " + irmao.nome + " atualizado com sucesso!",
              "success"
            );
            this.$emit("IrmaoAtualizado");
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    VincularIgreja() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .put(
          this.$url + "UsuarioIgreja/v1",
          {
            id: this.idVinculoIgreja,
            idIgreja: this.idCongregacao,
            idUsuario: this.idIrmao,
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
            //console.log("Irmão vinculado a igreja com sucesso");
            this.dialog = false;
            this.$emit("IrmaoAtualizado");
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
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
