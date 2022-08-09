import { createStore } from "vuex";
import { postStoreModule, PostStoreState } from "../post/post.store";

/**
 * 创建rootstate
 */
export interface RootState {
    appName: string;
    post: PostStoreState;
}

/**
 * 创建store
 */
const store = createStore({
    state: {
        appName: '依桑国度',
    } as RootState,

    modules: { //引入模块并命名
        post: postStoreModule,
    },
});

/**
 * 默认导出
 */
export default store;