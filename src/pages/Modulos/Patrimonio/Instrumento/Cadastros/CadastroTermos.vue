<template>
  <v-layout>
    <v-flex xs12 sm12 md12 lg12>
      <v-layout>
        <v-flex xs12 sm12 md4 lg4>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
              <v-card-title primary-title>
                <div>
                  <h3 class="font-weight-bold subheading blue--text text--darken-4">
                    Termo da doação
                  </h3>
                </div>
              </v-card-title>
              <v-card-text>
                <span id="cadastrotermos">
                  <file-pond
                    style="cursor:pointer"
                    name="test"
                    ref="pondtermodoacao"
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
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
              <v-card-title primary-title>
                <div>
                  <h3 class="font-weight-bold subheading blue--text text--darken-4">
                    Nota fiscal
                  </h3>
                </div>
              </v-card-title>
              <v-card-text>
                <span id="cadastrotermos">
                  <file-pond
                    style="cursor:pointer"
                    name="test"
                    ref="pondnotafiscal"
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
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
              <v-card-title primary-title>
                <div>
                  <h3 class="font-weight-bold subheading blue--text text--darken-4">
                    Outros documentos
                  </h3>
                </div>
              </v-card-title>
              <v-card-text>
                <span id="cadastrotermos">
                  <file-pond
                    style="cursor:pointer"
                    name="test"
                    ref="pondoutrosdocs"
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
       <!--
    <v-flex xs12 sm12 md12 lg12 align-center>
      <v-btn        
        color="green darken-4"
        dark
        v-on:click="handleFilePondInit"
      >
        SALVAR INSTRUMENTO
      </v-btn>
    </v-flex>-->
    <v-flex xs12 sm12 md12 lg12 align-center>
      <v-btn        
        color="green darken-4"
        dark
      >
        SALVAR INSTRUMENTO
      </v-btn>
    </v-flex>
    </v-flex>
  </v-layout>
</template>  
  <script>
// Import FilePond
import vueFilePond from "vue-filepond";
// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import swal from "sweetalert2";
// Import styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileRename
);
export default {
  props: ["numero_tombamento"],
  name: "cadastrotermos",
  data: function() {
    return {
      myFiles: [],
      arquivos: [],
      tipo: ["application/pdf"],
      termo_valid: false
    };
  },
  methods: {
    handleFilePondInit: function() {
      ////console.log("FilePond has initialized");
      // example of instance method call on pond reference
      ////console.log('Termo Doacao arquivo',this.$refs.pondtermodoacao.getFiles());
      this.termoDoacao(this.$refs.pondtermodoacao.getFiles());
      ////console.log("Nota fiscal doação arquivo",this.$refs.pondnotafiscal.getFiles());
      this.notaFiscal(this.$refs.pondnotafiscal.getFiles());
      ////console.log("outros docs doação arquivo",this.$refs.pondoutrosdocs.getFiles());
      this.outrosDocs(this.$refs.pondoutrosdocs.getFiles());
      if (this.termo_valid == false) {
        swal.fire(
          "Atenção!",
          "O Termo de  precisa ser anexada ao instrumento!",
          "warning"
        );
      } else {
        this.$emit("cadastrarDoacao");
      }
    },
    termoDoacao(termo) {
      ////console.log('Tamanho da quantidade termos de doacao',termo.length);
      if (termo.length == 0) {
        ////console.log('Tamanho da quantidade termos de doacao dentro do eslse if',termo.length);
        swal.fire(
          "Atenção!",
          "O Termo de  precisa ser anexada ao instrumento!",
          "warning"
        );
      } else if (termo.length == 1) {
        termo.forEach(element => {
          ////console.log(element.file);
          let formData = new FormData();
          ////console.log("numero", this.numero_tombamento);
          if (this.numero_tombamento == "") {
            swal.fire(
              "Atenção!",
              "Para continuar numero de tombamento precisa ser selecionado!",
              "warning"
            );
          } else {
            formData.append(
              "file",
              element.file,
              this.numero_tombamento + "-" + element.filename
            );
          }
          this.salvarTermo(formData);
          this.termo_valid = true;
          // //console.log(formData.getAll("file"));
        });
      }
    },
    salvarTermo(termo) {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou para anexar termo de doação");
        this.$http
          .post(
            this.$url + "DoacaoInstrumento/v1/salvar-termo-doacao-instrumento",
            termo,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            if (response.status == 200) {
              this.dialog = false;
              swal.fire({
                type: "success",
                title: "Anexado com sucesso",
                text: "..."
              });
              //console.log(response.data);
              this.$emit("path_nota", { path: response.data });
            } else if (response.status == 401) {
            } else if (response.status == 500) {
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
    },
    notaFiscal(nota) {
      //console.log("Tamanho da quantidade outros docs de doacao", nota.length);
      if (nota.length == 1) {
        nota.forEach(element => {
          //console.log(element.file);
          let formData = new FormData();
          //console.log("numero", this.numero_tombamento);
          if (this.numero_tombamento == "") {
            swal.fire(
              "Atenção!",
              "Para continuar numero de tombamento precisa ser selecionado!",
              "warning"
            );
          } else {
            formData.append(
              "file",
              element.file,
              this.numero_tombamento + "-" + element.filename
            );
          }
          this.salvarNota(formData);
          //console.log(formData.getAll("file"));
        });
      }
    },
    salvarNota(nota) {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou para anexar Nota Fiscal");
        this.$http
          .post(
            this.$url + "DoacaoInstrumento/v1/salvar-nota-doacao-instrumento",
            nota,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            if (response.status == 200) {
              this.dialog = false;
              swal.fire({
                type: "success",
                title: "Anexado com sucesso",
                text: "..."
              });
              //console.log(response.data);
              this.$emit("path_nota", { path: response.data });
            } else if (response.status == 401) {
            } else if (response.status == 500) {
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
    },
    outrosDocs(docs) {
      //console.log("Tamanho da quantidade notas de doacao", docs.length);
      docs.forEach(element => {
        //console.log(element.file);
        let formData = new FormData();
        //console.log("numero", this.numero_tombamento);
        if (this.numero_tombamento == "") {
          swal.fire(
            "Atenção!",
            "Para continuar o numero de tombamento precisa ser selecionado!",
            "warning"
          );
        } else {
          formData.append(
            "file",
            element.file,
            this.numero_tombamento + "-" + element.filename
          );
        }
        this.salvarDocs(formData);
        //console.log(formData.getAll("file"));
      });
    },
    salvarDocs(doc) {
      let autorizacaoAux = sessionStorage.getItem("usuario");
      if (autorizacaoAux) {
        this.autorizacao = JSON.parse(autorizacaoAux);
        //console.log("entrou para anexar Nota Fiscal");
        this.$http
          .post(
            this.$url + "DoacaoInstrumento/v1/salvar-outros-doacao-instrumento",
            doc,
            {
              headers: {
                authorization: "Bearer " + this.autorizacao.accessToken
              }
            }
          )
          .then(response => {
            if (response.status == 200) {
              this.dialog = false;
              swal.fire({
                type: "success",
                title: "Anexado com sucesso",
                text: "..."
              });
              //console.log(response.data);
              this.$emit("path_nota", { path: response.data });
            } else if (response.status == 401) {
            } else if (response.status == 500) {
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
  },
  components: {
    FilePond
  }
};
</script>
  <style  type="text/css">
/* the text color of the drop label*/
.filepond--drop-label {
  color: white;
}
.filepond--panel-root {
  background-color: rgb(43, 48, 128);
}
</style>
  
  