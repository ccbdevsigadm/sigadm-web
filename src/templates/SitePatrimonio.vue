<template>
  <v-flex sm12 lg12 xs12 md12 class="ml-1">
    <v-toolbar app color="light-blue darken-4" :clipped-right="clipped" data-app>
      <v-flex xs2 sm1 md1 lg1>
        <v-btn
          icon
          outline
          color="white"
          @click.stop="rightDrawer = !rightDrawer"
          v-if="rightDrawer == false"
        >
          <v-icon>fas fa-bars</v-icon>
        </v-btn>
      </v-flex>
      <v-list-tile-avatar>
        <img src="https://icon-library.net/images/user-png-icon/user-png-icon-10.jpg" />
      </v-list-tile-avatar>
      <span class="white--text text--darken-3 pr-3">Email: {{usuario.email}}</span>
      <v-flex align-center xs6 sm5 md6 lg6></v-flex>
      <v-spacer></v-spacer>
       
      <v-tooltip bottom>
        <v-btn slot="activator" v-on:click="sair()" outline dark color="white">
          <small class="white--text">Sair</small>
          <v-icon small right dark color="red lighten-1">fas fa-sign-out-alt</v-icon>
        </v-btn>
        <span>SAIR</span>
      </v-tooltip>
    </v-toolbar>
    <v-flex xs12 sm12 md12 lg12  offset-md0 offset-lg0>
      <slot></slot>
    </v-flex>
    <v-navigation-drawer v-model="rightDrawer" fixed app width="300" class="light-blue darken-4">
      <v-toolbar color="light-blue darken-4">
        <v-toolbar-title class="white--text subheading">
          SIGADM       
        </v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            absolute
            right
            fab
            small
            outline
            class
            color="white"
            @click.stop="rightDrawer = !rightDrawer"
          >
            <v-icon color="white" dark>fas fa-bars</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        
        <v-list-tile @click="VerSolicitacoes()" color="color_patrimonio">
          <v-list-tile-action>
            <v-icon color="white darken-4">fas fa-file-import</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text text--darken-4">
            SOLICITACÕES 
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="VerEstoque()" color="color_patrimonio">
          <v-list-tile-action>
            <v-icon color="white darken-4">fas fa-layer-group</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text text--darken-4">
            INSTRUMENTOS 
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="VerPesquisaEstoque()" color="color_patrimonio">
          <v-list-tile-action>
            <v-icon color="white darken-4">fas fa-search</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text text--darken-4">
            PESQUISA AVANÇADA
          </v-list-tile-title>
        </v-list-tile>
        <!--v-list-group class="white--text text--darken-4">
          <v-list-tile slot="activator">
            <v-icon left color="white darken-4">fas fa-music</v-icon>
            <v-tooltip bottom>
              <v-list-tile-title
                class="white--text text--darken-4 pl-3"
                slot="activator"
              >INSTRUMENTOS</v-list-tile-title>
              <span>CLICK PARA ABRIR</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="VerPesquisaEstoque()" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-search</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Pesquisa avançada</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="VerEstoque()" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Estoque de instrumentos</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="CadastrarInstrumento()" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-guitar</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Cadastrar instrumentos</v-list-tile-title>
          </v-list-tile>
          <v-list-group sub-group no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>Outros</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(crud, i) in cruds" :key="i" @click>
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </!--v-list-group>
        <v-list-group class="white--text text--darken-4">
          <v-list-tile slot="activator">
            <v-icon left color="white darken-4">fas fa-user-tie</v-icon>  
            <v-tooltip bottom>         
              <v-list-tile-title class="white--text text--darken-4 pl-3" slot="activator">IRMÃOS</v-list-tile-title>
            <span>CLICK PARA ABRIR</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="VerIrmaos()" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-user</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Irmãos cadastrados</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="CadastrarIrmaos()" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-user-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Cadastrar irmão</v-list-tile-title>
          </v-list-tile>
          <v-list-group-- sub-group no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>Outros</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(crud, i) in cruds" :key="i" @click>
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
          </v-list-tile>
        </v-list-group-->

        <v-list-tile @click="VerIrmaos()" color="color_patrimonio">
          <v-list-tile-action>
            <v-icon color="white darken-4">fas fa-user-tie</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text text--darken-4">
            IRMÃOS
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="VerCongregacoes()" color="color_patrimonio">
          <v-list-tile-action>
            <v-icon color="white darken-4">fas fa-map-marker-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text text--darken-4">
            SETORIZAÇÃO
          </v-list-tile-title>
        </v-list-tile>
        <!--v-list-group-- class="white--text text--darken-4">
          <v-list-tile slot="activator">
             <v-list-tile-action>
            <v-icon left color="white darken-4">fas fa-server</v-icon> 
             </v-list-tile-action>          
             <v-list-tile-title class="white--text text--darken-4">
            PROJETOS |
            <span class="grey--text text--lighten-1">GUIAS</span>
          </v-list-tile-title>      
          </v-list-tile>
          <v-list-tile class="pl-4" @click="" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fab fa-dev</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Modelo de desenvolvimento</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-layer-group</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Gerência de estoque</v-list-tile-title>
          </v-list-tile>
          <v-list-tile class="pl-4" @click="" sub-group>
            <v-list-tile-action>
              <v-icon color="white darken-4">fas fa-guitar</v-icon>
            </v-list-tile-action>
            <v-list-tile-title> Gerência de irmãos</v-list-tile-title>
          </v-list-tile>  
        </v-list-group-->       
        <v-list-tile style="cursor:pointer" class="mt-4" v-on:click="sair()" color="red lighten-2">
          <v-list-tile-action>
            <v-icon color="red lighten-1">fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="white--text text--lighten-3">SAIR DA CONTA</v-list-tile-title>
        </v-list-tile>
      </v-list>
       <v-footer absolute dark >
      <v-flex sm12 align-center >
        <span class="white--text"> 2019 - {{ new Date().getFullYear() }} —   </span>
        <span class="white--text"><strong>&copy;CCB Versão 1.0</strong></span>
      </v-flex>
    </v-footer>
    </v-navigation-drawer>
   
  </v-flex>
