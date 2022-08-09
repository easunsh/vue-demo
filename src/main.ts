import { createApp } from "vue";
import App from './app/app.vue'
//导入VUEX
import appStore from './app/app.store';

/**
 * 创建VUE应用
 */
const app = createApp(App);

/**
 * 应用STORE
 */
app.use(appStore);

/**
 * 挂载应用
 * 挂到public\index.html
 */
app.mount('#app');