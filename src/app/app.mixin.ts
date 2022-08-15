import { ComponentOptions, ComponentPublicInstance } from "vue";
import { APP_NAME } from "./app.config";

/**
 * 设置页面标题
 */
const setTitle =(vm: ComponentPublicInstance ) => {
    //获取组件里的title选项
    const { title } = vm.$options;

    if(title){
        let titleContent;
        if( typeof title ==='function'){
            //执行title
            titleContent =  title.call(vm);
        }else{
            titleContent = title;
        }

        document.title = `${titleContent} - ${APP_NAME}`;
    }

    //判断首页
    if(vm.$route.path === '/'){
        document.title = APP_NAME;
    }

};

/**
 * 标题混合
 * mixin是一个对象
 * 可以添加一些生命周期
 * 可以用在应用的全局在 main.tS中设置
 */
export const titleMixin: ComponentOptions = {
    created() {
       setTitle(this);
    },

    updated() {
        setTitle(this);
    },
}