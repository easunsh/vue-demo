import { createApp } from "vue";
import App from './app/app.vue'
//导入VUEX
import appStore from './app/app.store';
import appRouter from './app/app.router';
import { titleMixin } from './app/app.mixin';

/**
 * 创建VUE应用
 */
const app = createApp(App);

/**
 * 应用STORE
 */
app.use(appStore);

/**
 * 应用路由
 */
app.use(appRouter);

/**
 * 标题混合
 */
app.mixin(titleMixin);

/**
 * 挂载应用
 * 挂到public\index.html
 */
app.mount('#app');