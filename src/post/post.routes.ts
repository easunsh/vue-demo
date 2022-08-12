import { RouteRecordRaw } from 'vue-router';
import PostIndex from './index/post-index.vue';
import PostShow from './show/post-show.vue';

/**
 * 定义路由
 */
const routes: Array< RouteRecordRaw > = [
    {
        name: 'postIndex',
        path: '/posts',
        component: PostIndex,
    },
    {
        name: 'postShow',
        path: '/posts/:postId',
        component: PostShow,
        props: true,   
        // props: true,路由里的参数会当作属性传递给组件PostShow
        // PostShow 可以定义一个postId
    },
];

/**
 * 默认导出
 */
export default routes;