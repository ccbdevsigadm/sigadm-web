<template>
  <site-patrimonio>
    <div class="block-header align-center mt-5">
      <h2 class="font-weight-bold headline blue--text text--darken-4">Pesquisa avançada no estoque</h2>
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
        <v-flex xs4 sm4 md6 lg6 v-if="busca == false" class="pt-5 pl-4">
          <v-hover>
            <v-text-field
              v-model="procurar"
              append-icon="search"
              label="Procurar no estoque ..."
              class="text--pink"
              color="teal darken-3"
              box
              hide-details
            ></v-text-field>
          </v-hover>
        </v-flex>
        <v-flex xs6 sm6 md4 lg4 offset-md2 align-center class="pt-5 pl-4" v-if="busca == false">
          <v-btn outline color="teal darken-3" @click="CadastrarInstrumento">
            <small>Cadastrar instrumento</small>
            <v-icon right>fas fa-guitar</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>
      <v-flex sm12 xs12 md12 lg12 align-center d-flex>
        <span v-if="busca == true">
          <v-progress-circular
            :size="50"
            color="teal darken-3"
            indeterminate
            :width="3"
            class="align-center mt-4 mb-4"
          >
            <v-icon color="teal darken-1">fas fa-home</v-icon>
          </v-progress-circular>
          <br>
          <h4 class="teal--text text--darken-1">Buscando instrumentos...</h4>
        </span>
      </v-flex>
      <v-flex>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md3 lg3 v-for="header in headers" :key="header.text">
              <div v-if="filters.hasOwnProperty(header.value)">
                <v-select
                  flat
                  hide-details
                  multiple
                  box
                  single-line
                  :label="header.text"
                  clearable
                  :items="columnValueList(header.value)"
                  v-model="filters[header.value]"
                ></v-select>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="filteredDesserts"
        :pagination.sync="pagination"
        select-all
        item-key="tombamento"
        class="elevation-1"
      >
        <template slot="headers" slot-scope="props">
          <!--tr>
            <th>
              <v-checkbox
                color="blue"
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
          <tr-- class="grey lighten-3">
            <th>
              <v-icon>filter_list</v-icon>
            </th>
          </tr-->
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <!--td>
              <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
            </td-->
            <td>{{ props.item.tombamento }}</td>
            <td class="text-xs-right">{{ props.item.instrumento }}</td>
            <td class="text-xs-right">{{ props.item.aquisicao}}</td>
            <td class="text-xs-right">{{ props.item.destino}}</td>
            <td class="text-xs-right">{{ props.item.localizacao}}</td>
            <td class="text-xs-right">{{ props.item.beneficiario}}</td>
            <td class="text-xs-right">{{ props.item.telefone}}</td>
            <td class="text-xs-right">{{ props.item.dataEmprestimo}}</td>
            <td class="text-xs-right">{{ props.item.termo}}</td>
            <td class="text-xs-right">{{ props.item.encarregado}}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- #END# Exportable Table -->
  </site-patrimonio>
</template>

<script>
import AcessoBotao from "@/pages/Modulos/Patrimonio/Instrumento/Inicio/AcessoBotao";
import SitePatrimonio from "@/templates/SitePatrimonio";
import EmprestimoModal from "@/pages/Modulos/Patrimonio/Instrumento/Emprestimo/EmprestimoModal";
import DevolucaoModal from "@/pages/Modulos/Patrimonio/Instrumento/Devolucao/DevolucaoModal";
import InstrumentoModal from "@/pages/Modulos/Patrimonio/Instrumento/Inicio/Instrumento/InstrumentoModal";
import PdfView from "@/pages/Modulos/Patrimonio/Instrumento/Inicio/PDF";

import swal from "sweetalert2";

