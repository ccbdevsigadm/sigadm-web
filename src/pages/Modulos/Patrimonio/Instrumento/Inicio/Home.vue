<template>
  <site-patrimonio>
    <div class="block-header align-center pt-4">
      <h2
        class="font-weight-bold headline light-blue--text text--darken-4 upper-case"
      >
        ESTOQUE DE INSTRUMENTOS
      </h2>
    </div>
    <!-- Exportable Table -->
    <!--
    ACESSO PDF E IMAGEM
    <v-btn @click="BuscarTermo">PDF</v-btn>
    <v-btn @click="BuscarImagem">IMAGEM</v-btn>
    <v-avatar size="36px">
      <img :src="imagem" alt="Avatar">
    </v-avatar>
  
     <div class="text-xs-center">
    <v-dialog
      v-model="dialogPdf"
      width="800"
    >
      <template v-slot:activator="{ on }" >
        <v-btn
          color="teal lighten-2"
          class="mb-4"
          dark
          outline
          v-on="on"
          @click="BuscarTermo"
        >
         Ver PDF
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          TERMO DA DOAÇÃO
        </v-card-title>

        <v-card-text>
           <pdf-view :pdfArquivo="pdfTermo"></pdf-view>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outline=""
            @click="dialogPdf = false"
          >
            FECHAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    -->

    <v-card>
      <v-flex xs12 sm12 md12 lg12 d-flex>
        <v-flex xs4 sm4 md6 lg3 v-if="busca == false" class="pt-5 pl-4">
          <v-hover>
            <v-text-field
              v-model="procurar"
              append-icon="search"
              box
              label="Buscar instrumento ..."
              class="text--pink"
              color="light-blue darken-4"
              hide-details
            ></v-text-field>
          </v-hover>
        </v-flex>
        <v-flex
          xs6
          sm6
          md4
          lg4
          offset-md5
          align-center
          class="pt-5 pl-4"
          v-if="busca == false"
        >
          <cad-instrumento @instrumentos="BuscarInstrumentos"></cad-instrumento>
        </v-flex>
      </v-flex>
      <v-layout row align-center>
        <v-dialog v-model="busca" max-width="350" persistent>
          <v-card>
            <v-card-title class="headline light-blue darken-4 white--text">
              <v-flex align-center class="white--text text--darken-4">
                ESTOQUE |
                <span class="grey--text text--lighten-1"
                  >INSTRUMENTOS</span
                ></v-flex
              >
            </v-card-title>
            <v-card-text>
              <v-flex sm12 xs12 md12 lg12 align-center d-flex>
                <span>
                  <v-progress-circular
                    :size="50"
                    :width="3"
                    color="light-blue darken-4"
                    indeterminate
                  >
                    <v-icon color="light-blue darken-4"
                      >fas fa-layer-group</v-icon
                    >
                  </v-progress-circular>
                  <br />
                  <h5 class="light-blue--text text--darken-4">
                    Esperando informações ...
                  </h5>
                </span>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-data-table
        class="mt-5"
        :search="procurar"
        :headers="headers"
        v-if="busca == false"
        :items="instrumentos"
        :item-key="instrumentos.id"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <tr
            style="cursor:pointer;"
            @click="
              (dialog = true),
                BuscarEmprestimos(props.item.tombamento),
                DadosInstrumento(
                  props.item.nome,
                  props.item.ano,
                  props.item.tombamento,
                  props.item.caracteristica,
                  props.item.marca,
                  props.item.componentes,
                  props.item.aquisicao
                )
            "
          >
            <td>
              <span
                class="green--text text--darken-3"
                v-if="props.item.status == '1'"
                >{{ props.item.tombamento }}</span
              >
              <span
                class="red--text text--darken-3"
                v-if="props.item.status == '2'"
                >{{ props.item.tombamento }}</span
              >
            </td>
            <td>{{ props.item.nome }}</td>
            <td>{{ props.item.caracteristica }}</td>
            <td>
              <span class="center-block" v-if="props.item.status == '1'">
                <v-btn
                  flat
                  color="green darken-2"
                  @click="InformarComoEmprestar()"
                  ><small>Disponível</small></v-btn
                >
              </span>
              <span v-if="props.item.status == '2'">
                <devolucao-modal
                  v-bind:numero_do_tombamento_devolucao="props.item.tombamento"
                  v-bind:numero_do_instrumento_devolucao="props.item.id"
                  v-on:devolucao_atualizar="BuscarInstrumentos()"
                ></devolucao-modal>
              </span>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      scrollable
      width="800"
    >
      <v-card tile>
        <v-toolbar
          card  
          color="white"
          @click="(dialog = false), (buscaAquisicao = true)"
        >
         
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            fab
            small
            @click="(dialog = false), (buscaAquisicao = true)"
          >
            <v-icon color="white">close</v-icon>
          </v-btn>
          <!--v-menu bottom right offset-y>
              <template v-slot:activator="{ on }">
                <v-btn dark icon v-on="on">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile v-for="(item, i) in 4" :key="i" @click="">
                  <v-list-tile-title>Dados dados</v-list-tile-title>
                </v-list-tile>
              </v-list>
          </v-menu-->
        </v-toolbar>
        <v-layout wrap>
       
            <v-card-title>
              <v-flex xs12 sm12 md12 lg12 align-center class="pb-2">
            <span class=" font-weight-bold headline blue--text text--darken-4"
              >Informações  {{ nome }} {{ tombamento }} </span
            >
          </v-flex>
             
            
              
                  <v-flex sm4 md4 lg4>
                <v-text-field
                  v-model="ano"
                  label="Ano de fabricação "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
                  <v-flex sm4 md4 lg4>
                <v-text-field
                  v-model="marca"
                  class="pl-2"
                  label="Marca do instrumento "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
                  <v-flex sm4 md4 lg4>
                <v-text-field
                  v-model="caracteristicas"
                  class="pl-2"
                  label="Caracteristica/Tonalidade "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
                  <v-flex sm12 md12 lg12>
                <v-text-field
                  v-model="componentes"
                  
                  label="Componentes do instrumento "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
          
              <v-flex xs12 sm12 md12 lg12 align-center class="pb-2">
            <span class="font-weight-bold headline blue--text text--darken-4" v-if="aquisicao == 1"
              >Informações sobre a doação </span
            >
        
            <span class="font-weight-bold headline blue--text text--darken-4" v-if="aquisicao == 2"
              >Informações  sobre a compra </span
            >
          </v-flex>
            <v-flex sm12 md6 lg6  v-if="aquisicao == 1">
                <v-text-field               
                  v-model="data_doacao"
                  label="Data da doação "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
                </v-flex>
                 <v-flex sm12 md6 lg6  v-if="aquisicao == 1" >
                    <v-text-field
                    class="pl-2"
                  v-model="origem_doacao"
                  label="Origem da doação "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
                 </v-flex>
                  <v-flex sm12 md12 lg12  v-if="aquisicao == 1">
                    <v-text-field              
                  v-model="obs_doacao"
                  label="Observações"
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
                 </v-flex>
                <v-flex sm12 md4 lg4  v-if="aquisicao == 2">
                <v-text-field              
                  v-model="data_compra"
                  label="Data da compra "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
               <v-flex sm12 md4 lg4  v-if="aquisicao == 2">
                <v-text-field              
                  v-model="valor_compra"
                   class="pl-2"
                  label="Valor da compra "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
              <v-flex sm12 md4 lg4  v-if="aquisicao == 2">
                <v-text-field              
                  v-model="nota_fiscal_compra"
                   class="pl-2"
                  label="Nota fiscal da compra "
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
               <v-flex sm12 md12 lg12  v-if="aquisicao == 2">
                <v-text-field              
                  v-model="empresa_compra"
                  label="Empresa"
                  append-icon="event"
                  :readonly="true"
                  color="blue darken-3"
                  box
                ></v-text-field>
              </v-flex>
            </v-card-title>
                
        </v-layout>       
      </v-card>
    </v-dialog>
    <!-- #END# Exportable Table -->
  </site-patrimonio>
