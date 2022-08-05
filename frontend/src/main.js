import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faNoteSticky, faThumbsUp, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare, faTrashCan, faBan, faShapes } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram, faFortAwesome } from '@fortawesome/free-brands-svg-icons'

import NavMenu from './components/NavMenu.vue'
import LoginForm from './components/LoginForm.vue'
import CardHeader from './components/CardHeader.vue'
import CreateModal from './components/CreateModal.vue'
import TableDisplay from './components/TableDisplay.vue'

import App from './App.vue'
import './assets/main.css'
import router from './router'
import 'element-plus/dist/index.css'

library.add(faBan)
library.add(faShapes)
library.add(faTwitter)
library.add(faTrashCan)
library.add(faThumbsUp)
library.add(faFacebook)
library.add(faInstagram)
library.add(faNoteSticky)
library.add(faShareSquare)
library.add(faPenToSquare)
library.add(faFortAwesome)

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
  .component('NavMenu', NavMenu)
  .component('LoginForm', LoginForm)
  .component('CardHeader', CardHeader)
  .component('CreateModal', CreateModal)
  .component('TableDisplay', TableDisplay)

app.use(VueAxios, axios)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')