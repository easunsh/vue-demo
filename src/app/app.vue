<template>
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
export default {
  data() {
    //放数据的
    return {
      title: '路由的功能练习',
    };
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {},

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  created() {
    //生命周期之一
  },

  methods: {
    //写方法的地方。
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