</template>

<script>
import swal from "sweetalert2";
//import AjudaPatrimonio from "@/pages/Modulos/Patrimonio/Ajuda/AjudaModal.vue";

export default {
  name: "SiteTemplate",
  components: {/*AjudaPatrimonio*/},
  data() {
    return {
      email: "",
      color_patrimonio: "",
      color_cadastro_instrumento: "",
      menu_patrimonio: true,
      menu_cadastro_instrumento: false,
      admins: [
        ["Cadastrar instrumento", "add", "Cadastrar_Instrumento()"],
        ["Pesquisar", "search"],
        ["Estatísticas", "trending_up"],
        ["Baixas", "close"]
      ],
      cruds: [
        ["", "add"],
        ["", "insert_drive_file"],
        ["", "update"],
        ["", "delete"]
      ],
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: true,
      title: "SIGADM",
      usuario: ""
    };
  },
  created() {
    let usuarioAux = sessionStorage.getItem("usuario");
    this.usuario = JSON.parse(usuarioAux);
  },
  methods: {
    VerEstoque() {
      this.$router.push("/inicio-patrimonio");
    },
    VerPesquisaEstoque() {
      this.$router.push("/inicio-patrimonio-pesquisa-avancada");
    },
    VerSolicitacoes(){
      this.$router.push("/patrimonio-solicitacoes-emprestimos");
    },
    CadastrarInstrumento() {
      this.$router.push("/cadastro-patrimonio-instrumento");
    },
    VerIrmaos() {
      this.$router.push("/patrimonio-irmaos-atendidos");
    },
    CadastrarIrmaos() {
      this.$router.push("/cadastro-patrimonio-novo-irmao");
    },
    VerCongregacoes() {
      this.$router.push("/patrimonio-igrejas");
    },
    VerEncarregados() {
      this.$router.push("/patrimonio-encarregados");
    },
    sair() {
      // logout
      const toast = swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      toast({
        type: "warning",
        title: "você saiu do sistema!"
      });
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