export default {
  tombamento: "Home",
  components: {
    AcessoBotao,
    SitePatrimonio,
    EmprestimoModal,
    DevolucaoModal,
    InstrumentoModal,
    PdfView
  },
  data: () => ({
    pagination: {
      sortBy: "tombamento"
    },
    selected: [],
    headers: [
      { text: "Tombamento", value: "tombamento" },
      { text: "Instrumento", align: "left", value: "instrumento" },
      { text: "Aquisição", align: "left", value: "aquisicao" },
      { text: "Destino", align: "left", value: "destino" },
      { text: "Localização", align: "left", value: "localizacao" },
      { text: "Beneficiário", align: "left", value: "beneficiario" },
      { text: "Telefone", align: "left", value: "telefone" },
      { text: "Data de empréstimo", align: "left", value: "dataEmprestimo" },
      { text: "Termo", align: "left", value: "termo" },
      { text: "Encarregado", align: "left", value: "encarregado" }
    ],
    filters: {
      tombamento: [],
      instrumento: [],
      aquisicao: [],
      destino: [],
      localizacao: [],
      beneficiario: [],
      telefone: [],
      dataEmprestimo: [],
      termo: [],
      encarregado: []
    },
    desserts: [
      {
        value: false,
        tombamento: "0165",
        instrumento: "Barítono Horn/Sib",
        aquisicao: "Doação/São Paulo/Bertioga",
        destino: "-",
        localizacao: "Natal/Central/BR17-0010",
        beneficiario: "-",
        telefone: "-",
        dataEmprestimo: "-",
        termo: "-",
        encarregado: "-"
      },
      {
        value: false,
        tombamento: "0152",
        instrumento: "Clarinete/Dó",
        aquisicao: "Doação São Paulo/Brás",
        destino: "Macaíba/Lagoa Grande/17-0079",
        localizacao: "Parelhas/Ivan Bezerra/17-0048",
        beneficiario: "Arisson Santos",
        telefone: "-",
        dataEmprestimo: "16/03/2013",
        termo: "Não",
        encarregado: "Genicarlos"
      },
      {
        value: false,
        tombamento: "0169",
        instrumento: "Barítono Horn/Sib",
        aquisicao: "Doação",
        destino: "-",
        localizacao: "Natal/Central/17-0010",
        beneficiario: "-",
        telefone: "-",
        dataEmprestimo: "-",
        termo: "-",
        encarregado: "-"
      },
      {
        value: false,
        tombamento: "0154",
        instrumento: "Barítono de Pisto/Sib",
        aquisicao: "Doação/São Paulo/Brás",
        destino: "Macaíba/Conjunto São Geraldo/17-0006",
        localizacao: "Parelhas/Ivan Bezerra/17-0048",
        beneficiario: "David Santos",
        telefone: "-",
        dataEmprestimo: "16/03/2013",
        termo: "Não",
        encarregado: "Genicarlos"
      },
      {
        value: false,
        tombamento: "0155",
        instrumento: "Clarinete/Sib",
        aquisicao: "Doação/São Paulo/Bertioga",
        destino: "-",
        localizacao: "Ceará-Mirim/Centro/17-0033",
        beneficiario: "Diego",
        telefone: "3301-1319",
        dataEmprestimo: "17/03/2013",
        termo: "Não",
        encarregado: "Éutico"
      },
      {
        value: false,
        tombamento: "0156",
        instrumento: "Trombone/Sib",
        aquisicao: "Doação/São Paulo/Brás",
        destino: "Macaíba/Lagoa Grande/17-0079",
        localizacao: "Natal/Potengi/17-0082",
        beneficiario: "Alex Silva dos Santos",
        telefone: "3301-1319",
        dataEmprestimo: "20/05/2013",
        termo: "Sim",
        encarregado: "Eliezer"
      },
      {
        value: false,
        tombamento: "0153",
        instrumento: "Bombardino/Sib",
        aquisicao: "Doação/São Paulo/Brás",
        destino: "Natal/Cidade da Esperança/17-0012",
        localizacao: "Natal/Central/17-0010",
        beneficiario: "-",
        telefone: "-",
        dataEmprestimo: "-",
        termo: "-",
        encarregado: "-"
      },
      {
        value: false,
        tombamento: "0168",
        instrumento: "Bombardino/Sib",
        aquisicao: "Doação",
        destino: "-",
        localizacao: "Natal/Central/17-0010",
        beneficiario: "-",
        telefone: "-",
        dataEmprestimo: "-",
        termo: "-",
        encarregado: "-"
      }
    ]
  }),
  computed: {
    filteredDesserts() {
      return this.desserts.filter(d => {
        return Object.keys(this.filters).every(f => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    }
  },

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    columnValueList(val) {
      return this.desserts.map(d => d[val]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
