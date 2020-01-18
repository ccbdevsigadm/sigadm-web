<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn color="blue darken-4" slot="activator" class="white--text">
        <v-icon small>fas fa-music</v-icon>
        <span class="pl-2">
          <b>Cadastrar instrumento</b>
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
              color="red darken-4"
              absolute
              v-on:click="(dialog = false), Fechar()"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-card-title>
          <v-flex xs12 sm12 md12 lg12 align-center>
            <span
              class="font-weight-bold headline blue--text text--darken-4"
            >Cadastro de instrumento</span>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 sm12 md3 lg3 offset-md9 offset-lg9 class="pl-2">
            <v-menu bottom left offset-y :open-delay="1">
              <template v-slot:activator="{ on }">
                <v-btn class="white--text" color="blue darken-4" v-on="on">
                  <v-icon small>fas fa-plus</v-icon>
                  <span class="pl-2">
                    <b>Adicionar</b>
                  </span>
                </v-btn>
              </template>
              <v-list>
                <center>
                  <cad-tombamento @tombamentos="BuscarTombamentos()"></cad-tombamento>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-nome @nomes="BuscandoNomesInstrumentos()"></cad-nome>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-marca @marcas="BuscandoMarcasInstrumentos()"></cad-marca>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-caracteristica @caracteristicas="AtualizarCaracteristicas()"></cad-caracteristica>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-ano @anos="BuscandoAnosInstrumentos()"></cad-ano>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-componente @componentes="BuscandoComponentesInstrumentos()"></cad-componente>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-empresa @empresas="BuscarEmpresas()"></cad-empresa>
                </center>
                <v-divider></v-divider>
                <center>
                  <cad-origem @origens="BuscarDoacao()"></cad-origem>
                </center>
              </v-list>
            </v-menu>
          </v-flex>
          <v-stepper v-model="e6" vertical class="elevation-0">
            <v-stepper-step :complete="e6 > 1" step="1">
              Dados do instrumento
              <small>Todos os campos são obrigatórios</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="nome"
                      :items="nomes"
                      box
                      label="Nome do instrumento"
                      item-text="nome"
                      item-value="nome"
                      color="blue darken-4"
                      :return-object="true"
                    >
                      <template v-slot:selection="data">
                        {{
                        data.item.nome
                        }}
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-flex
                          xs10
                          sm10
                          :key="JSON.stringify(data.item.id)"
                          @click="EscolherNaipe(data.item.naipe)"
                        >
                          <v-list-tile>
                            <v-list-tile-content>
                              {{
                              data.item.nome
                              }}
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="caracteristica"
                      box
                      :items="caracteristicas"
                      label="Característica/Tonalidade"
                      item-text="caracteristica"
                      item-value="caracteristica"
                      color="blue darken-4"
                    >
                      <template slot="selection" slot-scope="data">
                        {{
                        data.item.caracteristica
                        }}
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>
                              {{
                              data.item.caracteristica
                              }}
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="tombamento"
                      box
                      :items="tombamentos"
                      label="Número de tombamento"
                      item-text="numero"
                      item-value="numero"
                      color="blue darken-4"
                    >
                      <template slot="selection" slot-scope="data">
                        {{
                        data.item.numero
                        }}
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>
                              {{
                              data.item.numero
                              }}
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="ano"
                      box
                      :items="anos"
                      label="Ano de fabricação"
                      item-text="numeroAno"
                      item-value="numeroAno"
                      color="blue darken-4"
                    >
                      <template slot="selection" slot-scope="data">
                        {{
                        data.item.numeroAno
                        }}
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>
                              {{
                              data.item.numeroAno
                              }}
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>

                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="marca"
                      box
                      :items="marcas"
                      label="Marca do instrumento"
                      item-text="marca"
                      item-value="marca"
                      color="blue darken-4"
                    >
                      <template slot="selection" slot-scope="data">
                        {{
                        data.item.marca
                        }}
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>
                              {{
                              data.item.marca
                              }}
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md6 lg6 class="pl-2">
                    <v-autocomplete
                      v-model="componente"
                      box
                      :items="componentes"
                      item-text="componente"
                      item-value="componente"
                      color="blue darken-4"
                      single-line
                      label="Componentes do instrumento"
                      multiple
                      deletable-chips
                      :rules="[
                        () =>
                          !!componentes || 'Este campo precisa ser selecionado!'
                      ]"
                    >
                      <template slot="selection" slot-scope="data">
                        <v-chip color="blue darken-4" text-color="white">
                          {{
                          data.item.componente
                          }}
                        </v-chip>
                      </template>
                      <template slot="item" slot-scope="data">
                        <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                          <v-list-tile>
                            <v-list-tile-content>
                              {{
                              data.item.componente
                              }}
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm12 md12 d-flex>
                    <v-textarea
                      v-model="observacao"
                      box
                      :counter="1000"
                      append-icon="fas fa-eye"
                      rows="2"
                      color="blue darken-4"
                      label="Observações"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-btn class="white--text" color="blue darken-4" @click="(e6 = 2), CarregarDados">
                <v-icon small>fas fa-arrow-down</v-icon>
                <span class="pl-2">
                  <b>Continuar</b>
                </span>
              </v-btn>

              <v-btn color="red darken-4" class="white--text" @click="dialog = false">
                <v-icon small>fas fa-times</v-icon>
                <span class="pl-2">
                  <b>Fechar</b>
                </span>
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Dados da forma de aquisição do insturmento
              <small>Necessário escolher compra ou doação</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-tabs
                      class="pb-5"
                      v-model="tab"
                      background-color="transparent"
                      color="basil"
                      grow
                      slider-color="blue darken-4"
                    >
                      <v-tab>
                        <span>COMPRA</span>
                      </v-tab>
                      <v-tab>
                        <span>DOAÇÃO</span>
                      </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                      <v-tab-item>
                        <v-card class="elevation-0">
                          <v-card-text>
                            <v-layout>
                              <v-flex xs12 sm12 md6 lg6 class="pl-2">
                                <v-autocomplete
                                  v-model="empresa"
                                  box
                                  :items="empresas"
                                  label="Empresa"
                                  item-text="nome"
                                  item-value="nome"
                                  color="blue darken-4"
                                >
                                  <template slot="selection" slot-scope="data">{{ data.item.nome }}</template>
                                  <template slot="item" slot-scope="data">
                                    <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          {{
                                          data.item.nome
                                          }}
                                        </v-list-tile-content>
                                      </v-list-tile>
                                    </v-flex>
                                  </template>
                                </v-autocomplete>
                              </v-flex>
                              <v-flex xs12 sm12 md6 lg6>
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
                                    v-model="computedDateFormattedCompra"
                                    label="Data da compra"
                                    append-icon="event"
                                    readonly
                                    box
                                    color="blue darken-4"
                                    hint
                                    persistent-hint
                                  ></v-text-field>
                                  <v-date-picker
                                    v-model="data_compra"
                                    scrollable
                                    locale="pt-BR"
                                    color="blue darken-4"
                                  >
                                    <v-spacer></v-spacer>
                                     <v-btn
                                      color="red darken-4"
                                      class="white--text"
                                      @click="modal_compra = false"
                                    >Cancelar</v-btn>
                                    <v-btn
                                      color="blue darken-4"
                                      class="white--text"
                                      @click="
                                        $refs.dialog_compra_modal.save(
                                          data_compra
                                        )
                                      "
                                    >OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>
                              </v-flex>
                            </v-layout>
                            <v-layout>
                              <v-flex sm12 md6 lg6>
                                <v-text-field
                                  v-money="money"
                                  box
                                  v-model.lazy="preco_instrumento"
                                  color="blue darken-4"
                                  append-icon="fas fa-hand-holding-usd"
                                  label="Valor do instrumento*"
                                ></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md6 lg6>
                                <v-text-field box v-model="nota" label="Nota fiscal"></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                        <v-flex xs12 sm12 md12 lg12>
                          <v-layout>
                            <v-flex xs12 sm12>
                              <v-hover>
                                <v-card
                                  slot-scope="{ hover }"
                                  :class="`elevation-${hover ? 12 : 2}`"
                                  class="mx-auto"
                                >
                                  <v-card-title primary-title>
                                    <div>
                                      <h3 class="subheading text-uppercase mb-0">Anexo</h3>
                                    </div>
                                  </v-card-title>
                                  <v-card-text>
                                    <span id="cadastrotermos">
                                      <file-pond
                                        style="cursor:pointer"
                                        name="test"
                                        ref="pond_nota_fiscal"
                                        class-name="my-pond"
                                        label-idle="NOTA FISCAL"
                                        :accepted-file-types="tipo"
                                        v-bind:files="myFiles"
                                        labelFileTypeNotAllowed="NÃO ACEITO"
                                        fileValidateTypeLabelExpectedTypes="É esperado um PDF"
                                      ></file-pond>
                                    </span>
                                  </v-card-text>
                                </v-card>
                              </v-hover>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-btn class="white--text" color="blue darken-4" @click="e6 = 1">
                          <v-icon small>fas fa-arrow-up</v-icon>
                          <span class="pl-2">
                            <b>voltar</b>
                          </span>
                        </v-btn>
                         <v-btn color="red darken-4" class="white--text" @click="dialog = false">
                          <v-icon small>fas fa-times</v-icon>
                          <span class="pl-2">
                            <b>Fechar</b>
                          </span>
                        </v-btn>
                        <v-btn
                          class="white--text"
                          color="green darken-4"
                          @click="SalvarInstrumento(), SalvarCompra(),SalvarTermoNotaFiscal()"
                        >
                          <v-icon small>fas fa-save</v-icon>
                          <span class="pl-2">
                            <b>salvar instrumento</b>
                          </span>
                        </v-btn>
                      </v-tab-item>
                      <v-tab-item>
                        <v-card class="elevation-0">
                          <v-flex xs12 sm12 md12 lg12>
                            <v-layout>
                              <v-flex xs12 sm12 md6 lg6 class="pl-2">
                                <v-autocomplete
                                  v-model="origem"
                                  box
                                  :items="origens"
                                  label="Origem da doação"
                                  item-text="nome"
                                  item-value="nome"
                                  color="blue darken-4"
                                >
                                  <template slot="selection" slot-scope="data">{{ data.item.nome }}</template>
                                  <template slot="item" slot-scope="data">
                                    <v-flex xs10 sm10 :key="JSON.stringify(data.item.id)">
                                      <v-list-tile>
                                        <v-list-tile-content>
                                          {{
                                          data.item.nome
                                          }}
                                        </v-list-tile-content>
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
                                    v-model="computedDateFormattedDoacao"
                                    box
                                    label="Data da doação"
                                    append-icon="event"
                                    readonly
                                    color="blue darken-4"
                                    hint
                                    persistent-hint
                                  ></v-text-field>
                                  <v-date-picker
                                    v-model="data_doacao"
                                    scrollable
                                    locale="pt-BR"
                                    color="blue darken-4"
                                  >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="red darken-4"
                                      class="white--text"
                                      @click="modal_doacao = false"
                                    >Cancelar</v-btn>
                                    <v-btn
                                      color="blue darken-4"
                                      class="white--text"
                                      @click="
                                        $refs.dialog_doacao_modal.save(
                                          data_doacao
                                        )
                                      "
                                    >OK</v-btn>
                                  </v-date-picker>
                                </v-dialog>
                              </v-flex>
                            </v-layout>
                            <v-flex xs12 sm12 md12 d-flex>
                              <v-textarea
                                v-model="observacao_instrumento"
                                box
                                :counter="1000"
                                append-icon="fas fa-eye"
                                rows="1"
                                color="blue darken-4"
                                name="input-7-4"
                                label="Observações"
                              ></v-textarea>
                            </v-flex>
                          </v-flex>
                        </v-card>
                        <v-flex xs12 sm12 md12 lg12>
                          <v-layout>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-hover>
                                <v-card
                                  slot-scope="{ hover }"
                                  :class="`elevation-${hover ? 12 : 2}`"
                                  class="mx-auto"
                                >
                                  <v-card-title primary-title>
                                    <div>
                                      <h3
                                        class="font-weight-bold subheading blue--text text--darken-4"
                                      >Termo da doação</h3>
                                    </div>
                                  </v-card-title>
                                  <v-card-text>
                                    <span id="cadastrotermos">
                                      <file-pond
                                        style="cursor:pointer"
                                        name="test"
                                        ref="pond_termo_doacao"
                                        class-name="my-pond"
                                        label-idle="anexar aqui"
                                        :accepted-file-types="tipo"
                                        v-bind:files="myFiles"
                                        labelFileTypeNotAllowed="NÃO ACEITO"
                                        fileValidateTypeLabelExpectedTypes="É esperado um PDF"
                                      ></file-pond>
                                    </span>
                                  </v-card-text>
                                </v-card>
                              </v-hover>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-hover>
                                <v-card
                                  slot-scope="{ hover }"
                                  :class="`elevation-${hover ? 12 : 2}`"
                                  class="mx-auto"
                                >
                                  <v-card-title primary-title>
                                    <div>
                                      <h3
                                        class="font-weight-bold subheading blue--text text--darken-4"
                                      >Nota fiscal</h3>
                                    </div>
                                  </v-card-title>
                                  <v-card-text>
                                    <span id="cadastrotermos">
                                      <file-pond
                                        style="cursor:pointer"
                                        name="test"
                                        ref="pond_nota_fiscal_doacao"
                                        class-name="my-pond"
                                        label-idle="Anexar aqui"
                                        :accepted-file-types="tipo"
                                        v-bind:files="myFiles"
                                        labelFileTypeNotAllowed="NÃO ACEITO"
                                        fileValidateTypeLabelExpectedTypes="É esperado um PDF"
                                      ></file-pond>
                                    </span>
                                  </v-card-text>
                                </v-card>
                              </v-hover>
                            </v-flex>
                            <v-flex xs12 sm12 md4 lg4>
                              <v-hover>
                                <v-card
                                  slot-scope="{ hover }"
                                  :class="`elevation-${hover ? 12 : 2}`"
                                  class="mx-auto"
                                >
                                  <v-card-title primary-title>
                                    <div>
                                      <h3
                                        class="font-weight-bold subheading blue--text text--darken-4"
                                      >Outros documentos</h3>
                                    </div>
                                  </v-card-title>
                                  <v-card-text>
                                    <span id="cadastrotermos">
                                      <file-pond
                                        style="cursor:pointer"
                                        name="test"
                                        ref="pond_outros_documentos"
                                        class-name="my-pond"
                                        label-idle="Anexar aqui"
                                        :accepted-file-types="tipo"
                                        v-bind:files="myFiles"
                                        labelFileTypeNotAllowed="NÃO ACEITO"
                                        fileValidateTypeLabelExpectedTypes="É esperado um PDF"
                                      ></file-pond>
                                    </span>
                                  </v-card-text>
                                </v-card>
                              </v-hover>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-btn class="white--text" color="blue darken-4" @click="e6 = 1">
                          <v-icon small>fas fa-arrow-up</v-icon>
                          <span class="pl-2">
                            <b>voltar</b>
                          </span>
                        </v-btn>
                        <v-btn color="red darken-4" class="white--text" @click="dialog = false">
                          <v-icon small>fas fa-times</v-icon>
                          <span class="pl-2">
                            <b>Fechar</b>
                          </span>
                        </v-btn>
                        <v-btn
                          class="white--text"
                          color="green darken-4"
                          @click="SalvarInstrumento(), SalvarDoacao(),SalvarDocumentosDoacao()"
                        >
                          <v-icon small>fas fa-save</v-icon>
                          <span class="pl-2">
                            <b>salvar instrumento</b>
                          </span>
                        </v-btn>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import firebase from "firebase";

