<template>
  <site-patrimonio>
    <div class="mt-4">
      <div class="container-fluid container">
        <div class="block-header align-center">
          <h2 class="font-weight-bold headline teal--text text--darken-3">Cadastro de instrumento</h2>
        </div>

        <v-flex sm12 xs12 md12 lg12 align-center d-flex>
          <span v-if="busca == true">
            <v-progress-circular
              :size="50"
              color="teal darken-3"
              indeterminate
              :width="3"
              class="align-center mt-4 mb-4"
            >
              <v-icon color="teal darken-1">fas fa-file-alt</v-icon>
            </v-progress-circular>
            <br />
            <h4
              class="teal--text text--darken-1"
            >Construindo formulario de cadastro de instrumento...</h4>
          </span>
        </v-flex>
        <!-- Advanced Select -->
        <div class="row clearfix" v-if="busca == false">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
              <div class="body">
                <v-container fluid grid-list-xl>
                  <v-container fluid grid-list-xl>
                    <v-flex xs12 sm12 md12 d-flex>
                      <v-flex xs12 sm12 md6 lg6 class="pr-5">
                        <ativar-edicao @ativar_edicao="SelecionarEdicao"></ativar-edicao>
                      </v-flex>
                      <v-flex xs12 sm12 md4 lg4 offset-md2 class="align-right pl-5">
                        <v-btn outline color="teal darken-4" @click="Home">
                          <small>Voltar para o estoque</small>
                          <v-icon right>fas fa-arrow-left</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-flex>
                  </v-container>
                  <v-layout align-center wrap>
                    <selecao-nome v-if="edicao == true" @instrumento="SelecionarNome"></selecao-nome>
                    <selecao-nome-sem v-if="edicao == false" @instrumento="SelecionarNome"></selecao-nome-sem>
                    <selecao-ano v-if="edicao == true" @ano_instrumento="SelecionarAno"></selecao-ano>
                    <selecao-ano-sem v-if="edicao == false" @ano_instrumento="SelecionarAno"></selecao-ano-sem>
                    <v-flex xs12 sm6 md4 d-flex>
                      <v-select
                        :items="tombamentos"
                        label="Tombamento"
                        box
                        color="teal darken-3"
                        append-icon="fas fa-barcode"
                        v-model="tombamento"
                        :rules="[() => !!tombamento || 'Este campo precisa ser selecionado!']"
                      ></v-select>

                      <cad-tombamento
                        v-show="edicao == true"
                        v-on:tombamentos="AtualizarTombamentos()"
                      ></cad-tombamento>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid grid-list-xl>
                  <v-layout align-center wrap>
                    <v-flex xs12 sm6 md4 d-flex v-if="edicao == false">
                      <v-select
                        :items="caracteristicas"
                        item-value="caracteristica"
                        label="Caracteristica/Tonalidade"
                        append-icon="fas fa-music"
                        box
                        color="teal darken-3"
                        v-model="caracteristica"
                        :rules="[() => !!caracteristica || 'Este campo precisa ser selecionado!']"
                      >
                        <template slot="selection" slot-scope="data">{{ data.item.caracteristica }}</template>
                        <template slot="item" slot-scope="data">
                          <v-flex xs10 sm10>
                            <v-list-tile>
                              <v-list-tile-content>
                                <v-list-tile-title>{{data.item.caracteristica}}</v-list-tile-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-flex>
                        </template>
                      </v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4 d-flex v-if="edicao == true">
                      <v-select
                        :items="caracteristicas"
                        item-value="caracteristica"
                        label="Caracteristica/Tonalidade"
                        append-icon="fas fa-music"
                        box
                        color="teal darken-3"
                        v-model="caracteristica"
                        :rules="[() => !!caracteristica || 'Este campo precisa ser selecionado!']"
                      >
                        <template slot="selection" slot-scope="data">{{ data.item.caracteristica }}</template>
                        <template slot="item" slot-scope="data">
                          <v-flex xs10 sm10>
                            <v-list-tile>
                              <v-list-tile-content>
                                <v-list-tile-title>{{data.item.caracteristica}}</v-list-tile-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-flex>
                          <v-flex xs2 sm2>
                            <v-btn
                              flat
                              icon
                              color="red"
                              @click="DeletarCaracteristica(data.item.id)"
                            >
                              <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                          </v-flex>
                        </template>
                      </v-select>
                      <cad-caracteristica v-on:caracteristicas="AtualizarCaracteristicas(naipe)"></cad-caracteristica>
                    </v-flex>
                    <selecao-marca v-if=" edicao == true" @marca_instrumento="SelecionarMarca"></selecao-marca>
                    <selecao-marca-sem v-if=" edicao == false" @marca_instrumento="SelecionarMarca"></selecao-marca-sem>

                    <selecao-componentes
                      v-if="edicao == true"
                      @componentes_instrumento="SelecionarComponentes"
                    ></selecao-componentes>
                    <selecao-componentes-sem
                      v-if="edicao == false"
                      @componentes_instrumento="SelecionarComponentes"
                    ></selecao-componentes-sem>
                  </v-layout>
                </v-container>
                <v-container fluid grid-list-xl>
                  <v-layout align-center wrap>
                    <v-flex xs12 sm12 md12 d-flex>
                      <v-text-field
                        append-icon="fas fa-eye"
                        v-model="descricao"
                        box
                        color="teal darken-3"
                        :counter="1000"
                        label="Observações"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>

              <v-container fluid grid-list-xl>
                <v-layout align-center wrap>
                  <v-flex xs12 sm12 md6 d-flex>
                    <div class="text-xs-center">
                      <v-btn
                        round
                        :color="cor_doacao"
                        outline
                        @click="PreenchimentoInstrumento('compra'), cor_doacao='teal darken-3', cor_compra='grey lighten-1'"
                      >
                        <v-icon>{{ compra ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        <small>Registrar Compra</small>
                        <v-icon right dark small>fas fa-shopping-cart</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm12 md6 d-flex>
                    <div class="text-xs-center">
                      <v-btn
                        round
                        outline
                        :color="cor_compra"
                        @click="PreenchimentoInstrumento('doacao'), cor_compra='teal darken-3', cor_doacao='grey lighten-1'"
                      >
                        <v-icon>{{ doacao ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        <small>Registrar Doação</small>
                        <v-icon right dark small>fas fa-donate</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <div v-if="compra == true">
                  <v-flex xs12 sm12 md6 lg6 class="ml-3">
                    <ativar-edicao @ativar_edicao="SelecionarEdicao"></ativar-edicao>
                  </v-flex>
                  <cad-compra
                    v-if="edicao == true"
                    v-bind:numero_do_instrumento="tombamento"
                    v-on:cadastrarInstrumentos="CadastrarInstrumento('2')"
                  ></cad-compra>
                  <cad-compra-sem
                    v-if="edicao == false"
                    v-bind:numero_do_instrumento="tombamento"
                    v-on:cadastrarInstrumentos="CadastrarInstrumento('2')"
                  ></cad-compra-sem>
                </div>
                <div v-if="doacao == true">
                  <v-flex xs12 sm12 md6 lg6 class="ml-3">
                    <ativar-edicao @ativar_edicao="SelecionarEdicao"></ativar-edicao>
                  </v-flex>
                  <cad-doacao
                    v-bind:numero_do_instrumento="tombamento"
                    v-on:cadastrarInstrumentos="CadastrarInstrumento('1')"
                  ></cad-doacao>
                </div>
              </v-container>
            </div>
          </div>
        </div>
      </div>
      <!-- #END# Advanced Select -->
    </div>
  </site-patrimonio>
</template>

<script type="text/babel">
import AcessoBotao from "@/pages/Modulos/Patrimonio/Instrumento/Inicio/AcessoBotao";
import SitePatrimonio from "@/templates/SitePatrimonio";
import CadCaracteristica from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Caracteristica";
import CadTombamento from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Tombamento";
import CadDoacao from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Cadastro/CadDoacao";
import CadDoacaoSem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Cadastro/CadDoacao_sem";
import CadCompra from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Compra/Cadastro/Cadastro_Compra";
import CadCompraSem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Compra/Cadastro/Cadastro_Compra_sem";
import SelecaoNome from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Nome";
import SelecaoNomeSem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Nome_sem";
import SelecaoAno from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Ano";
import SelecaoAnoSem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Ano_sem";
import SelecaoMarca from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Marca";
import SelecaoMarcaSem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Marca_sem";
import SelecaoComponentes from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Componentes";
import SelecaoComponentesSem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Selecao/Selecao_Componentes_sem";
import SelecaoOrigem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Origem/CadastroOrigem";
import AtivarEdicao from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Acoes/Adicionar";
import swal from "sweetalert2";

export default {
  name: "Cadastro",
  components: {
    AcessoBotao,
    SitePatrimonio,
    CadCaracteristica,
    CadTombamento,
    CadDoacao,
    CadDoacaoSem,
    CadCompra,
    CadCompraSem,
    SelecaoNome,
    SelecaoNomeSem,
    SelecaoAno,
    SelecaoAnoSem,
    SelecaoMarca,
    SelecaoMarcaSem,
    SelecaoComponentes,
    SelecaoComponentesSem,
    SelecaoOrigem,
    AtivarEdicao
  },
  data() {
    return {
      valid: false,
      tombamentos: [],
      tombamentos_id: [],
      caracteristicas: [],
      componentes_sel: [],
      componentes: [],
      nome: "",
      ano: "",
      tombamento: "",
      administracao: "",
      caracteristica: "",
      marca: "",
      descricao: "",
      aquisicao: "",
      autorizacao: false,
      link: [],
      compra: false,
      cor_compra: "",
      doacao: false,
      cor_doacao: "",
      menu: false,
      modal: false,
      menu2: false,
      id_tombamento_selecao: "",
      numero_tombamento_selecao: "",
      launch_date_tombamento_selecao: "",
      naipe: "",
      idNomeInstrumento: "",
      edicao: false,
      busca: true,
      items: [
        {
          text: "ESTOQUE",
          disabled: false,
          href: "/inicio-patrimonio",
          color: "purple"
        },
        {
          text: "CADASTRO DE INSTRUMENTOS",
          disabled: true,
          href: "#"
        }
      ]
    };
  },
  created() {
    this.AtualizarTudo();
    const toast = swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000
    });
    toast({
      type: "success",
      title: "Cadastro de instrumento."
    });
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_compra, this.data_doacao);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_compra, this.data_doacao);
    }
  },

  methods: {
    Home() {
      this.$router.push("/inicio-patrimonio");
    },
    mostrarTombamento() {
      //console.log(this.tombamento);
    },
    SelecionarEdicao(payload) {
      //console.log(this.edicao);
      this.edicao = payload.ativar;
    },
    SelecionarNome(payload) {
      this.caracteristicas = [];
      //console.log("antes: ", this.idNomeInstrumento);
      this.idNomeInstrumento = payload.idNomeInstrumento;
      //console.log("depois: ", this.idNomeInstrumento);
      this.BuscarNome(this.idNomeInstrumento);
      this.edicao = false;
    },
    SelecionarAno(payload) {
      //console.log("antes: ", this.ano);
      this.ano = payload.ano;
      //console.log("depois: ", this.ano);
    },
    SelecionarMarca(payload) {
      //console.log("antes: ", this.marca);
      this.marca = payload.marca;
      //console.log("depois: ", this.marca);
    },
    SelecionarComponentes(payload) {
      //console.log("antes: ", this.componentes_sel);
      this.componentes_sel = payload.componentes;
      //console.log("depois: ", this.componentes_sel);
    },
    Compra() {
      this.compra = true;
    },
    Doacao() {
      this.doacao = true;
    },
    PreenchimentoInstrumento(aquisicao) {
      //console.log("preenchimento");
      //console.log(this.componentes_sel.toString());
      //console.log("compra antes", this.compra);
      //console.log("doacao antes", this.doacao);
      if (
        this.nome == "" ||
        this.caracteristica == "" ||
        this.ano == "" ||
        this.tombamento == "" ||
        this.marca == "" ||
        this.componentes_sel.toString() == ""
      ) {
        swal.fire({
          type: "warning",
          title:
            "Atenção verifique os dados antes de prosseguir para " + aquisicao,
          text: "Todas as informações estão selecionadas corretamente?"
        });
      } else {
        this.valid == true;
        if (aquisicao == "compra") {
          this.compra = true;
          this.doacao = false;
          //console.log("compra ", this.compra);
          //console.log("doacao ", this.doacao);
        } else if (aquisicao == "doacao") {
          this.doacao = true;
          this.compra = false;
          //console.log("compra ", this.compra);
          //console.log("doacao ", this.doacao);
        }
      }
    },
    CadastrarInstrumento(tipo_aquisicao) {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        if (
          this.nome == "" ||
          this.caracteristica == "" ||
          this.ano == "" ||
          this.tombamento == "" ||
          this.marca == "" ||
          this.componentes_sel.toString() == ""
        ) {
          swal.fire({
            type: "warning",
            title: "Oops, verifique...",
            text: "Tem algum campo obrigatório que ainda pode estar em branco!"
          });
        } else {
          //console.log(this.componentes.toString());
          //console.log("entrou no cadastro");
          swal.fire({
            onBeforeOpen: () => {
              swal.showLoading();
            },
            type: "success",
            title: "Estamos salvando o " + this.nome + "...",
            text: "Só um momento",
            showConfirmButton: false,
            timer: 10000
          });
          this.$http
            .post(
              this.$url + "Instrumento/v1",
              {
                id: 0,
                nome: this.nome,
                ano: this.ano,
                status: "1",
                aquisicao: tipo_aquisicao,
                tombamento: this.tombamento,
                componentes: this.componentes_sel.toString(),
                caracteristica: this.caracteristica,
                marca: this.marca,
                descricao: this.descricao,
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
                //console.log("data value tombamento", response.data.tombamento);
                this.BuscarTombamento(response.data.tombamento);
                this.ContinuarCadastro();
              }
              //console.log(response.data);
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
          //console.log(this.data_doacao,this.origem_instrumento,this.observacao_instrumento );
        }
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    BuscarTombamento(tombamento) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(
          this.$url +
            "TombamentoInstrumento/v1/buscar-tombamento?tombamento=" +
            tombamento,
          {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          }
        )
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log( "Buscando um numero de tombamento para modifica-lo",  response.data  );
            this.MudarStatusTombamento(
              response.data.id,
              response.data.numero,
              response.data.launchDate
            );
          } else if (response.status == 401) {
          }
          //console.log(response.data);
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
    },
    MudarStatusTombamento(id, numero, launch_date) {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);

        //console.log("entrou no update tombamento");
        //console.log(id, "-", numero, "-", launch_date);
        this.$http
          .put(
            this.$url +
              "TombamentoInstrumento/v1/selecionar-tombamento?tombamento=" +
              numero,
            {
              id: id,
              numero: numero,
              status: "2",
              launchDate: launch_date
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
              //console.log("Salvo com sucesso!");
              //console.log(response.data);
            }
            //console.log(response.data);
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
    AtualizarTombamentos() {
      this.tombamentos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "TombamentoInstrumento/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            response.data.forEach(element => {
              //console.log("Pós cadastro", element.nome);
              if (element.status == 1) {
                this.tombamentos.push(element.numero);
                this.tombamentos_id.push(element.id);
              }
            });
            //console.log(response.data);
          } else if (response.status == 401) {
          }
          //console.log(response.data);
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
    },

    DeletarCaracteristica(caracteristica, instrumento) {
      swal
        .fire({
          title: "Deseja excluir a caracteristica " + caracteristica + "?",
          text: "Após a confirmação esta ação não poderá ser revertida!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar"
        })
        .then(result => {
          if (result.value) {
            this.Deletar(caracteristica, instrumento);
            swal.fire(
              "Deletado!",
              "A caracteristica " +
                caracteristica +
                " foi deletado com sucesso.",
              "success"
            );
          }
        });
    },
    Deletar(id) {
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
          .delete(this.$url + "CaracteristicaInstrumento/v1/" + id, {
            headers: {
              authorization: "Bearer " + this.autorizacao.accessToken
            }
          })
          .then(response => {
            //console.log(response.status);
            //console.log("deletando caracteristica");
            if (response.status == 204) {
              //console.log("dados da caracteristica pos deletar");
              //console.log(response.data);
              //console.log(this.nome);
              this.AtualizarCaracteristicas(this.naipe);
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
    BuscarNome(id) {
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "NomeInstrumento/v1/" + id, {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            this.nomeInstrumento = response.data;
            //console.log((this.naipe = this.nomeInstrumento.naipe));
            //console.log((this.nome = this.nomeInstrumento.nome));
            this.AtualizarCaracteristicas(this.naipe);
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
    },
    AtualizarCaracteristicas(nome) {
      //console.log("nome para buscar caracteristica: " + nome);
      this.caracteristica = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(
          this.$url +
            "CaracteristicaInstrumento/v1/buscar-caracteristica-por-naipe?naipe=" +
            nome,
          {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          }
        )
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            this.caracteristicas = response.data;
            //console.log(response.data);
          } else if (response.status == 401) {
          }
          //console.log(response.data);
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
            //console.log(response.data);
            this.busca = false;
          } else if (response.status == 401) {
          }
          //console.log(response.data);
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
    },
    AtualizarTudo() {
      this.AtualizarTombamentos();
      this.AtualizarComponentes();
    },
    ContinuarCadastro() {
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: "btn  btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: true
      });

      return swalWithBootstrapButtons({
        title:
          "Tombamento: " +
          this.tombamento +
          ", " +
          this.nome +
          " cadastrado com sucesso!",
        text: "Deseja continuar cadastrando?",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.$router.push("/cadastro-patrimonio-instrumento");
          this.AtualizarTudo();
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          this.$router.push("/inicio-patrimonio");
        }
      });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
