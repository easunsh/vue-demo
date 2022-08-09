import { RootState } from "../../app/app.store";
import { Module } from "vuex";

//给state的类型定义，并导出
export interface PostCreateStoreState{
    loading: boolean;
}


 /* Module 2个参数，定义类型
 * 一个是模块内的state的类型
 * 一个是rootstate，是store整体的state类型
 */
 export const postCreateStoreModule: Module < PostCreateStoreState , RootState > = {
    //避免模块多了重名现象
    namespaced: true,
    
    state: {
        loading: false,
    } as PostCreateStoreState,

    getters: {
        loading( state ){
            return state.loading;
        }
    },
};


