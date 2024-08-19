// import './assets/tailwind.css'
import 'virtual:uno.css'
import './main.css'

import { Carousel, Image } from 'ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Carousel)
app.use(Image)
app.use(router)

// 在非生产环境下动态导入并使用 vconsole
console.log('import.meta.env.MODE ', import.meta.env.MODE)
if (import.meta.env.MODE !== 'production') {
  import('vconsole')
    .then(({ default: VConsole }) => {
      new VConsole()
      console.log('Running with VConsole in development/test mode')
    })
    .catch((error) => {
      console.error('Failed to load VConsole:', error)
    })
}

app.mount('#app')
