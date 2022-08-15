<template>
  {{ title }}
  <hr />
  <router-link to="/">首页</router-link>
  <router-link to="/posts">日志</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    //放数据的
    return {
      title: '平行宇宙の依桑国度',
    };
  },

  created() {
    //生命周期之一
    console.log(this.$store.state);
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {},

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  methods: {
    //写方法的地方。
  },

  components: {},
};
</script>

<style scoped>
body {
  font-size: 12px;
}
</style>
