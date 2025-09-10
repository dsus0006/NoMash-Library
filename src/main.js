// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0F44tXIec4pu-xlpt-PLHUsjYEPGR75o",
  authDomain: "week7-dsusanto.firebaseapp.com",
  projectId: "week7-dsusanto",
  storageBucket: "week7-dsusanto.firebasestorage.app",
  messagingSenderId: "162324637205",
  appId: "1:162324637205:web:99148aa6fcf0e7acf0d01c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

app.mount('#app')
