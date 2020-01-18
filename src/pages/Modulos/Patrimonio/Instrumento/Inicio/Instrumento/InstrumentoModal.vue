<template>
  <v-layout row justify-center xs12>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn slot="activator" round outline color="blue darken-3" dark>
        <small>detalhes</small>
        <v-icon right small>fas fa-info</v-icon>
      </v-btn>
      <v-flex xs12 sm12>
        <v-card>
          <v-card color="white lighten-2" class="white--text">
            <v-toolbar color="teal lighten-2" height="90">
              <v-flex xs12 sm12 md12 lg12 align-center class="pt-3">
                <v-toolbar-title>
                  <v-avatar size="50px" class="white">
                    <v-img :src="url" alt="Avatar" max-height="150" contain></v-img>
                  </v-avatar>
                  <p class="white--text">{{nome_instrumento}} - {{tombamento_instrumento}}</p>
                </v-toolbar-title>
              </v-flex>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                  right
                  class="white--text"
                  small
                  fab
                  @click="fechar"
                  round
                  color="red darken-4"
                  absolute
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
          </v-card>

          <v-card-title primary-title>
            <v-flex xs12 sm12 md12 lg12>
              <div class="headline font-weight-light align-center teal--text text--darken-3">Ficha</div>
              <p class="align-center teal--text text--darken-3">Bem Patrimonial</p>
              <v-divider></v-divider>
            </v-flex>
           
            <v-container fill-height row>
              <v-flex xs12 sm12 md4 lg4 align-center>
                <v-avatar size="200" color="grey lighten-4">
                  <v-flex xs12 sm4 md4 lg4>
                    <v-layout column>
                      <v-flex xs12 sm12 md12 lg12 align-center>
                        <v-avatar>
                          <v-icon color="orange darken-3">fas fa-guitar</v-icon>
                        </v-avatar>
                      </v-flex>
                      <div
                        class="body-1 font-weight-light text-md-center teal--text text--darken-3"
                      >Nome</div>
                      <div
                        class="text-uppercase font-weight-light text-md-center"
                      >{{nome_instrumento}}</div>
                    </v-layout>
                  </v-flex>
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 align-center>
                <v-avatar size="200" color="blue-grey lighten-5">
                  <v-flex xs12 sm4 md4 lg4>
                    <v-layout column>
                      <v-flex xs12 sm12 md12 lg12 align-center>
                        <v-avatar>
                          <v-icon color="blue darken-3">fas fa-calendar-check</v-icon>
                        </v-avatar>
                      </v-flex>
                      <div
                        class="body-1 font-weight-light align-center teal--text text--darken-3"
                      >Ano</div>
                      <div class="text-uppercase font-weight-light align-center">{{ano_instrumento}}</div>
                    </v-layout>
                  </v-flex>
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 align-center>
                <v-avatar size="200" color="grey lighten-4">
                  <v-flex xs12 sm4 dm4 lg4>
                    <v-flex xs12 sm12 md12 lg12 align-center>
                      <v-avatar>
                        <v-icon color="blue-grey lighten-3">fas fa-marker</v-icon>
                      </v-avatar>
                    </v-flex>
                    <v-layout column>
                      <div
                        class="body-1 font-weight-light text-md-center teal--text text--darken-3"
                      >Marca</div>
                      <div
                        class="text-uppercase font-weight-light text-md-center"
                      >{{marca_instrumento}}</div>
                    </v-layout>
                  </v-flex>
                </v-avatar>
              </v-flex>
            </v-container>
            <v-container fill-height row>
              <v-flex xs12 sm12 md4 lg4 align-center>
                <v-avatar size="200" color="blue-grey lighten-5">
                  <v-flex xs12 sm4 md4 lg4>
                    <v-layout column>
                      <v-flex xs12 sm12 md12 lg12 align-center>
                        <v-avatar>
                          <v-icon color="black darken-3">fas fa-music</v-icon>
                        </v-avatar>
                      </v-flex>
                      <div
                        class="body-1 font-weight-light text-md-center teal--text text--darken-3"
                      >Caracteristica Tonalidade</div>
                      <div
                        class="text-uppercase font-weight-light text-md-center"
                      >{{caracteristica_instrumento}}</div>
                    </v-layout>
                  </v-flex>
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 align-center>
                <v-avatar size="200" color="grey lighten-4">
                  <v-flex xs12 sm4 md4 lg4>
                    <v-layout column>
                      <v-flex xs12 sm12 md12 lg12 align-center>
                        <v-avatar>
                          <v-icon color="green darken-3">fas fa-barcode</v-icon>
                        </v-avatar>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <div
                          class="body-1 font-weight-light align-center teal--text text--darken-3"
                        >Tombamento</div>
                        <div
                          class="text-uppercase font-weight-light align-center"
                        >{{tombamento_instrumento}}</div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm12 md4 lg4 align-center>
                <v-menu
                  v-model="showMenu"
                  absolute
                  offset-y
                  style="max-width: 600px"
                  origin="center center"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on }">
                    <v-avatar size="200" color="blue-grey lighten-5" v-on="on">
                      <v-flex xs12 sm4 md4 lg4>
                        <v-layout column justify-end>
                          <v-flex xs12 sm4>
                            <v-flex xs12 sm12 md12 lg12 align-center>
                              <v-avatar>
                                <v-icon color="brown darken-1" class="mt-5">far fa-list-alt</v-icon>
                              </v-avatar>
                            </v-flex>
                            <div
                              class="body-1 font-weight-light align-center mt-4 teal--text text--darken-3"
                            >Componentes</div>
                            <v-btn flat small right center @click="listaComponente()" class="mb-3">
                              <small>
                                visualizar
                                <v-icon small right>fas fa-eye</v-icon>
                              </small>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-avatar>
                  </template>

                  <v-list>
                    <v-list-tile>
                      <v-flex xs12 sm12 md12 lg12 align-center>
                        <p class="text-uppercase teal--text text--darken-3">detalhes</p>
                        <v-divider></v-divider>
                      </v-flex>
                    </v-list-tile>
                    <v-list-tile v-for="(item) in componentes" :key="item">
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-container>
          </v-card-title>
          <v-card-actions class="align-center">
            <v-flex xs12 sm12 md12 lg12 align-center>
              <v-btn
                class="ml-4"
                center
                round
                outline
                color="teal darken-3"
                right
                @click="show = !show, BuscarEmprestimos(tombamento_instrumento)"
              >
                {{ show ? 'Ocultar' : 'Mostrar' }} Histórico
                <v-icon right>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-flex>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show" class="py-0 align-center">
              <v-flex sm12 md12 xs12 lg12>
                <p class="subheading align-center">Histórico</p>
              </v-flex>
              <v-divider></v-divider>
              <v-timeline>
                <v-timeline-item
                  v-show="item.status == '2'"
                  v-for="(item, i) in emprestimos"
                  :key="i.id"
                  color="red accent-4"
                  icon="close"
                  large
                >
                  <template v-slot:opposite>
                    <span>Data do Empréstimo {{formatDate(item.emprestimoDate.substr(0, 10))}}</span>
                  </template>
                  <v-card class="elevation-2 white--text" color="red darken-2">
                    <v-flex xms12 sm12 md12 lg12 align-center class="pt-3">
                      <v-avatar size="50px" class="white">
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                      </v-avatar>
                      <p class="headline">{{item.nome}}</p>
                    </v-flex>
                    <v-card-text>
                      <v-flex xs12 sm12 md12 lg12 class="align-left">
                        <span>
                          <p>
                            Comum congregação
                            <br>
                            {{item.congregacao}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left">
                        <span>
                          <p>
                            Encarregado Regional
                            <br>
                            {{item.encarregadoRegional}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left">
                        <span>
                          <p>
                            Encarregado Local
                            <br>
                            {{item.encarregado}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left" v-if="item.observacoes != ''">
                        <v-flex xs12 sm12 md12 lg12 class="align-left">
                          <span>
                            <p>
                              Observações
                              <br>
                              {{item.observacoes}}
                            </p>
                          </span>
                        </v-flex>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left" v-if="item.status == 3">
                        <span>
                          <p>
                            Data da devolução
                            <br>
                            {{formatDate(item.devolucaoDate.substr(0, 10))}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left" v-if="item.status == 2">
                        <span>
                          <p>
                            Data devolução
                            <br>
                            <span class="white--text">EMPRESTIMO EM ABERTO</span>
                          </p>
                        </span>
                      </v-flex>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item
                  v-show="item.status == '3'"
                  v-for="(item, i) in emprestimos"
                  :key="i.id"
                  color="green accent-4"
                  icon="done"
                  large
                >
                  <template v-slot:opposite>
                    <span>Data de Empréstimo {{formatDate(item.emprestimoDate.substr(0, 10))}}</span>
                  </template>
                  <v-card class="elevation-2" color="green darken-2">
                   <v-flex xms12 sm12 md12 lg12 align-center class="pt-3">
                      <v-avatar size="50px" class="white">
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                      </v-avatar>
                      <p class="headline">{{item.nome}}</p>
                    </v-flex>
                    <v-card-text>
                      <v-flex xs12 sm12 md12 lg12 class="align-left">
                        <span>
                          <p>
                            Comum congregação
                            <br>
                            {{item.congregacao}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left">
                        <span>
                          <p>
                            Encarregado Regional
                            <br>
                            {{item.encarregadoRegional}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left">
                        <span>
                          <p>
                            Encarregado Local
                            <br>
                            {{item.encarregado}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left" v-if="item.status == 3">
                        <span>
                          <p>
                            Data devolução
                            <br>
                            {{formatDate(item.devolucaoDate.substr(0, 10))}}
                          </p>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 class="align-left" v-if="item.status == 2">
                        <span>
                          <p>
                            Data devolução
                            <br>
                            <span class="red--text">EMPRESTIMO EM ABERTO</span>
                          </p>
                        </span>
                      </v-flex>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
        <v-card color="white lighten-2" class="white--text">
          <v-toolbar color="teal lighten-2" height="90">
            <v-flex xs12 sm12 md12 lg12 align-center class="pt-3">
              <v-toolbar-title>
                <v-avatar size="50px" class="white">
                  <v-img :src="url" alt="Avatar" max-height="150" contain></v-img>
                </v-avatar>
                <p class="white--text">{{nome_instrumento}} - {{tombamento_instrumento}}</p>
              </v-toolbar-title>
            </v-flex>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn
                right
                class="white--text"
                small
                fab
                @click="fechar"
                round
                color="red darken-1"
                absolute
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import PdfView from "@/pages/Modulos/Patrimonio/Instrumento/Inicio/PDF";

export default {
  data: () => ({
    dialog: false,
    show: false,
    showMenu: false,
    url: "",
    emprestimos: [],
    o_emprestimo: [{ id: 1, nome: "joel" }, { id: 2, nome: "maykon" }],
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-star"
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant"
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon"
      },
      {
        color: "indigo",
        icon: "mdi-buffer"
      }
    ],
    componentes: []
  }),
  components:{PdfView},
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_emprestimo);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_emprestimo);
    }
  },
  props: [
    "tombamento_instrumento",
    "nome_instrumento",
    "ano_instrumento",
    "marca_instrumento",
    "caracteristica_instrumento",
    "componentes_instrumento",
    "status_instrumento"
  ],
  created() {
    this.url = "static/images/" + this.nome_instrumento + ".png";
  },
  methods: {
    listaComponente() {
      //console.log(this.componentes_instrumento);
      //console.log(this.componentes);
      var result = this.componentes_instrumento.split(",");
      this.componentes = [];
      result.forEach(element => {
        //console.log(element);
        this.componentes.push(element);
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    fechar() {
      this.dialog = false;
    },
    BuscarEmprestimos(tombamento) {
      this.emprestimos = [];
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
          .get(
            this.$url +
              "EmprestimoInstrumento/v1/buscar-emprestimo?tombamento=" +
              tombamento,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              this.emprestimos = response.data;
              this.emprestimos = this.emprestimos.reverse();
            } else if (response.status == 401) {
              this.$router.push("/");
            }
            ////console.log(response.data);
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
  }
};
</script>
<style type="text/css">
div.fixar {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

