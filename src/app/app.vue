<template>
  {{ title }}
  <hr />
  <div>{{ errorMsg }}</div>
  <div v-for="post in postsData" :key="post.id">
    {{ post.title }} - <small>{{ post.user.name }}</small>
    <br />
    <small>{{ post.content }}</small>
    <hr />
  </div>
</template>

<script>
import { axios, apiHttpClient } from '@/app/app.service';
export default {
  data() {
    //放数据的
    return {
      title: 'vue',
      postsData: [],
      errorMsg: '',
      user: {
        name: 'easun',
        password: '123456',
        token: '',
      },
    };
  },

  // async created() 说明这个方法里包含有异步的
  async created() {
    //生命周期之一
    /**
     * 'axios' 去请求接口后，返回一个承诺，承诺兑现后会执行then,
     *  如果错误，会执行catch 里的回调
     */
    try {
      // const response = await axios.get('https://xb2-node-api.easun.shop/posts');
      // const response = await axios.get('/posts', {
      //   baseURL: 'https://xb2-node-api.easun.shop/',
      // });

      // baseURL写在了外部文件app.service
      // const response = await axios({
      //   method: 'get',
      //   url: '/posts',
      //   headers: {
      //     'temp-head-x': 'hello',
      //   },
      // });

      //使用 axios 实例
      const response = await apiHttpClient({
        method: 'get',
        url: '/posts',
        headers: {
          'temp-head-x': 'hello',
        },
      });

      this.postsData = response.data;
    } catch (error) {
      this.errorMsg = error.message;
    }

    /**
     * 用户登录
     */
    try {
      const response = await apiHttpClient.post('/login', this.user);
      console.log(response.data); //得到名字，token信息等
      this.token = response.data.token;
    } catch (error) {
      this.errorMsg = error.message;
    }

    // 简单演示
    // axios
    //   .get('https://xb2-node-api.easun.shop/posts')
    //   .then(response => {
    //     //成功执行 then
    //     console.log(response);
    //     this.postsData = response.data;
    //   })
    //   .catch(error => {
    //     //如果有错
    //     console.log('错误', error.message);
    //     //可以利用error.response的状态码，去做一些判断，给用户更好的提示
    //     console.log('错误', error.response);
    //     this.errorMsg = error.message;
    //   });
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

<style>
body {
  font-size: 12px;
}
</style>
