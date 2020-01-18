<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="980px">
      <v-btn color="green darken-4" center class="white--text" slot="activator">
        <small>Registrar doação</small>
        <v-icon right color="white">fas fa-donate</v-icon>
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
            <span
              class="font-weight-bold headline blue--text text--darken-4"
            >Cadastrar instrumento e registrar doação</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md6 lg6 class="pl-2">
                <v-autocomplete
                  v-model="origem"
                  :items="origens"
                  label="Origem da doação"
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
              <v-flex xs12 sm12 md6 lg6>
                <v-dialog
                  ref="dialog_doacao_modal"
                  v-model="modal_doacao"
                  :return-value.sync="data_doacao"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Data da doação"
                    append-icon="event"
                    readonly
                    color="blue darken-4"
                    hint
                    single-line
                    persistent-hint
                    box
                  ></v-text-field>
                  <v-date-picker
                    v-model="data_doacao"
                    scrollable
                    locale="pt-BR"
                    color="blue darken-4"
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal_doacao = false">Cancelar</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog_doacao_modal.save(data_doacao)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm12 md12 d-flex>
                <v-textarea
                  v-model="observacao"
                  :counter="1000"
                  append-icon="fas fa-eye"
                  box
                  rows="1"
                  outline
                  name="input-7-4"
                  label="Observações"
                ></v-textarea>
              </v-flex>         
              <cad-termos                
              ></cad-termos>        
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import swal from "sweetalert2";
import CadTermos from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/CadastroTermos";
import StoreDoacao from "./store/storeDoacao.js";
export default {
  components: {
    CadTermos
  },
  data() {
    return {
      origem: null,
      origens: [],
      dialog_doacao_modal: false,
      data_doacao: null,
      modal_doacao: false,
      dialog: false,
      observacao: "Sem observações"
    };
  },
  props: {
    tombamento: String
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_doacao);
    }
  },
  watch: {
    dialog: function() {
      let data = StoreDoacao.state.origens;
      data.forEach(element => {
        this.origens.push({
          id: element.id,
          nome: element.doador + " - " + element.cidade + "/" + element.estado
        });
      });
      this.Fechar();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.data_doacao);
    },
    tombamento: function() {
      //console.log(this.tombamento);
    }
  },
  methods: {
    Fechar() {
      this.origem = null;
      this.data_doacao = null;
      this.observacao = "Sem observações";
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
