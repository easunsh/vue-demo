<template>
  <!--postId 是定义路由的时候自己设置的-->
  <div>post show {{ $route.params.postId }}</div>
  <div>得到值测试 {{ postId }}</div>
  <router-view></router-view>
</template>

<script>
export default {
  props: {
    postId: String,
  },
  created() {
    console.log(this.$route.params.postId);
  },
};
</script>
