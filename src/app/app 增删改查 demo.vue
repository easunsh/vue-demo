<template>
  <input
    type="text"
    v-model="title"
    @keyup.enter="createPost"
    placeholder="创建新内容"
  />
  <hr />
  <div>{{ errorMsg }}</div>
  <div v-for="post in postsData" :key="post.id">
    <input
      type="text"
      :value="post.title"
      @keyup.enter="updatePost($event, post.id)"
    />
    <button @click="deletePost(post.id)">删除</button>
    <br />
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
      postsData: [],
      errorMsg: '',
      user: {
        name: 'admin',
        password: '123456',
        token: '',
        title: '',
      },
    };
  },

  // async created() 说明这个方法里包含有异步的
  async created() {
    this.getPosts();

    /**
     * 'axios' 去请求接口后，返回一个承诺，承诺兑现后会执行then,
     *  如果错误，会执行catch 里的回调
     */

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
    /**
     * 删除内容的方法
     */
    async deletePost(postId) {
      try {
        const response = await apiHttpClient({
          method: 'delete',
          url: `/posts/${postId}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.getPosts();
      } catch (error) {
        this.errorMsg = error.message;
      }
    },

    /**
     * 查询内容方法
     */
    async getPosts() {
      try {
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
    },

    /**
     * 发布内容的方法
     * 需要携带  Authorization: `Bearer ${this.token}`,
     */
    async createPost() {
      try {
        const response = await apiHttpClient({
          method: 'post',
          url: '/posts',
          data: {
            title: this.title,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        // const response = await apiHttpClient.post('/posts', {
        //   title: this.title,
        // });

        console.log(response.data);
        this.title = '';
        this.getPosts();
      } catch (error) {
        this.errorMsg = error.message;
      }
    },

    /**
     * 更新内容的方法
     * event是事件对象，文本框本身，取value用
     */
    async updatePost(event, postId) {
      try {
        const response = await apiHttpClient({
          method: 'patch',
          url: `/posts/${postId}`,
          data: {
            title: event.target.value,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.getPosts();
      } catch (error) {
        this.errorMsg = error.message;
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
</style>
