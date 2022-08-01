import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

import CreateModal from './components/CreateModal.vue'
import TableDisplay from './components/TableDisplay.vue'
import App from './App.vue'
import './assets/main.css'
import 'element-plus/dist/index.css'

library.add(faTwitter);
library.add(faFacebook);
library.add(faTrashCan);
library.add(faInstagram);
library.add(faPenToSquare);

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
  .component('CreateModal', CreateModal)
  .component('TableDisplay', TableDisplay)
app.use(VueAxios, axios)
app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')