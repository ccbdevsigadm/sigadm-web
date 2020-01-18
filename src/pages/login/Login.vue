<template>
  <login-patrimonio>
    
    <div class="login-page">
      <div class="login-box align-center">
        <div class="logo">
          <a href="javascript:void(0);">SIGADM</a>
          <!-- RENDERIZANDO UMA STATE VUEX
          <p>{{ $store.getters.flavor }}</p>
          -->
          <span class="font-weight-medium white--text font-italic">Administração do departamento musical</span>
        </div>
        <span v-if="!recuperarSenha">
          <div class="card">
            <div class="body">
              <span class="msg font-weight-medium blue--text text--darken-4 font-italic">Iniciar sessão</span>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  append-icon="fas fa-envelope"
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                  
                  color="light-blue darken-4"
                  required
                ></v-text-field>
                <v-text-field
                  color="light-blue darken-4"
                  type="password"
                  
                  v-model="accessKey"
                  :rules="senhaRules"
                  label="Senha"
                  required
                  append-icon="fas fa-lock"
                ></v-text-field>  
                              
                <v-btn
                class="white--text"
                  v-if="barra == false"
                  type="submit"                  
                  @click.stop="dialog = true"
                  @click="submit"
                  color="blue darken-4"
                  outline
                >
                <v-icon small left dark>fas fa-sign-in-alt</v-icon> 
                  Entrar                 
                </v-btn>
              </v-form>
            </div>
          </div>
        </span>
      </div>
    </div>
    <v-layout row justify-center>
      <v-dialog v-model="barra" max-width="150" persistent>
        <v-card>
          <v-card-title class="subheader light-blue darken-4 white--text">
            <v-flex align-center>AUTORIZAÇÃO</v-flex>
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
                  <v-icon small color="light-blue darken-4">fas fa-shield-alt</v-icon>
                </v-progress-circular>
                <br />
                <h5 class="light-blue--text text--darken-4">Verificando...</h5>
              </span>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </login-patrimonio>
</template>

<script>
import LoginPatrimonio from "@/templates/LoginPatrimonio.vue";
import swal from "sweetalert2";
import toast from "@/Alerts/toast"

export default {
  name: "Home",
  components: { LoginPatrimonio },
  data() {
    return {
      cor: "",
      barra: false,
      loader: null,
      loading: false,
      loading2: false,
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail é requerido",
        v => /.+@.+/.test(v) || "E-mail inválido!"
      ],
      senhaRules: [v => !!v || "Senha é requerida!"],
      recuperarSenha: false,
      accessKey: "",
      acesso: []
    };
  },
  methods: {
    submit() {
      //this.acesso = []
      if (this.$refs.form.validate()) {
        this.barra = true;
        this.$http
          .post(this.$url + "Login/v1", {
            login: this.email,
            accessKey: this.accessKey
          })
          .then(response => {
            if (response.data.autenticated == true) {
              //console.log(response);
              //console.log("Autorizado");
              sessionStorage.setItem("usuario", JSON.stringify(response.data));
              if (response.status == 200) {
                this.$router.push("/patrimonio-solicitacoes-emprestimos");                
              }
            } else if (response.data.autenticated == false) {
              //console.log(response);
              //console.log("Não autorizado");
              this.$router.push("/");
              this.barra = false;
              const toast = swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: "warning",
                title: "Não autorizado,verifique seus dados!"
              });
            } else {
              //console.log(response);
              const toast = swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: "warning",
                title: "Não autorizado,verifique seus dados!"
              });
            }
          })
          .catch(e => {
            //console.error(e);
            this.barra = false;
            toast.toast("top","error","Atenção", "Sem conexão com a internet ou falha do sistema.");
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), Infinity);

      this.loader = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.back {
  background-image: url(https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
  background-size: cover;
}
#inspire {
  background: none;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
  color: darkgreen;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
