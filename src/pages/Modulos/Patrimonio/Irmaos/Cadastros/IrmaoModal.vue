<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn
        flat
        outline
        color="blue darken-4"
        @click="BuscarIgrejas(), LimparCampos()"
        slot="activator"
      >
        <v-icon>fas fa-user-plus</v-icon>
        <span class="pl-2">
          <b>Cadastrar irmão</b>
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
              v-on:click="dialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span class="font-weight-bold headline blue--text text--darken-4">Cadastrar irmão</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md6>
                <v-text-field
                  v-model="cpf"
                  box
                  append-icon="fas fa-book"
                  color="blue darken-4"
                  label="CPF do irmão"
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
                  append-icon="fas fa-book"
                  color="blue darken-4"
                  label="Nome do irmão *"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="cep"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-envelope-open"
                  label="Cep *"
                  required
                  mask="##.###-###"
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
                  :readonly="enderecoDisable"
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
                  :readonly="enderecoDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-text-field
                  v-model="rua"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-map-marked-alt"
                  label="Rua *"
                  required
                  :readonly="enderecoDisable"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-model="numero"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-home"
                  label="Número "
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md6 lg6>
                <v-text-field
                  color="blue darken-4"
                  box
                  append-icon="fas fa-puzzle-piece"
                  label="Complemento"
                  v-model="complemento"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md2 lg2>
                <v-text-field
                  color="blue darken-4"
                  box
                  append-icon=" fas fa-broadcast-tower"
                  label="DDD"
                  mask="(##)"
                  v-model="ddd"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 class="pl-1">
                <v-text-field
                  color="blue darken-4"
                  box
                  append-icon="fas fa-phone"
                  label="Telefone"
                  mask="# ####-####"
                  v-model="telefone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 d-flex>
                <v-flex xs12 sm12 md5 lg5>
                  <v-select v-model="cargo" label="Cargo" box :items="cargos"></v-select>
                </v-flex>
                <v-flex xs12 sm12 md7 lg7 class="pl-2">
                  <v-autocomplete
                    v-model="congregacao"
                    :items="igrejas"
                    label="Comum congregação"
                    item-text="comum"
                    item-value="comum"
                    color="blue darken-4"
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
              :disabled="disabled"
              v-on:click="SalvarIrmao()"
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

export default {
  data() {
    return {
      disabled:true,
      cpf: null,
      dialog_nascimento_modal: false,
      data_nascimento: null,
      nome: null,
      rua: null,
      complemento: null,
      ddd: null,
      telefone: null,
      congregacao: null,
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
      cepValido: true,
      enderecoDisable: true,
      mask_cod_igreja: "BR-##-####",
      regionais: [],
      encLocais: [],
      loadingCep: false,
      igrejas: [],
      cargos: [
        "Aluno",
        "Músico",
        "Instrutor",
        "Encarregado Local",
        "Encarregado Regional"
      ],
      cargo: null,
      vincular: false,
      idCongregacao: null
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_nascimento);
    }
  },
  watch: {
    cpf: function() {
      if (this.cpf.length == 11) {
        let usuarioAutorize = sessionStorage.getItem("usuario");
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(this.$url + "Usuario/v1/" + this.cpf, {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            if (response.status == 200) {
              let irmao = response.data;              
              if (irmao.id != null) {
                this.irmao_cadastrado = false;                
                this.AlertaMixin(
                  "warning",
                  "Irmão já se encontra cadastrado no sistema",
                  4000
                );
                this.disabled = true;
              } else{
                this.disabled = false;
              }
            }
          })
          .catch(e => {
            /*console.error(e); //console.data(e.data);*/
          });
      }
    },
    congregacao: function() {
      //console.log(this.congregacao);
    },
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
              if (this.dados.uf == "RN") {
                this.cod_igreja = "BR-17";
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
    date(val) {
      this.dateFormatted = this.formatDate(this.data_nascimento);
    }
  },
  methods: {
    AlertaMixin(type, title, time) {
      const Toast = swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: time
      });

      Toast.fire({
        type: type,
        title: title
      });
    },
    LimparCampos() {
      this.cpf = null;
      this.data_nascimento = null;
      this.nome = null;
      this.cep = null;
      this.rua = null;
      this.cidade = null;
      this.bairro = null;
      this.numero = null;
      this.complemento = null;
      this.ddd = null;
      this.telefone = null;
      this.cargo = null;
      this.congregacao = null;
    },
    EscolherRegional(regional) {
      this.regional = regional;
    },
    EscolherEncLocal(local) {
      this.local = local;
    },
    EscolherIgreja(idCongregacao) {
      this.idCongregacao = idCongregacao;
    },
    BuscarIgrejas() {
      this.igrejas = [];
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
        this.busca = true;
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
    SalvarIrmao() {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      if (this.cpf == null) {
        this.cpf = "00000000000";
      }
      this.$http
        .post(
          this.$url + "Usuario/v1",
          {
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
              this.cargo + " salvo com sucesso!",
              "Irmão " + irmao.nome + " salvo com sucesso!",
              "success"
            );
            this.VincularIgreja(this.idCongregacao, irmao.id);
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    VincularIgreja(idIgreja, idIrmao) {
      //console.log(idIgreja)
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .post(
          this.$url + "UsuarioIgreja/v1",
          {
            idIgreja: idIgreja,
            idUsuario: idIrmao,
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
            this.$emit("irmao");
          }
          //console.log(response.data);
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
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
