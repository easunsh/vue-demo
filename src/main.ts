import { createApp } from "vue";
import App from './app/app.vue'

//路由
import appRouter from './app/app.router';

/**
 * 创建应用
 */
const app = createApp(App);

/**
 * 应用路由
 */
app.use( appRouter );

/**
 * 挂载应用
 * 挂到public\index.html
 */
app.mount('#app');