</template>

<script>
import SitePatrimonio from '@/templates/SitePatrimonio';
import EmprestimoModal from '@/pages/Modulos/Patrimonio/Instrumento/Emprestimo/EmprestimoModal';
import DevolucaoModal from '@/pages/Modulos/Patrimonio/Instrumento/Devolucao/DevolucaoModal';
import InstrumentoModal from '@/pages/Modulos/Patrimonio/Instrumento/Inicio/Instrumento/InstrumentoModal';
import PdfView from '@/pages/Modulos/Patrimonio/Instrumento/Inicio/PDF';
import CadInstrumento from '@/pages/Modulos/Patrimonio/Instrumento/Cadastros/CadastroInstrumentoModal';
import Store from '@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeInstrumento.js';

import swal from 'sweetalert2';

export default {
  name: 'Home',
  components: {
    SitePatrimonio,
    EmprestimoModal,
    DevolucaoModal,
    InstrumentoModal,
    PdfView,
    CadInstrumento
  },
  data() {
    return {
      dialog: false,
      procurar: '',
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: -1,
        sortBy: 'fat',
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16]
      },
      items_breads: [
        {
          text: 'ESTOQUE',
          disabled: true,
          href: 'breadcrumbs_dashboard'
        }
      ],
      headers: [
        {
          text: 'TOMBAMENTO',
          align: 'left',
          value: 'tombamento',
          class: 'blue darken-3 white--text'
        },
        {
          text: 'INSTRUMENTO',
          value: 'nome',
          class: 'blue darken-3 white--text'
        },
        {
          text: 'CARACTERÍSTICAS/TONALIDADE',
          value: 'caracteristica',
          class: 'blue darken-3 white--text'
        },
        {
          text: 'AÇÃO',
          align: 'justify',
          value: 'ação',
          class: 'blue darken-3 white--text'
        }
      ],
      instrumentos_devolucao: '',
      instrumentos_emprestimo: '',
      autorizacao: false,
      instrumentos: [],
      show: false,
      doacao: [],
      origem_doacao: '',
      data_doacao: '',
      obs_doacao: '',
      data_compra: '',
      valor_compra: '',
      nota_fiscal_compra: '',
      empresa_compra: '',
      emprestimos: [],
      items: [{ header: 'Today' }, { divider: true, inset: true }],
      busca: true,
      nome: null,
      ano: null,
      tombamento: null,
      caracteristicas: null,
      marca: null,
      componentes: null,
      aquisicao: null,
      buscaAquisicao: true,
      data_emprestimo: '',
      data_devolucao: '',
      pdfTermo: null,
      imagem: null,
      dialogPdf: false,
      url_termo:"https://firebasestorage.googleapis.com/v0/b/sigadm-documentoz.appspot.com/o/certidao.pdf?alt=media&token=c1518e6e-7d5d-4a1e-8555-79c4a05cd23e"
    };
  },
  created() {
    this.BuscarInstrumentos();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(
        this.data_compra,
        this.data_doacao,
        this.data_emprestimo,
        this.data_devolucao
      );
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(
        this.data_compra,
        this.data_doacao,
        this.data_emprestimo,
        this.data_devolucao
      );
    }
  },
  methods: {
    InformarComoEmprestar() {
      this.Salvo(
        'Atenção!',
        'Para emprestar cadastre uma solicitação e realize o empréstimo.',
        'warning'
      );
    },
    Salvo(title, msg, type) {
      swal.fire(title, msg, type);
    },
    BuscarTermo() {
      this.$http
        .get(this.$url + 'DoacaoInstrumento/v1/termo-doacao-download', {
          headers: {
            authorization: 'Bearer ' + this.autorizacao.accessToken
          },
          responseType: 'blob'
        })
        .then(response => {
          ////console.log(response.status);
          if (response.status == 200) {
            //console.log(response.data);

            var fileURL = URL.createObjectURL(response.data);
            //console.log(fileURL);
            this.pdfTermo = fileURL;
            //window.open(fileURL);
          }
          ////console.log(response.data);
        })
        .catch(e => {
          swal.fire(
            'Sua autorização expirou!',
            'Entre com suas credencias novamente.',
            'warning'
          );
          //console.error(e);
          //console.data(e.data);
        });
    },
    BuscarImagem() {
      this.$http
        .get(this.$url + 'DoacaoInstrumento/v1/termo-imagem-download', {
          headers: {
            authorization: 'Bearer ' + this.autorizacao.accessToken
          },
          responseType: 'blob'
        })
        .then(response => {
          ////console.log(response.status);
          if (response.status == 200) {
            //console.log(response.data);

            var fileURL = URL.createObjectURL(response.data);
            //console.log(fileURL);
            this.imagem = fileURL;

            //window.open(fileURL);
          }
          ////console.log(response.data);
        })
        .catch(e => {
          swal.fire(
            'Sua autorização expirou!',
            'Entre com suas credencias novamente.',
            'warning'
          );
          //console.error(e);
          //console.data(e.data);
        });
    },
    b64EncodeUnicode(str) {
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode(parseInt(p1, 16));
        })
      );
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    CadastrarInstrumento() {
      this.$router.push('/cadastro-patrimonio-instrumento');
    },
    CorTimeline: function(status) {
      if (status == 2) {
        return 'red';
      } else if (status == 3) {
        return 'green';
      }
    },
    IconTimeline(status) {
      if (status == 2) {
        return 'close';
      } else if (status == 3) {
        return 'fas fa-check';
      }
    },
    DadosInstrumento(
      nome,
      ano,
      tombamento,
      caracteristicas,
      marca,
      componentes,
      aquisicao
    ) {
      this.nome = nome;
      this.ano = ano;
      this.tombamento = tombamento;
      this.caracteristicas = caracteristicas;
      this.marca = marca;
      this.componentes = componentes;
      this.aquisicao = aquisicao;
      if (aquisicao == '1') {
        this.buscarDoacao(tombamento);
      } else if (aquisicao == '2') {
        this.buscarCompra(tombamento);
      } else {
      }
    },
    BuscarEmprestimos(tombamento) {
      //console.log("buscar emprestimo do tombo ", tombamento);
      this.emprestimos = [];
      let usuarioAutorize = sessionStorage.getItem('usuario');
      if (!usuarioAutorize) {
        this.$router.push('/');
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: 'error',
          title: 'Sem autorização, entre com seus dados novamente!'
        });
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(
            this.$url +
              'EmprestimoInstrumento/v1/buscar-emprestimo?tombamento=' +
              tombamento,
            {
              headers: {
                authorization: 'Bearer ' + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            ////console.log(response.status);
            if (response.status == 200) {
              this.emprestimos = response.data;
              this.emprestimos = this.emprestimos.reverse();
            } else if (response.status == 401) {
              this.$router.push('/');
            }
            ////console.log(response.data);
          })
          .catch(e => {
            swal.fire(
              'Sua autorização expirou!',
              'Entre com suas credencias novamente.',
              'warning'
            );
            this.$router.push('/');
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    buscarDoacao(tombamento) {
      let usuarioAutorize = sessionStorage.getItem('usuario');
      if (!usuarioAutorize) {
        this.$router.push('/');
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: 'error',
          title: 'Sem autorização, entre com seus dados novamente!'
        });
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(
            this.$url +
              'DoacaoInstrumento/v1/buscar-doacao?tombamento=' +
              tombamento,
            {
              headers: {
                authorization: 'Bearer ' + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            //console.log(response.status);
            //console.log("Buscando doação");
            if (response.status == 200) {
              //console.log("dados da doação");
              //console.log(response.data);
              //Criar um loop pois o dado "data" que é recebido é um array
              response.data.forEach(element => {
                this.empresa_compra = null;
                this.nota_fiscal_compra = null;
                this.data_compra = null;
                this.valor_compra = null;
                this.data_doacao = this.formatDate(
                  element.dataDoacao.substr(0, 10)
                );
                this.origem_doacao = element.origem;
                this.obs_doacao = element.observacao;
                this.buscaAquisicao = false;
              });
            } else if (response.status == 401) {
              this.$router.push('/');
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
            }
          })
          .catch(e => {
            swal.fire(
              'Sua autorização expirou!',
              'Entre com suas credencias novamente.',
              'warning'
            );
            this.$router.push('/');
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    buscarCompra(id) {
      let usuarioAutorize = sessionStorage.getItem('usuario');
      if (!usuarioAutorize) {
        this.$router.push('/');
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: 'error',
          title: 'Sem autorização, entre com seus dados novamente!'
        });
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.$http
          .get(this.$url + 'CompraInstrumento/v1/buscar-compra?=' + id, {
            headers: { authorization: 'Bearer ' + this.autorizacao.accessToken }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              //console.log("Dados da compra:", response.data);
              response.data.forEach(element => {
                this.origem_doacao = null;
                this.data_doacao = null;
                this.obs_doacao = null;
                this.data_compra = this.formatDate(
                  element.dataCompra.substr(0, 10)
                );
                this.nota_fiscal_compra = element.notafiscal;
                this.empresa_compra = element.empresa;
                this.valor_compra = element.valor;
                this.buscaAquisicao = false;
              });
            } else if (response.status == 401) {
              this.$router.push('/');
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
            }
          })
          .catch(e => {
            swal.fire(
              'Sua autorização expirou!',
              'Entre com suas credencias novamente.',
              'warning'
            );
            this.$router.push('/');
            //console.error(e);
            //console.data(e.data);
          });
      }
    },
    BuscarInstrumentos() {
      this.instrumentos = [];
      let usuarioAutorize = sessionStorage.getItem('usuario');
      if (!usuarioAutorize) {
        this.$router.push('/');
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: 'error',
          title: 'Sem autorização, entre com seus dados novamente!'
        });
      } else if (usuarioAutorize) {
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + 'Instrumento/v1', {
            headers: { authorization: 'Bearer ' + this.autorizacao.accessToken }
          })
          .then(response => {
            //console.log(response.status);
            if (response.status == 200) {
              this.instrumentos = response.data;
              this.instrumentos.reverse();
              Store.dispatch('BuscandoNomesInstrumentos');
              Store.dispatch('BuscandoAnosInstrumentos');
              Store.dispatch('BuscandoTombamentosInstrumentos');
              Store.dispatch('BuscandoMarcasInstrumentos');
              Store.dispatch('BuscandoComponentesInstrumentos');
              this.busca = false;
            } else if (response.status == 401) {
              swal.fire(
                'Sua autorização expirou!',
                'Entre com suas credencias novamente.',
                'warning'
              );
              this.$router.push('/');
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
            }
            //console.log(response.data);
          })
          .catch(e => {
            this.busca = false;
            //console.error(e);
            //console.data(e.data);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
