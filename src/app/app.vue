<template>
  Store里的 NAME 是 {{ $store.state.name }} (方法$store) <br />
  Store里的 NAME 是{{ name }}(方法computed)<br />
  Store里的 NAME 是 {{ appName }} (store 别名的方法) <br />
  Store里的getters 里的 name 值是 {{ name }}
  <hr />
  mutations里修改的练习(点下面)
  <h3 @click="onClickName">{{ name }}</h3>
  <hr />
  <span v-if="loading">loading...</span>
  <hr />
  <!-- {{ user.currentUser }} -->
  {{ currentUser }}
  <hr />
  {{ title }}
  <hr />
  <!--选中的项目vue会给加上 router-link-active 样式，可以自己定义一下-->
  <router-link to="/">首页 | </router-link>
  <!-- <router-link to="/about">关于 | </router-link> -->

  <!--用路由名的写法-->
  <router-link :to="{ name: 'about' }">关于 | </router-link>
  <router-link :to="{ name: 'postIndex' }">内容 | </router-link>
  <hr />
  <!---会调用app.router.ts里设置好的路由配置-->
  <router-view></router-view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    //放数据的
    return {
      title: '路由的功能练习',
    };
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，template里可直接{{ 对象名 }},
  computed: {
    ...mapState(['loading', 'user']), //直接用store.state里的值
    ...mapGetters({
      name: 'name',
      currentUser: 'user/currentUser',
    }), //getters里的值
    //...mapState(['name']), //用store里的state里的值，第一种方法
    // ...mapState({
    //   appName: 'name', //同上，这是一个对象参数，store的值可以取别名
    // }),
  },

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  created() {
    //this.$store.dispatch('getName'); //粗暴派发一个ACTION action里的 getName
    this.getName();
    this.getCurrentUser();
  },

  methods: {
    //写方法的地方。
    ...mapMutations(['setName']), //如果想和store里一致，就用数组参数

    ...mapActions({
      //数组或对象，写法2选1
      getName: 'getName',
      getCurrentUser: 'user/getCurrentUser', //命名空间写法
    }),

    onClickName() {
      //mutations修改练习
      if (this.$store.state.name === '平行方块空间') {
        this.setName('(new平行方块空间)');

        // this.$store.commit('setName', '(new平行方块空间)');
      } else {
        this.setName('平行方块空间');
        // this.$store.commit('setName', '平行方块空间');
      }
    },
  },

  components: {},
};
</script>

<style>
body {
  font-size: 12px;
}

.router-link-active {
  color: orange;
  font-size: 14px;
  font-weight: 600;
}
</style>
