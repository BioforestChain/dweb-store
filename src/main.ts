// import './assets/tailwind.css'
import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

// 在非生产环境下动态导入调试工具
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
