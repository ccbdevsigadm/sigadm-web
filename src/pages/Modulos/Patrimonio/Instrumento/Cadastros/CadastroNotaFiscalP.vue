<template>
  <v-layout>
    <v-flex xs12 sm12 md4 lg4 offset-md4 offset-lg4>
      <v-layout>
        <v-flex xs12 sm12>
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
              <v-card-title primary-title>
                <div>
                  <h3 class="subheading text-uppercase mb-0">NOTA FISCAL</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <span id="cadastrotermos">
                  <file-pond
                    style="cursor:pointer"
                    name="test"
                    ref="pond"
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
        <v-btn color="green darken-4" dark @click="Salvar">SALVAR INSTRUMENTO</v-btn>
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
  name: "cadastronota",
  data: function() {
    return { myFiles: [], arquivos: [], tipo: ["application/pdf"] };
  },
  methods: {
    Salvar(){
      ////console.log("Salvar nota fiscal")
      this.$emit("SalvarCompra");
    },
    handleFilePondInit: function() {
      //console.log("FilePond has initialized");

      // example of instance method call on pond reference
      //console.log(this.$refs.pond.getFiles());
      this.arquivos = this.$refs.pond.getFiles();
      //console.log(JSON.stringify(this.arquivos.values()));
      if (JSON.stringify(this.arquivos.values()) == "{}") {
        swal.fire(
          "Atenção!",
          "Precisa anexar a nota fiscal primeiro!",
          "warning"
        );
      }
      this.arquivos.forEach(element => {
        //console.log(element.file);
        let formData = new FormData();
        //console.log("numero", this.numero_tombamento);
        if (this.numero_tombamento == "") {
          swal.fire(
            "Atenção!",
            "O numero de tombamento precisa estar selecionado!",
            "warning"
          );
        } else {
          formData.append(
            "file",
            element.file,
            this.numero_tombamento + "-" + element.filename
          );
          //console.log("EXTESAO DO ARQUIVO TESTE: ", element.fileExtension);
          //console.log( "NOME SEM EXTENSAO DO ARQUIVO TESTE: ",   element.filenameWithoutExtension     );
        }
        //console.log(formData.getAll("file"));

        let autorizacaoAux = sessionStorage.getItem("usuario");
        if (autorizacaoAux && this.numero_tombamento != "") {
          this.autorizacao = JSON.parse(autorizacaoAux);
          //console.log("entrou no anexar nota fiscal");
          this.$http
            .post(
              this.$url + "CompraInstrumento/v1/salvar-notafiscal-instrumento",
              formData,
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
                  text:
                    "Anexe novamente outro documento para substituir esse, se necessário.."
                });
                //console.log(response.data);
                this.$emit("path_nota", { path: response.data });
                this.$emit("cadastrarCompra");
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
      });
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
  background-color: rgb(54, 64, 119);
}
</style>
  
  