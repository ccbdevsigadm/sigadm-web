<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn
        flat
        outline
        dark
        color="blue darken-4"
        @click="LimparCampos(),AtivarSolicitacao()"
        slot="activator"
      >
        <v-icon small>fas fa-file-import</v-icon>
        <span class="pl-2">
          <b>Cadastrar solicitação</b>
        </span>
      </v-btn>      
      <v-card >
        <v-flex xs12 sm12>
          <div class="pt-1">
            <v-btn
              right
              class="white--text"
              small
              fab
              round
              
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
            <span
              class="font-weight-bold headline blue--text text--darken-4"
            >Solicitação de empréstimo de instrumento</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-stepper v-model="e6" vertical class="elevation-0">
            <v-stepper-step :complete="e6 > 1" step="1">
              Dados do irmão a ser atendido
              <small>Nome e comum congregação são obrigatórios</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6>
                    <v-text-field
                      v-model="cpf"
                      
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
                        v-model="computedDateFormattedNascimento"
                        label="Data de nascimento"
                        append-icon="event"
                        readonly
                        color="teal darken-3"
                        hint
                        persistent-hint
                        
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
                      
                      append-icon="fas fa-book"
                      color="blue darken-4"
                      label="Nome do irmão *"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md3>
                    <v-text-field
                      v-model="cep"
                      
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
                      
                      color="blue darken-4"
                      append-icon="fas fa-home"
                      label="Número "
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6>
                    <v-text-field
                      color="blue darken-4"
                      
                      append-icon="fas fa-puzzle-piece"
                      label="Complemento"
                      v-model="complemento"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md2 lg2>
                    <v-text-field
                      color="blue darken-4"
                      
                      append-icon=" fas fa-broadcast-tower"
                      label="DDD"
                      mask="(##)"
                      v-model="ddd"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md4 lg4 class="pl-1">
                    <v-text-field
                      color="blue darken-4"
                      
                      append-icon="fas fa-phone"
                      label="Telefone"
                      mask="# ####-####"
                      v-model="telefone"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 d-flex>
                    <v-flex xs12 sm12 md5 lg5>
                      <v-select color="blue darken-4" v-model="cargo" label="Cargo"  :items="cargos"></v-select>
                    </v-flex>
                    <v-flex xs12 sm12 md7 lg7 class="pl-2">
                      <v-autocomplete                      
                        v-model="congregacao"
                        :items="igrejas"
                        label="Comum congregação *"
                        item-text="comum"
                        item-value="comum"
                        color="blue darken-4"
                        
                        :disabled="comum_obrigatorio"
                        hint="Aperte duas vezes a tecla backspace para apagar"
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
              <v-btn outline  color="primary" @click="e6 = 2" :disabled="dados_obrigatorios_irmao">
                <v-icon small>fas fa-arrow-down</v-icon>
                <span class="pl-2">
                  <b>Continuar</b>
                </span>
              </v-btn>

              <v-btn color="red" outline @click="dialog= false">
                <v-icon small>fas fa-times</v-icon>
                <span class="pl-2">
                  <b>Fechar</b>
                </span>
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Dados da solicitação
              <small>Necessário no mínimo a escolha de um instrumento e a sua característica</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-dialog
                      ref="dialog_dataCadastro_modal"
                      v-model="modal_dataCadastro"
                      :return-value.sync="data_cadastro"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="computedDateFormattedCadastro"
                        label="Data de solicitação"
                        append-icon="event"
                        readonly
                        color="teal darken-3"
                        hint
                        persistent-hint
                        
                      ></v-text-field>
                      <v-date-picker
                        v-model="data_cadastro"
                        scrollable
                        locale="pt-BR"
                        color="blue darken-4"
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal_dataCadastro = false">Cancelar</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.dialog_dataCadastro_modal.save(data_cadastro)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="primeiro_instrumento"
                      :items="instrumentos"
                      label="Instrumento 1ª Opção"
                      item-text="nome"
                      item-value="nome"
                      color="blue darken-4"
                      
                    >
                      <template slot="selection" slot-scope="data">{{ data.item.nome}}</template>
                      <template slot="item" slot-scope="data">
                        <v-flex
                          xs10
                          sm10
                          :key="JSON.stringify(data.item.id)"
                          @click="BuscarCaracteristica(data.item.naipe,1)"
                        >
                          <v-list-tile>
                            <v-list-tile-content>{{data.item.nome}}</v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="primeira_caracteristica"
                      :items="caracteristicas_um"
                      label="Caracteristica/Tonalidade"
                      item-text="caracteristica"
                      item-value="caracteristica"
                      color="blue darken-4"
                      
                    >
                      <template slot="selection" slot-scope="data">{{ data.item.caracteristica}}</template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>{{data.item.caracteristica}}</v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="segundo_instrumento"
                      :items="instrumentos"
                      label="Instrumento 2ª Opção"
                      item-text="nome"
                      item-value="nome"
                      color="blue darken-4"
                      
                    >
                      <template slot="selection" slot-scope="data">{{ data.item.nome}}</template>
                      <template slot="item" slot-scope="data">
                        <v-flex
                          xs10
                          sm10
                          :key="JSON.stringify(data.item.id)"
                          @click="BuscarCaracteristica(data.item.naipe,2)"
                        >
                          <v-list-tile>
                            <v-list-tile-content>{{data.item.nome}}</v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="segunda_caracteristica"
                      :items="caracteristicas_dois"
                      label="Caracteristica/Tonalidade"
                      item-text="caracteristica"
                      item-value="caracteristica"
                      color="blue darken-4"
                      
                    >
                      <template slot="selection" slot-scope="data">{{ data.item.caracteristica}}</template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>{{data.item.caracteristica}}</v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-btn outline color="primary" @click="e6 = 1">
                <v-icon small>fas fa-arrow-up</v-icon>
                <span class="pl-2">
                  <b>voltar</b>
                </span>
              </v-btn>
              <v-btn
                color="green darken-4"
                center
                outline
                class="white--text"
                v-on:click="Salvar()"
                :disabled="dados_obrigatorios_solicitacao"
              >
                <v-icon small>fas fa-save</v-icon>
                <span class="pl-2">
                  <b>salvar Solicitação</b>
                </span>
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
        <v-layout row align-center>
          <v-dialog v-model="loadingCep" width="500">
            <v-card>
              <v-card-title
                class="subheader blue darken-4 white--text"
                primary-title
              >CEP - Endereço</v-card-title>

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
                    <small class="blue--text text--darken-4">Buscando ...</small>
                  </span>
                </v-flex>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import StoreInstrumento from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeInstrumento";

