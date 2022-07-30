/**
 * 创建路由器
 */
import { createRouter , createWebHistory , RouteRecordRaw } from 'vue-router';

//导入组件
import Index from './components/router-demo-index.vue';
import About from './components/router-demo-about.vue';

//导入路由模块 @是别名，代表src目录
import postRoutes from '@/post/post.routes';

/**
 * 定义路由
 * 每一个路由都是一个对象
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',   //根路径
        component: Index,
        meta: {   //元数据
            requireAuth: true, //标识一下需要验证
         },
    },

    {
        path: '/about',  //路径
        name: 'about',  //给路由起一个名字
        component: About,
        meta: {   //元数据
           requireAuth: true, //标识一下需要验证
        },
    },
    {
        path: '/about-us',   
       // redirect: '/about', //重定向到about
       //redirect: { name: 'about' }, //重定向到about,路由名写法
       redirect: to => {   //做一下判断也可以，传一个to参数
        console.log(to)
         return '/about';
       },
    },

    
    ...postRoutes,  //引入路由模块
];

/**
 * 创建路由
 */
const router = createRouter({
    history: createWebHistory(),
    routes,
});

/**
 * 导航守卫
 * 箭头函数3个参数
 * to 是用户要访问的路由
 * from 是用户来自哪个路由
 * next 要完成这个函数才能继续导航
 * 暂时用不到可注释
 */
router.beforeEach( ( to , from , next ) => {
    console.log('查看导航守卫');
    console.log('to' , to );
    console.log('from ' , from );

    //多层嵌套路由是一个数组，用matched.some去比对
    // 里面有meta定义了自定义的requireAuth为true就返回true
    // 没有，就返回 false
    const requireAuth = to.matched.some(
        record => record.meta.requireAuth
    );

    if( requireAuth ){
        console.log('验证登录');
    }
    
    next();


     //一个测试，如果要访问postIndex ，就重定向到首页
    // if( to.name === 'postIndex'){   //单层，可以用，多层嵌套路由，用matched
    //     next('/');
    // }else{
    //     next();
    // }


});


export default router;