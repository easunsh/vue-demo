import { RouteRecordRaw } from 'vue-router';
import PostIndex from './index/post-index.vue';
import PostShow from './show/post-show.vue';
import PostMeta from './show/components/post-meta.vue'


/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
    {
        path : '/posts',
        name: 'postIndex',
        component: PostIndex,  //头部引入的vue
        props: {
            sort: 'pop',   //设置静态的属性值
        }
    },
    {
        path:'/posts/:postId',  //动态带参数的路由名字自己取postId
        name: 'postShow',
        component: PostShow,
        props: true,  //属性
        children:[   //子组件
            {
                path: 'meta',   //地址是父路由的地址加上meta 比如/posts/:postId/meta
                component: PostMeta
            },
        ],

    }

];

export default routes;