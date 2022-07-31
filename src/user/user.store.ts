import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface UserState {
    currentUser: string;
}
/**
 * 创建USER STORE
 * 因为是模块，类型是Module
 */
 const store: Module< UserState , RootState >  = {

    namespaced: true,

    state: {    //应用需要用的数据
        currentUser:'',
    },
    
    getters: {
        currentUser(state){
            return state.currentUser;
        }
    },
    
    mutations: {
        setCurrentUser( state , data ){
            state.currentUser = data;
        },
    },

    actions: {
        getCurrentUser( context ){
            const user = 'sunyi';
            context.commit('setCurrentUser',user);
        }
    }
   
};

export default store;