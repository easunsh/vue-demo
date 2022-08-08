<template>
  <div class="login-zone">
    <h1 class="font_shadow">平行宇宙の依桑国度</h1>

    <input type="text" placeholder="用户名" v-model="user.name" /><br />
    <input type="password" placeholder="密码" v-model="user.password" /><br />
    <button @click="userLogin" class="login_btn">登录</button>

    <div class="error_zone font_shadow">{{ errorMsg }}</div>
    <div class="copyright">id.YSGD-20220808</div>
  </div>
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
      errorMsg: '',
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
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
        this.errorMsg = error.response.data.message;
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
<style scoped>
body {
  text-align: center;
}

.font_shadow {
  text-shadow: 2px 1px black;
}
.login-zone {
  color: white;
  text-align: center;
  width: 80%;
  margin: 60px auto 0px auto;
}

.login-zone input[type='text'],
input[type='password'] {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  border: 0px;
  font-size: 16px;
  font-weight: 600;
  text-indent: 10px;
  margin: 0px 0px 10px 0px;
  background-color: white;
}

.login_btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  background-color: orange;
  margin: 10px auto;
  border-radius: 5px;
  text-shadow: 2px 2px black;
}

.error_zone {
  height: 40px;
  line-height: 40px;
  color: yellow;
}

.copyright {
  color: white;
  font-size: 10px;
  height: 30px;
  line-height: 30px;
  margin-top: 30px;
}
</style>
