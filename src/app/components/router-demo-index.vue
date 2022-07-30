<template>
  <div @click="onClickText">平行方块宇宙，欢迎您 [中心]</div>
</template>

<script>
export default {
  methods: {
    onClickText() {
      // this.$router.push('/about');  //可以后退到应用内的上个页面，有url历史
      //this.$router.replace('/about'); //不可以后退到应用内的上个页面，没有历史

      this.$router.replace({ name: 'about' }); //用路由名的方法
    },
  },
};
</script>
