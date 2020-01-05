import Vue from 'vue'
import App from './App.vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import JQuery from 'jquery';
import VueFirestore from 'vue-firestore'
import {fb} from './firebase'
import Swal from 'sweetalert2'

window.$  = window.JQuery = JQuery;
import './assets/app.scss'
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.Toast = Toast;

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueFirestore)

Vue.component('Navbar', require('./components/Navbar.vue').default);

let app = "";

fb.auth().onAuthStateChanged(function(user) {
  if(!app){
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});

