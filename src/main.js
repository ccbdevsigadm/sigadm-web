import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import '../static/css/style.css';
// Translation provided by Vuetify (javascript)
import Pt from 'vuetify/es5/locale/pt';
import axios from 'axios';
import * as FilePond from 'filepond';


const firebaseConfig = {
  apiKey: "AIzaSyDE9G4T8MLY8YldNejRIXjDQ7s0hTIzBTQ",
  authDomain: "sigadm-documentoz.firebaseapp.com",
  databaseURL: "https://sigadm-documentoz.firebaseio.com",
  projectId: "sigadm-documentoz",
  storageBucket: "sigadm-documentoz.appspot.com",
  messagingSenderId: "620545829045",
  appId: "1:620545829045:web:f25c78a0d2d2991ca8f6fc"
};
firebase.initializeApp(firebaseConfig);

// Create a multi file upload component
const pond = FilePond.create({
  multiple: true,
  name: 'filepond'
});
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.prototype.$http = axios;
Vue.prototype.$url = 'https://sigadm-patrimonio-services.herokuapp.com/api/'
//Vue.prototype.$url = 'http://localhost:49775/api/';
Vue.use(Vuetify, {
  lang: {
    locales: { pt: Pt },
    current: 'pt'
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
