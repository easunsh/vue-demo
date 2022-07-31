
import { createStore , createLogger } from "vuex";
import user , { UserState } from '@/user/user.store';
import { logger } from './app.plugin';

export interface RootState {
    name: string;
    loading: boolean;
    user?: UserState;
}

/**
 * 创建STORE
 */
const store = createStore({

    state: {    //应用需要用的数据
        name:'宇宙还未创建',
        loading: false,    //加载状态，
    },
    getters: {   
        name( state ){
            return `name is ${state.name} from getters` ;
        } 
    },
    mutations: {     //设置修改STATE用的一些方法
        setName( state , data ){
            state.name = data;
        },

        setLoading( state , data ){
            state.loading = data;
        }
    },
    actions: {   //定义获取数据用的方法，然后执行mutations，去 设置STATE
        
        getName( { commit } ){
            commit('setLoading', true);
            setTimeout(()=>{
                const name = '--action中提交的新值元宇宙--';
                commit('setName',name);
                commit('setLoading',false);
            },2000);
        }
        
        //只用context里的某个，可以解构出来用
        // getName({ commit })
        //commit('setName',name);
        // getName(context) {
        //     const name = '--action中提交的新值元宇宙--';
        //     context.commit('setName',name);
        // }
 
    },
    modules: {   
        user,  // 简写，相当于user: user,
        //在 action 里 打印下 context里的 rootState就能多一个user的store
    },

    plugins:[ createLogger() , logger ],

});

export default store;