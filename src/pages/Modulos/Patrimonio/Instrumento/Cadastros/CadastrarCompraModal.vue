<template>
  <v-layout>
    <v-dialog v-model="dialog_compra" persistent max-width="950px">
      <v-btn color="indigo darken-4" center class="white--text" slot="activator">
        <small>Registrar compra</small>
        <v-icon right color="white">fas fa-shopping-cart</v-icon>
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
              v-on:click="dialog_compra = false, Fechar()"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span
              class="font-weight-bold headline blue--text text--darken-4"
            >Cadastrar instrumento e registrar compra</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md3 lg3 class="pl-2">
                <v-autocomplete
                  v-model="empresa"
                  :items="empresas"
                  label="Empresa"
                  item-text="nome"
                  item-value="nome"
                  color="blue darken-4"
                  single-line
                  box
                >
                  <template slot="selection" slot-scope="data">{{ data.item.nome}}</template>
                  <template slot="item" slot-scope="data">
                    <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                      <v-list-tile>
                        <v-list-tile-content>{{data.item.nome}}</v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12 md3 lg3>
                <v-dialog
                  ref="dialog_compra_modal"
                  v-model="modal_compra"
                  :return-value.sync="data_compra"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Data da compra"
                    append-icon="event"
                    readonly
                    color="blue darken-4"
                    hint
                    single-line
                    persistent-hint
                    box
                  ></v-text-field>
                  <v-date-picker
                    v-model="data_compra"
                    scrollable
                    locale="pt-BR"
                    color="blue darken-4"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Cancelar</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog_compra_modal.save(data_compra)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex sm12 md3 lg3>
                <v-text-field
                  v-money="money"
                  v-model.lazy="preco_instrumento"
                  box
                  color="blue darken-4"
                  append-icon="fas fa-hand-holding-usd"
                  label="Valor do instrumento*"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3 lg3>
                <v-text-field box v-model="nota" label="Nota fiscal"></v-text-field>
              </v-flex>
              <cad-nota v-bind:numero_tombamento="tombamento" @SalvarCompra="SalvarCompra"></cad-nota>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import { VMoney } from "v-money";
import CadNota from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/CadastroNotaFiscalP";
import StoreCompra from "./store/storeCompra.js";
export default {
  components: {
    CadNota
  },
  data() {
    return {
      tombamento: null,
      empresa: null,
      empresas: [],
      nota: null,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      preco_instrumento: 0.0,
      dialog_compra_modal: false,
      data_compra: null,
      dialog_compra: false,
      modal: false,
      modal_compra: false
    };
  },
  props: {
    numero_tombamento: String
  },
  directives: { money: VMoney },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_compra);
    }
  },
  watch: {
    dialog_compra: function() {
      this.empresas = StoreCompra.state.empresas;
      this.Fechar();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.data_compra);
    }
  },
  methods: {
    SalvarCompra() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .post(
          this.$url + "CompraInstrumento/v1",
          {
            id: 0,
            valor: this.preco_instrumento,
            tombamento: this.numero_tombamento,
            notafiscal: this.nota,
            empresa: this.empresa,
            dataCompra: this.data_compra,
            launchDate: new Date().toISOString().substr(0, 19)
          },
          {
            headers: { authorization: "Bearer " + autorizacao.accessToken }
          }
        )
        .then(response => {
          ////console.log(response.status);
          if (response.status == 200) {
            //console.log(response.data);
          }
        })
        .catch(e => {
          toast.toast("top","error","Atenção", "Sem conexão com a internet ou falha do sistema.");
        });

      this.$emit("SalvarInstrumento");
    },
    Fechar() {
      this.empresa = null;
      this.nota = null;
      this.data_compra = null;
      this.preco_instrumento = 0.0;
      this.money = {decimal: ",",thousands: ".",prefix: "R$ ",suffix: "",precision: 2,masked: false /* doesn't work with directive */
      }
      
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
