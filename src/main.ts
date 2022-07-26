import { createApp } from "vue";
import App from './app/app.vue'

/**
 * 创建应用
 */
const app = createApp(App);

/**
 * 挂载应用
 * 挂到public\index.html
 */
app.mount('#app');