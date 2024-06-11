// import './assets/tailwind.css'
import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { Carousel, Image } from 'ant-design-vue';
import router from './router'

const app = createApp(App)
app.use(Carousel)
app.use(Image)
app.use(router)

app.mount('#app')
