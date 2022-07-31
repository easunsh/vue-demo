import { Plugin } from 'vuex';
import { RootState } from '@/app/app.store';

/**
 * 导出一个插件
 * 名字可以随便定义
 * 类型为Plugin
 */
export const logger: Plugin<RootState> = store => {

    /**
     * 2个参数，
     * mutation 就是当前发生的修改
     * state 是store 里当前的数据
     */
    store.subscribe( ( mutation , state ) =>{
        console.log('logger is ---' , mutation , state );
    })
}