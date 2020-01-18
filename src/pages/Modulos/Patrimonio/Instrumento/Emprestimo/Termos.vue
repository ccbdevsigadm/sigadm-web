<template>
  <v-flex xs12 sm12 md12 lg12>
    <v-flex xs12 sm12 md12 lg12 > <span class="font-weight-bold headline blue--text text--darken-4">Anexos</span></v-flex>
    <v-layout> 
      <v-flex xs12 sm12 md12 lg12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">            
            <v-card-text>
              <span id="cadastrotermos">
              <file-pond
                style="cursor:pointer"
                name="test"
                ref="pond"
                class-name="my-pond"
                label-idle="TERMO DE RESPONSABILIDADE"
                :accepted-file-types="tipo"
                v-bind:files="myFiles"
                labelFileTypeNotAllowed="NÃO ACEITO"
                fileValidateTypeLabelExpectedTypes="É esperado um PDF"
              >               
              </file-pond>
            </span>
            </v-card-text>            
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
           
            <v-card-text>
              <span id="cadastrotermos">
              <file-pond
                style="cursor:pointer"
                name="test"
                ref="pondciencia"
                class-name="my-pond"
                label-idle="TERMO DE CIÊNCIA PARA MINISTÉRIO LOCAL"
                :accepted-file-types="tipo"
                v-bind:files="myFiles"
                labelFileTypeNotAllowed="NÃO ACEITO"
                fileValidateTypeLabelExpectedTypes="É esperado um PDF"
              >               
              </file-pond>
            </span>
            </v-card-text>            
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>

    <v-flex xs12 sm12 md12 lg12 align-center>
      <v-btn
        flat
        color="green darken-2"
        dark
        v-on:click="Anexar(),TermoCiencia(), TermoResponsabilidade()"
      >
      <v-icon small left dark>fas fa-save</v-icon>
        Salvar anexos        
      </v-btn>
    </v-flex>
  </v-flex>
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
import firebase from 'firebase';
// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileRename
);

export default {
  props: ["solicitacao"],
  name: "termos",
  data: function() {
    return {
      myFiles: [],
      arquivos: [],
      tipo: ["application/pdf"],
      emprestimos: [],
      emprestimo: "",
      nome: ""
    };
  },
  methods: {
    TermoResponsabilidade: function() {
      this.arquivos = this.$refs.pond.getFiles();
      if (this.arquivos.length == 1) {
        var d = new Date();
          const storageRef = firebase.storage().ref("TermosEmprestimos/"+d.getFullYear+"/termo_responsabilidade_"+this.solicitacao.id+".pdf").put(this.arquivos[0].file);
        }      
    },
    TermoCiencia: function() {
      this.arquivos = this.$refs.pondciencia.getFiles();
      if (this.arquivos.length == 1) {
          const storageRef = firebase.storage().ref("TermosEmprestimos/"+d.getFullYear+"/termo_ciencia_"+this.solicitacao.id+".pdf").put(this.arquivos[0].file);
        }      
    },
    Anexar() {
      this.$emit("anexar-solicitacao");
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
  background-color: rgb(82, 165, 165);
}
</style>
  
  