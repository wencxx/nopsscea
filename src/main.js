import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
// import font to use
import '@fontsource/inter'; 

const pinia = createPinia()
 
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ToastPlugin)
app.component('Icon', Icon)
app.mount('#app')
