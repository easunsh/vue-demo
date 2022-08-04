<template>
  <h2>用户登录 user-login</h2>
  <hr />
  <input type="text" placeholder="用户名" v-model="user.name" /><br />
  <input type="password" placeholder="密码" v-model="user.password" /><br />
  <button @click="userLogin">登录</button>
  <hr />
</template>

<script>
import { apiHttpClient } from '@/app/app.service';
export default {
  data() {
    //放数据的
    return {
      user: {
        name: '',
        password: '',
      },
    };
  },

  methods: {
    /**
     * 用户登录
     */
    async userLogin() {
      try {
        const response = await apiHttpClient({
          method: 'post',
          url: `/login`,
          data: {
            name: this.user.name,
            password: this.user.password,
          },
        });

        //const response = await apiHttpClient.post('/login', this.user);
        console.log(response.data); //得到名字，token信息等

        /**
         * 触发一个自定义的事件$emit提交给父级组件
         * response.data作为事件的数据
         * 父级组件得到login-success后会进一步调用自己的方法进行处理
         */
        this.$emit('login-success', response.data);
      } catch (error) {
        console.log(error.response);
        this.errorMsg = error.message;
        /**
         * 触发一个自定义的事件$emit提交给父级组件
         * response.data作为事件的数据
         * 父级组件得到login-serror后会进一步调用自己的方法进行处理
         */
        this.$emit('login-error', error.response);
      }
    },
  },
};
</script>