export default {
  data() {
    return {
      irmao_cadastrado: true,
      dados_obrigatorios_irmao: true,
      dados_obrigatorios_solicitacao: true,
      comum_obrigatorio: true,
      e6: 1,
      irmaoNome: "",
      irmao:"",
      irmaos: [],
      primeiro_instrumento: "",
      segundo_instrumento: "",
      instrumentos: [],
      primeira_caracteristica: "",
      segunda_caracteristica: "",
      caracteristicas_um: [],
      caracteristicas_dois: [],
      comumCongregacao: "",
      igrejas: [],
      nome: null,
      dialog: false,
      modal: false,
      busca: false,
      dialog_dataCadastro_modal: null,
      modal_dataCadastro: false,
      data_cadastro: new Date().toISOString().substr(0, 10),
      buscaCaracteristica: false,
      buscaCPF: false,
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
    computedDateFormattedCadastro() {
      return this.formatDate(this.data_cadastro);
    },
    computedDateFormattedNascimento() {
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
              
              if (irmao.id == null) {
                this.irmao_cadastrado = false;                
                this.AlertaMixin(
                  "warning",
                  "Irmão não se encontra cadastrado no sistema",
                  4000
                );
              } else {
                this.irmao = irmao;
                this.$http
                  .get(
                    this.$url +
                      "UsuarioIgreja/v1/usuario-por-id?id=" +
                      irmao.id,
                    {
                      headers: {
                        authorization: "Bearer " + this.autorizacao.accessToken
                      }
                    }
                  )
                  .then(response => {
                    if (response.status == 200) {
                      this.$http
                        .get(
                          this.$url + "Igreja/v1/" + response.data.idIgreja,
                          {
                            headers: {
                              authorization:
                                "Bearer " + this.autorizacao.accessToken
                            }
                          }
                        )
                        .then(response => {
                          if (response.status == 200) {
                            this.irmao_id = irmao.id;
                            this.nome = irmao.nome;
                            this.bairro = irmao.bairro;
                            this.cep = irmao.cep;
                            this.cidade = irmao.cidade;
                            this.complemento = irmao.complemento;
                            this.ddd = irmao.ddd;

                            this.numero = irmao.numero;
                            this.rua = irmao.rua;
                            this.telefone = irmao.telefone;
                            this.cargo = irmao.cargo;
                            this.data_nascimento = irmao.nascimento.substr(
                              0,
                              10
                            );
                            this.congregacao = 
                                response.data.cidade +
                                " - " +
                                response.data.bairro +
                                " - " +
                                response.data.codigo
                           
                          }
                        })
                        .catch(e => {});
                    }
                  })
                  .catch(e => {
                    /*/console.error(e);//console.data(e.data);*/
                  });
              }
            }
          })
          .catch(e => {
            /*console.error(e); //console.data(e.data);*/
          });
      }
    },
    date(val) {
      this.dateFormatted = this.formatDate(
        this.data_cadastro,
        this.data_nascimento
      );
    },
    nome: function() {
      if (this.nome != "") {
        this.comum_obrigatorio = false;
      } else if (this.nome == "") {
        this.AlertaMixin(
          "warning",
          "O campo Nome deve estar preenchido!",
          3000
        );
        this.dados_obrigatorios_irmao = true;
        this.comum_obrigatorio = true;
      }
    },
    congregacao: function() {
      if (this.nome != "" && this.congregacao != null) {
        this.dados_obrigatorios_irmao = false;
      } else if (this.congregacao == null) {
        this.AlertaMixin(
          "warning",
          "O campo Comum congregação deve estar preenchido!",
          3000
        );
        this.dados_obrigatorios_irmao = true;
      }
    },
    primeiro_instrumento: function() {
      if (
        this.primeiro_instrumento != "" &&
        this.primeira_caracteristica != ""
      ) {
        this.dados_obrigatorios_solicitacao = false;
      }
      if (this.primeiro_instrumento == null) {
        this.AlertaMixin(
          "warning", 
          "Os campos instrumento e característica devem  estar preenchidos!",
          3000
        );
        this.dados_obrigatorios_solicitacao = true;
      }
    },
    primeira_caracteristica: function() {
      if (
        this.primeiro_instrumento != "" &&
        this.primeira_caracteristica != ""
      ) {
        this.dados_obrigatorios_solicitacao = false;
      }
      if (this.primeira_caracteristica == null) {
        this.AlertaMixin(
          "warning",
          "Os campos instrumento e característica devem  estar preenchidos!",
          3000
        );
        this.dados_obrigatorios_solicitacao = true;
      }
    },
    cep: function() {
      if (this.cep.length === 8 && this.irmao_cadastrado == false) {
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
    }
  },
  methods: {
    verificarCamposIrmaos() {
      if (dados_obrigatorios_irmao == false) {
        this.AlertaMixin(
          "warning",
          "Verifique os campos Nome e Comum congregação se estar preenchidos!",
          3000
        );
      }
    },
    AtivarSolicitacao() {
      this.BuscarIgrejas();
      this.BuscarInstrumentos();
    },
    Salvar() {
      if(this.irmao_cadastrado == false){        
        this.SalvarIrmao();  
      }else{
        console.log("Cadastrado",this.irmao)
         this.SalvarSolicitacaoEmprestimo(this.irmao.id);
      }         
     
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
            
            this.irmao = response.data;
            console.log("recém cadastrado: ",this.irmao);
            this.SalvarSolicitacaoEmprestimo(this.irmao.id);
            this.VincularIgreja(this.idCongregacao, this.irmao.id);
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
    SelecionarIgreja(igreja) {
      this.comumCongregacao = igreja;
    },
    BuscarIrmao() {
      this.irmaos = [];
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
          .get(this.$url + "Usuario/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              response.data.forEach(element => {
                this.$http
                  .get(
                    this.$url +
                      "UsuarioIgreja/v1/usuario-por-id?id=" +
                      element.id,
                    {
                      headers: {
                        authorization: "Bearer " + this.autorizacao.accessToken
                      }
                    }
                  )
                  .then(response => {
                    ////console.log(response.status);
                    if (response.status == 200) {
                      this.$http
                        .get(
                          this.$url + "Igreja/v1/" + response.data.idIgreja,
                          {
                            headers: {
                              authorization:
                                "Bearer " + this.autorizacao.accessToken
                            }
                          }
                        )
                        .then(response => {
                          ////console.log(response.status);
                          if (response.status == 200) {
                            ////console.log(response.data)

                            this.irmaos.push({
                              nome: element.nome,
                              id_irmao:element.id,
                              cargo: element.cargo,
                              endereco: element.rua + ", " + element.numero,
                              cidade: element.cidade,
                              telefone: element.telefone,
                              congregacao:
                                response.data.codigo +
                                " - " +
                                response.data.bairro +
                                " - " +
                                response.data.cidade,
                              regional: response.data.encRegional,
                              local: response.data.encLocal
                            });
                            this.busca = false;

                            ////console.log(this.igreja);
                          }
                          ////console.log(response.data);
                        })
                        .catch(e => {
                          //console.error(e);
                          //console.data(e.data);
                        });
                    }
                  })
                  .catch(e => {
                    //console.error(e);
                    //console.data(e.data);
                  });
              });
            } else if (response.status == 401) {
              swal.fire(
                "Sua autorização expirou!",
                "Entre com suas credencias novamente.",
                "warning"
              );
              this.$router.push("/");
              const toast = swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });
            }
            ////console.log(response.data);
          })
          .catch(e => {
            swal.fire(
              "Sua autorização expirou!",
              "Entre com suas credencias novamente.",
              "warning"
            );
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
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
      this.nome = null;
      this.comumCongregacao = null;
      this.instrumento = null;
      this.caracteristica = null;
      this.cpf = null;
      this.data_nascimento = null;
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
              this.BuscarInstrumentos();
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
    BuscarInstrumentos() {
      //console.log("Buscando instrumentos");
      this.instrumentos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        cosole.log("Sem autorização");
      } else if (usuarioAutorize) {
        let autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + "NomeInstrumento/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              response.data.forEach(element => {
                this.instrumentos.push({
                  id: element.id,
                  nome: element.nome,
                  naipe: element.naipe
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
    BuscarCaracteristica(naipe, numero) {
      this.buscaCaracteristica = true;
      this.caracteristicas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      if (!usuarioAutorize) {
        cosole.log("Sem autorização");
      } else if (usuarioAutorize) {
        let autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(
            this.$url +
              "CaracteristicaInstrumento/v1/buscar-caracteristica-por-naipe?naipe=" +
              naipe,
            {
              headers: {
                authorization: "Bearer " + autorizacao.accessToken
              }
            }
          )
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              //console.log(response.data.caracteristica);
              if (numero == 1) {
                this.caracteristicas_um = response.data;
                this.buscaCaracteristica = false;
              } else if (numero == 2) {
                this.caracteristicas_dois = response.data;
                this.buscaCaracteristica = false;
              }
            }
          })
          .catch(e => {
            this.buscaCaracteristica = false;
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    SalvarSolicitacaoEmprestimo(id_irmao) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .post(
          this.$url + "SolicitacaoEmprestimo/v1",
          {
            nome: this.nome,
            irmao: id_irmao,
            comumCongregacao: this.congregacao,
            primeiroInstrumento: this.primeiro_instrumento,
            primeiraCategoria: this.primeira_caracteristica,
            segundoInstrumento: this.segundo_instrumento,
            segundaCategoria: this.segunda_caracteristica,
            dataCadastro: this.data_cadastro,
            status: "Aguardando",
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
            //console.log("Solicitação de empréstimo salva com sucesso");
            this.$emit("solicitacaoSalva");
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
