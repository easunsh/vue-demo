<template>
  <UserLogin
    v-if="!isLoggedIn"
    @login-success="onLoginSuccess"
    @login-error="onLoginError"
  />
  <div v-if="isLoggedIn">欢迎回来 {{ username }}</div>
  <hr />
  {{ errorMsg }}
</template>

<script>
import { apiHttpClient } from '@/app/app.service';
import UserLogin from '@/user/components/user-login.vue';
export default {
  data() {
    return {
      errorMsg: '',
      token: '',
      username: '',
    };
  },

  created() {
    //生命周期
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {
    isLoggedIn() {
      return this.token ? true : false;
    },
  },

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  methods: {
    /**
     * onLoginSuccess
     * data 参数就是子组件提交时候带的数据
     */
    onLoginSuccess(data) {
      //method
      this.token = data.token;
      this.errorMsg = '';
      this.username = data.name;
    },
    onLoginError(error) {
      //method
      this.errorMsg = error.data.message;
    },
  },

  components: { UserLogin },
};
</script>

<style>
body {
  font-size: 12px;
}
</style>
