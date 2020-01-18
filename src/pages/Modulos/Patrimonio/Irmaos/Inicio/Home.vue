<template>
  <site-patrimonio>
    <div class="block-header align-center pt-5">
      <h2 class="font-weight-bold headline blue--text text--darken-4">Irmãos cadastrados</h2>
    </div>
    <!-- Exportable Table -->
    <v-card>
      <v-flex xs12 sm12 md12 lg12 d-flex>
        <v-flex xs4 sm4 md6 lg3 v-if="busca == false" class="pt-5 pl-4">
          <v-hover>
            <v-text-field
              v-model="procurar"
              box
              append-icon="search"
              label="Procurar irmão ..."
              color="blue darken-4"
              hide-details
            ></v-text-field>
          </v-hover>
        </v-flex>
        <v-flex xs6 sm6 md4 lg4 offset-md5 align-center class="pt-5 pl-4" v-if="busca == false">
          <cad-irmao @irmao="BuscarIrmaos()"></cad-irmao>
          <editar-irmao
            :dialog_ativar="ativar_edicao"
            :irmao_dados="irmao_edicao"
            @IrmaoDeletado="BuscarIrmaos"
            @IrmaoAtualizado="BuscarIrmaos"
          ></editar-irmao>
        </v-flex>
      </v-flex>
      <v-layout row align-center>
        <v-dialog v-model="busca" max-width="350" persistent>
          <v-card>
            <v-card-title class="headline light-blue darken-4 white--text">
              <v-flex align-center class="white--text text--darken-4">IRMÃOS |
            <span class="grey--text text--lighten-1">CADASTROS</span></v-flex>
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
                    <v-icon color="light-blue darken-4">fas fa-user-tie</v-icon>
                  </v-progress-circular>
                  <br />
                  <h5 class="light-blue--text text--darken-4">Esperando informações ...</h5>
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
        :items="irmaos"
        :item-key="irmaos.id"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props" class="mb-3">
          <tr
            class="pl-4 text-xs-left"
            @click="AtivarEdicao(props.item.dados)"
            style="cursor:pointer;"
          >
            <td>{{ props.item.nome }}</td>
            <td>{{ props.item.cargo }}</td>
            <td>{{ props.item.cidade }}</td>
            <td>{{ props.item.telefone }}</td>
            <td>{{ props.item.congregacao }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- #END# Exportable Table -->
  </site-patrimonio>
</template>

<script>
import CadIrmao from "@/pages/Modulos/Patrimonio/Irmaos/Cadastros/IrmaoModal.vue";
import SitePatrimonio from "@/templates/SitePatrimonio.vue";
import EditarIrmao from "@/pages/Modulos/Patrimonio/Irmaos/EditarIrmao/EditarIrmaoModal.vue";
import swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    SitePatrimonio,
    CadIrmao,
    EditarIrmao
  },
  data() {
    return {
      ativar_edicao: "",
      irmao_edicao: Object,
      procurar: "",
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: -1,
        sortBy: "fat",
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16]
      },
      headers: [
        {
          text: "NOME",
          align: "left",
          value: "nome",
          class: "blue darken-3 white--text"
        },
        {
          text: "CARGO",
          align: "left",
          value: "cargo",
          class: "blue darken-3 white--text"
        },
        {
          text: "CIDADE",
          align: "left",
          value: "cidade",
          class: "blue darken-3 white--text"
        },
        {
          text: "TELEFONE",
          align: "left",
          value: "telefone",
          sortable: false,
          class: "blue darken-3 white--text"
        },
        {
          text: "COMUM",
          align: "left",
          value: "status",
          class: "blue darken-3 white--text"
        }
      ],
      autorizacao: false,
      irmaos: [],
      show: false,
      busca: true,
      identificacaoIgreja: "",
      igreja: [],
      idUsuario: null
    };
  },
  created() {
    this.BuscarIrmaos();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate();
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate();
    },
    igreja: function() {
      ////console.log("Whatch igrejas", this.igreja);
    }
  },
  methods: {
    AtivarEdicao(irmao) {
      this.ativar_edicao = Math.random();
      this.irmao_edicao = irmao;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    CadastrarIrmao() {
      this.$router.push("/cadastro-patrimonio-novo-irmao");
    },
    BuscarIrmaos() {
      this.irmaos = [];
      let usuarioAutorize = sessionStorage.getItem("usuario");
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
        this.autorizacao = JSON.parse(usuarioAutorize);
        this.busca = true;
        this.$http
          .get(this.$url + "Usuario/v1", {
            headers: { authorization: "Bearer " + this.autorizacao.accessToken }
          })
          .then(response => {
            if (response.status == 200) {
              if (response.data.length == 0) {
                this.busca = false;
              }
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
                              cargo: element.cargo,
                              endereco: element.endereco,
                              cidade: element.cidade,
                              telefone: element.telefone,
                              congregacao: response.data.cidade,
                              regional: response.data.encRegional,
                              local: response.data.encLocal,
                              dados: element
                            });
                            this.busca = false;
                            ////console.log(this.igreja);
                          }
                          ////console.log(response.data);
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
              });
            } else if (response.status == 401) {
            }
            ////console.log(response.data);
          })
          .catch(e => {
            //console.error(e);
            this.busca = false;
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
