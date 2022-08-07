<template>
  <div class="loginBg" v-if="!isLoggedIn">
    <UserLogin
      v-if="!isLoggedIn"
      @login-success="onLoginSuccess"
      @login-error="onLoginError"
    />
  </div>

  <div class="largeBg " v-if="isLoggedIn">
    <div class="top_content">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box box_border_r_w box_shadow_1">
        欢迎回来 {{ user.name }}, <span @click="logOut">【退出】</span>
      </div>
    </div>

    <div class="body_daily_content" v-if="currentItem == 2">
      <!----- @keyup.enter="createPost" -->
      <input type="text" v-model="postTitle" placeholder="创建新内容" />
      <button @click="createPost">创建</button>
      <hr />
      <!---多个用 multiple -->
      <input
        type="file"
        ref="file"
        @change="onChangeFile"
        accept="image/png,image/jpg,image/jpeg"
        multiple
      />
      <hr />
      <div v-if="imagePreviewUrl">
        <img :src="imagePreviewUrl" width="200" />
      </div>
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
    </div>

    <div class="bottom_content">
      <div
        :class="['box', { active: currentItem === index }]"
        @click="currentItem = index"
        v-for="(item, index) in menuItems"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { apiHttpClient } from '@/app/app.service';
import UserLogin from '@/user/components/user-login.vue';
export default {
  data() {
    return {
      postsData: [],
      postTitle: '',
      errorMsg: '',
      user: {
        id: '',
        name: '',
        token: '',
      },
      file: null,
      imagePreviewUrl: null,
      menuItems: ['个人', '手机', '日记', '商店', '捐赠'],
      currentItem: 0, //当前激活的导航内容
    };
  },

  created() {
    //生命周期
    this.getPosts();
    //获取localstorage
    const tid = localStorage.getItem('tid'); //token
    const uid = localStorage.getItem('uid'); //userid
    const uname = localStorage.getItem('uname'); //username

    if (tid) {
      this.user.token = tid;
    }

    if (uid) {
      this.user.id = uid;
      this.user.name = uname;
    }
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {
    isLoggedIn() {
      return this.user.token ? true : false;
    },
  },

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  methods: {
    /***
     * 预览文件
     */
    createImagePreview(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imagePreviewUrl = event.target.result;
      };
    },

    /**
     * 文件上传前准备工作
     * event.target.files
     */
    onChangeFile(event) {
      //文件上传,多个文件会是一个对象，可以通过序号访问到
      console.log(event.target.files);
      const file = event.target.files[0];

      if (file) {
        this.file = file;
        //分离出数组第一个项目，得到文件名
        this.postTitle = file.name.split('.')[0];

        //生成文件预览
        this.createImagePreview(file);
      }
    },

    /**
     * 文件上传主方法
     * postID 需要在 createpost方法中传入
     */
    async createfile(file, postId) {
      alert(postId);
      //创建表单
      const formData = new FormData();

      //添加字段 file 为规定写法，要和后端一致，后面的file是用户选择的file
      formData.append('file', file);

      //上传文件
      try {
        const response = await apiHttpClient.post(
          `/files?post=${postId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.user.token}`,
            },
          },
        );
        // const response = await apiHttpClient({
        //   method: 'post',
        //   url: `/files?post=${postId}`,
        //   formData: formData,
        //   headers: {
        //     Authorization: `Bearer ${this.user.token}`,
        //   },
        // });

        //清理
        this.file = null;
        this.imagePreviewUrl = null;
        this.$refs.file.value = '';
        alert(response.data);
      } catch (error) {
        this.errorMsg = error.response.data.message;

        alert(error.response.data.message);
      }
    },

    /**
     * 用户登录
     */
    // async getUserInfo(userid) {
    //   try {
    //     //使用 axios 实例
    //     const response = await apiHttpClient({
    //       method: 'get',
    //       url: `/users/${userid}`,
    //       headers: {
    //         'temp-head-x': 'hello',
    //       },
    //     });

    //     this.user.name = response.data.name;
    //   } catch (error) {
    //     this.errorMsg = error.response.data.message;
    //   }
    // },

    /**
     * 退出登录
     */
    logOut() {
      this.user.token = '';
      this.user.id = '';
      localStorage.removeItem('tid');
      localStorage.removeItem('uid');
      localStorage.removeItem('uname');
    },
    /**
     * onLoginSuccess
     * data 参数就是子组件提交时候带的数据
     */
    onLoginSuccess(data) {
      this.errorMsg = '';

      if (data) {
        // SET user info
        this.user.id = data.id;
        this.user.name = data.name;
        this.user.token = data.token;
        /**
         * 设置 localStorage ，保持登录状态
         *setItem ,名字随便取，后面是值
         * */
        localStorage.setItem('tid', data.token);
        localStorage.setItem('uid', data.id);
        localStorage.setItem('uname', data.name);
      } else {
        alert('用户信息丢失，请重新登陆');
      }
    },
    onLoginError(error) {
      //method
      this.errorMsg = error.data.message;
    },

    /**
     * 删除内容的方法
     */
    async deletePost(postId) {
      try {
        const response = await apiHttpClient({
          method: 'delete',
          url: `/posts/${postId}`,
          headers: {
            Authorization: `Bearer ${this.user.token}`,
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
            title: this.postTitle,
          },
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        // const response = await apiHttpClient.post('/posts', {
        //   title: this.title,
        // });

        console.log(response.data);

        /**
         * 上传文件后，执行一下，新增内容
         * id 为刚刚插入的数据的id
         * 调用createfile 上传文件到数据库
         */
        if (this.file) {
          this.createfile(this.file, response.data.insertId);
        }
        this.postTitle = '';
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
            Authorization: `Bearer ${this.user.token}`,
          },
        });

        this.getPosts();
      } catch (error) {
        this.errorMsg = error.message;
      }
    },
  },

  components: { UserLogin },
};
</script>

<style>
body {
  font-size: 14px;
  /* font-size: 12px;
  background-color: url(./img/main-bg.jpg) darkblue repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center; */
  margin: 0;
  padding: 0;
}

.loginBg {
  background: url(./img/login-bg.jpg) no-repeat center 0px;
  background-size: cover;
  background-position: center 0;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}

.largeBg {
  background: url(./img/home-21.jpg) no-repeat center 0px;
  background-size: cover;
  background-position: center 0;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}

.body_daily_content {
  opacity: 90%;
  background-color: white;
  border-radius: 5px;
  width: 90%;
  height: auto;
  padding: 10px;
  margin: 50px auto 50px auto;
}

.top_content {
  position: fixed;
  z-index: 999;
  top: 0px;
  width: 100%;
  height: 40px;
  text-align: center;
  display: flex;
  display: -webkit-flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}

.top_content .box {
  flex-grow: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.box_shadow_1 {
  box-shadow: 2px 2px 1px #666;
  /**水平，垂直偏移量，模糊距离，颜色， 是否内阴影加 inset */
}

.box_border_r_w {
  background-color: white;
  border-radius: 10px 0px 0px 10px;
}

.bottom_content {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: darkblue;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}

.bottom_content .box {
  background-color: orange;
  flex-grow: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.bottom_content .active {
  text-shadow: 2px 1px black;
  color: yellow;
  font-size: 16px;
}

.bottom_content .box_center {
  background-color: orange;
  flex-grow: 2;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
