import { RootState } from "../app/app.store";
import { Module } from "vuex";
import { 
    postCreateStoreModule ,
    PostCreateStoreState ,
} from "./create/post-create.store";

//给state的类型定义，并导出
export interface PostStoreState {
    //引入子模块的state类型定义
    create: PostCreateStoreState;
}

 /* Module 2个参数，定义类型
 * 一个是模块内的state的类型
 * 一个是rootstate，是store整体的state类型
 */
export const postStoreModule: Module<PostStoreState , RootState> = { 
    namespaced: true,

    modules: {  //引入子模块并命名
       create: postCreateStoreModule, 
    }
};