//Import FilePond
import vueFilePond from "vue-filepond";

// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
import FilePondPluginFileRename from "filepond-plugin-file-rename";

// Import styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileRename
);
import swal from "sweetalert2";
import CadDoacao from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/CadastrarDoacaoModal";
import CadCompra from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/CadastrarCompraModal";
import StoreInstrumento from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeInstrumento";
import StoreDoacao from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeDoacao";
import StoreCompra from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/store/storeCompra";
import { VMoney } from "v-money";
import CadNota from "@/pages/Modulos/Patrimonio/Instrumento/Cadastros/CadastroNotaFiscalP";
import CadAno from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Ano";
import CadTombamento from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Tombamento";
import CadNome from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Nome";
import CadMarca from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Marca";
import CadCaracteristica from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Caracteristica";
import CadComponente from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Instrumento/Cadastro/Cadastro_Componente";
import CadEmpresa from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Compra/Cadastro/Cadastro_Empresa";
import CadOrigem from "@/pages/Modulos/Patrimonio/CadastroInstrumento/Doacao/Origem/CadastroOrigem";

export default {
  components: {
    CadDoacao,
    CadCompra,
    CadNota,
    FilePond,
    CadAno,
    CadTombamento,
    CadNome,
    CadMarca,
    CadCaracteristica,
    CadComponente,
    CadEmpresa,
    CadOrigem
  },
  directives: { money: VMoney },
  computed: {
    computedDateFormattedCompra() {
      return this.formatDate(this.data_compra);
    },
    computedDateFormattedDoacao() {
      return this.formatDate(this.data_doacao);
    }
  },
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      observacao_instrumento: "Sem observações",
      origem: null,
      origens: [],
      dialog_doacao_modal: false,
      data_doacao: null,
      modal_doacao: false,
      observacao: "Sem observações",
      tab: null,
      myFiles: [],
      arquivos: [],
      tipo: ["application/pdf"],
      e6: 1,
      nome: null,
      nomes: [],
      naipe: null,
      ano: null,
      anos: [],
      tombamento: null,
      tombamentos: [],
      caracteristica: null,
      caracteristicas: [],
      marca: null,
      marcas: [],
      componente: null,
      componentes: [],
      data_nascimento: null,
      dialog: false,
      observacao: "Sem observações",
      editar: false,
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
  watch: {
    dialog: function() {
      if (this.dialog == true) {
        this.Fechar();
        this.CarregarDados();
      }
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.data_doacao, this.data_compra);
    }
  },

  methods: {
    SalvarTermoNotaFiscal: function() {
      this.arquivos = this.$refs.pond_nota_fiscal.getFiles();
      if (this.arquivos.length == 1) {
        var d = new Date();
        const storageRef = firebase
          .storage()
          .ref(
            "Instrumentos/NotasFiscais/nota_fiscal_" + this.tombamento + ".pdf"
          )
          .put(this.arquivos[0].file);
      }
    },
    SalvarDocumentosDoacao() {
      this.SalvarNotaFiscalDoacao();
      this.SalvarTermoDoacao();
      this.SalvarOutrosDocumentosDoacao();
    },
    SalvarNotaFiscalDoacao: function() {
      this.arquivos = this.$refs.pond_nota_fiscal_doacao.getFiles();
      if (this.arquivos.length == 1) {
        var d = new Date();
        const storageRef = firebase
          .storage()
          .ref(
            "Instrumentos/NotasFiscaisDoacao/nota_fiscal_doacao_" +
              this.tombamento +
              ".pdf"
          )
          .put(this.arquivos[0].file);
      }
    },
    SalvarTermoDoacao: function() {
      this.arquivos = this.$refs.pond_termo_doacao.getFiles();
      if (this.arquivos.length == 1) {
        var d = new Date();
        const storageRef = firebase
          .storage()
          .ref(
            "Instrumentos/TermosDoacao/termo_doacao_" + this.tombamento + ".pdf"
          )
          .put(this.arquivos[0].file);
      }
    },
    SalvarOutrosDocumentosDoacao: function() {
      this.arquivos = this.$refs.pond_outros_documentos.getFiles();
      if (this.arquivos.length == 1) {
        var d = new Date();
        const storageRef = firebase
          .storage()
          .ref(
            "Instrumentos/OutrosDocumentosDoacao/documentos_doacao_" +
              this.tombamento +
              ".pdf"
          )
          .put(this.arquivos[0].file);
      }
    },
    Editar() {
      this.editar = true;
    },
    NaoEditar() {
      this.editar = false;
    },
    SalvarInstrumento() {
      let aquisicao = "";
      if (this.nota != null) {
        aquisicao = "2";
      } else {
        aquisicao = "1";
      }
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .post(
          this.$url + "Instrumento/v1",
          {
            id: 0,
            nome: this.nome.nome,
            ano: this.ano,
            status: "1",
            aquisicao: aquisicao,
            tombamento: this.tombamento,
            componentes: this.componente.toString(),
            caracteristica: this.caracteristica,
            marca: this.marca,
            descricao: this.descricao,
            launchDate: new Date().toISOString().substr(0, 19)
          },
          {
            headers: { authorization: "Bearer " + autorizacao.accessToken }
          }
        )
        .then(response => {
          ////console.log(response.status);
          if (response.status == 200) {
            this.$emit("instrumentos");
            this.$http.put(
              this.$url +
                "TombamentoInstrumento/v1/selecionar-tombamento?tombamento=" +
                this.tombamento,
              {
                id: 0,
                numero: this.tombamento,
                status: 2
              },
              {
                headers: { authorization: "Bearer " + autorizacao.accessToken }
              }
            );
          }
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    SalvarCompra() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .post(
          this.$url + "CompraInstrumento/v1",
          {
            id: 0,
            valor: this.preco_instrumento,
            tombamento: this.tombamento,
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
        });
    },
    SalvarDoacao() {
      /*console.log(
        this.data_doacao,
        this.origem_instrumento,
        this.observacao_instrumento,
        this.numero_do_instrumento
      );*/
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou no cadastro doacao");
        this.$http
          .post(
            this.$url + "DoacaoInstrumento/v1",
            {
              id: 0,
              tombamento: this.tombamento,
              origem: this.origem,
              observacao: this.observacao_instrumento,
              dataDoacao: this.data_doacao,
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
              //console.log("doação cadastrada");
            }
            //console.log(response.data);
          });
      }
    },
    Fechar() {
      this.ano = null;
      this.nome = null;
      this.tombamento = null;
      this.marca = null;
      this.componente = null;
      this.caracteristica = null;
      this.observacao = "Sem observações";
      this.empresa = null;
      this.nota = null;
      this.data_compra = null;
      this.preco_instrumento = 0.0;
      this.money = {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      };
      this.origem = null;
      this.data_doacao = null;
      this.observacao = "Sem observações";
    },

    CarregarDados() {
      this.BuscarEmpresas();
      this.BuscarDoacao();
      StoreInstrumento.dispatch("BuscandoTombamentosInstrumentos");
      this.anos = [];
      StoreInstrumento.state.anos.forEach(element => {
        this.anos.push({ id: element.id, numeroAno: element.numeroAno });
      });
      this.nomes = [];
      StoreInstrumento.state.nomes.forEach(element => {
        this.nomes.push({
          id: element.id,
          nome: element.nome,
          naipe: element.naipe
        });
      });
      this.tombamentos = [];
      this.tombamentos = StoreInstrumento.state.tombamentos;
      //console.log(StoreInstrumento.state.tombamentos);
      StoreInstrumento.state.marcas.forEach(element => {
        this.marcas.push({ id: element.id, marca: element.marca });
      });
      StoreInstrumento.state.componentes.forEach(element => {
        this.componentes.push({
          id: element.id,
          componente: element.componente
        });
      });
    },
    AtualizarCaracteristicas() {
      let dados_nome_instrumento = this.nome;
      this.EscolherNaipe(dados_nome_instrumento.nome);
    },
    EscolherNaipe(payload) {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .get(
          this.$url +
            "CaracteristicaInstrumento/v1/buscar-caracteristica-por-naipe?naipe=" +
            payload,
          { headers: { authorization: "Bearer " + autorizacao.accessToken } }
        )
        .then(response => {
          ////console.log(response.status);
          if (response.status == 200) {
            ////console.log(response.data)
            this.caracteristicas = response.data;
          }
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    BuscarEmpresas() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .get(this.$url + "Empresa/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log(response.data)
            this.empresas = response.data;
          }
        })
        .catch(e => {
          //console.error(e);
          // console.data(e.data);
        });
    },
    BuscarDoacao() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .get(this.$url + "OrigemInstrumento/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          //console.log(response.status);
          if (response.status == 200) {
            //console.log(response.data)
            response.data.forEach(element => {
              this.origens.push({
                id: element.id,
                nome:
                  element.doador + " - " + element.cidade + "/" + element.estado
              });
            });
          }
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    BuscarTombamentos() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.$http
        .get(this.$url + "TombamentoInstrumento/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          ////console.log(response.status);
          if (response.status == 200) {
            this.tombamentos = [];
            response.data.forEach(element => {
              if (element.status == 1) {
                this.tombamentos.push({
                  id: element.id,
                  numero: element.numero
                });
              }
            });
          }
        })
        .catch(e => {
          //console.error(e);
          //console.data(e.data);
        });
    },
    BuscandoNomesInstrumentos() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.nomes = [];
      this.$http
        .get(this.$url + "NomeInstrumento/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          if (response.status == 200) {
            response.data.forEach(element => {
              this.nomes.push(element);
            });
          }
        });
    },
    BuscandoMarcasInstrumentos() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.marcas = [];
      this.$http
        .get(this.$url + "MarcaInstrumento/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          if (response.status == 200) {
            response.data.forEach(element => {
              this.marcas.push(element);
            });
          }
        });
    },
    BuscandoAnosInstrumentos() {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.anos = [];
      this.$http
        .get(this.$url + "Ano/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          if (response.status == 200) {
            response.data.forEach(element => {
              this.anos.push(element);
            });
          }
        });
    },
    BuscandoComponentesInstrumentos(context) {
      let Usuario = sessionStorage.getItem("usuario");
      let autorizacao = JSON.parse(Usuario);
      this.componentes = [];
      this.$http
        .get(this.$url + "ComponenteInstrumento/v1", {
          headers: { authorization: "Bearer " + autorizacao.accessToken }
        })
        .then(response => {
          if (response.status == 200) {
            response.data.forEach(element => {
              this.componentes.push(element);
            });
          }
        });
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
