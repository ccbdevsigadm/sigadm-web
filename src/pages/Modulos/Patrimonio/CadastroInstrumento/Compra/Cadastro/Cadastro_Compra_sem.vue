<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center wrap>
      <v-flex xs12 sm12 md6 lg6 d-flex>
        <v-select
          color="teal darken-3"
          :items="empresas"
          label="Empresa*"
          box
          append-icon="fas fa-building"
          v-model="empresa"
          :rules="[() => !!empresa || 'Este campo precisa ser selecionado!']"
        ></v-select>
      </v-flex>     
      <v-flex xs12 sm12 md6 lg6 d-flex>
        <v-dialog
          ref="dialog_compra"
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
            label="Data da compra *"
            append-icon="event"
            readonly
            color="teal darken-3"
            hint
            persistent-hint
            box
          ></v-text-field>
          <v-date-picker v-model="data_compra" scrollable locale="pt-BR">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal_compra = false">Cancelar</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog_compra.save(data_compra)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6 d-flex>
        <v-text-field
          v-money="money"
          v-model.lazy="preco_instrumento"
          box
          color="teal darken-3"
          append-icon="fas fa-hand-holding-usd"
          label="Valor do instrumento"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md6 lg6  d-flex>
        <v-text-field
          append-icon="fas fa-signature"
          v-model="nota_fiscal"
          box
          color="teal darken-3"
          :hint="hint_nota"
          label="Nº da Nota Fiscal"
        ></v-text-field>
      </v-flex>
    </v-layout>
      <cad-notap
        v-on:cadastrarCompra="CadastrarCompra"
        v-bind:numero_tombamento="numero_do_instrumento"
        v-show="com_nota"
      ></cad-notap>   
  </v-container>
</template>

<script type="text/babel">
import swal from "sweetalert2";
import CadEmpresa from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Compra/Cadastro/Cadastro_Empresa";
import CadNotap from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Compra/NotaFiscal/CadastroNotaFiscalP";
import { VMoney } from "v-money";

export default {
  name: "Cadastro_Empresa",
  components: {
    CadEmpresa,
    CadNotap
  },
  props: ["numero_do_instrumento"],
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      com_data: true,
      com_nota: true,
      descriçao_sem_nota: "sem nota fiscal.",
      dialog_compra: "",
      modal_compra: false,
      data_compra: new Date().toISOString().substr(0, 10),
      origem_instrumento: "",
      observacao_instrumento: "",
      dialog: false,
      empresas: [],
      empresa: "",
      nota_sem_definicao: "",
      nota_fiscal: "",
      preco_instrumento: 0.0,
      data_compra: new Date().toISOString().substr(0, 10),
      tombamento: "",
      path_nota: "",
      hint_nota: ""
    };
  },
  directives: { money: VMoney },
  created() {
    this.AtualizarEmpresas();
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.data_compra);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.data_compra);
    }
  },
  methods: {
    NotaPath(payload) {
      this.nota_path = payload.path;
      ////console.log(this.nota_path.dbPath);
      this.tombamento = this.numero_do_instrumento;
    },
    CadastrarCompra() {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      ////console.log(this.com_nota);
      if (
        (autorizacaoAux &&
          this.com_nota == true &&
          this.numero_do_instrumento != "" &&
          this.nota_fiscal,
        this.empresa != "" && this.data_compra != "")
      ) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        ////console.log("entrou no cadastro compra");
        ////console.log(this.preco_instrumento);
        this.salvarcompra(
          this.preco_instrumento,
          this.numero_do_instrumento,
          this.nota_fiscal,
          this.empresa,
          this.data_compra
        );
      } else if (autorizacaoAux && com_nota == false) {
        this.nota_fiscal = "Não cadastrada";
        this.empresa = "Não possui";
        this.salvarcompra(
          this.preco_instrumento,
          this.numero_do_instrumento,
          this.nota_fiscal,
          this.empresa,
          this.data_compra
        );
      } else {
        this.hint_nota = "Campo em branco";
        swal.fire({
          type: "warning",
          title: "Oops, verifique...",
          text: "Tem algum campo obrigatório que ainda não foi selecionado!"
        });
      }
    },
    salvarcompra(preco, tombamento, nota, empresa, data) {
      this.$http
        .post(
          this.$url + "CompraInstrumento/v1",
          {
            id: 0,
            valor: preco,
            tombamento: tombamento,
            notafiscal: nota,
            empresa: empresa,
            dataCompra: data,
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
            this.$emit("cadastrarInstrumentos");
            ////console.log("compra cadastrada");
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
          ////console.error(e);
          ////console.data(e.data);
        });
    },
    SemDataCompra() {
      this.com_data = !this.com_data;
      if (this.com_data == false) {
        this.data_compra = new Date(1970, 0, 1).toISOString().substr(0, 10);
        swal.fire(
          "Atenção!",
          "O instrumento não terá data de compra registrada!",
          "warning"
        );
      } else {
        this.data_compra = new Date().toISOString().substr(0, 10);
      }
      ////console.log(this.data_compra);
    },
    SemNotaCompra() {
      this.com_nota = !this.com_nota;
      if (this.com_nota == false) {
        this.notafiscal = this.descriçao_sem_nota;
        swal.fire(
          "Atenção!",
          "O instrumento não terá nota de compra registrada!",
          "warning"
        );
      } else {
        this.notafiscal = "";
      }
      ////console.log(this.notafiscal);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    AtualizarEmpresas() {
      this.empresas = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
      this.autorizacao = JSON.parse(usuarioAutorize);
      this.$http
        .get(this.$url + "Empresa/v1", {
          headers: { authorization: "Bearer " + this.autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log("request ok! ", new Date().toISOString().substr(0, 16));
            response.data.forEach(element => {
              //console.log("Pós cadastro", element.nome);
              this.empresas.push(element.nome);
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
          //console.error(e);
          //console.data(e.data);
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
