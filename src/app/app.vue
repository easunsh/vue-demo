<template>
  <h3 @click="name = 'china'">{{ name }}</h3>
  <h2 @click="username = 'shool'">{{ username }}</h2>
  <h2 @click="changeName">{{ username }}</h2>
  <h2 @click="changeName">{{ nameEmoji }}</h2>
  <hr />
</template>

<script>
import { watch, computed, reactive, ref, toRefs, onMounted } from 'vue';
export default {
  setup() {
    // 要具有反应特性， 加 ref
    const name = ref('setup的训练');

    //让对象具有反应特性 加reactive
    const user = reactive({
      username: '对象中的username',
    });

    //用 toRefs去处理解构的对象,或用下面的展开操作符
    //不过用展开操作符，在setup中方法中操作对象属性有点问题
    const { username } = toRefs(user);

    //setup中要使用方法的话
    const changeName = () => {
      username.value = '台海危机';
    };

    //生命周期
    onMounted(() => {
      console.log('mounted');
    });

    //监视数据
    watch(username, (newName, oldName) => {
      console.log(newName, oldName);
    });

    //计算属性
    const nameEmoji = computed(() => `${username.value}`);

    return {
      name,
      //user,
      username,
      //...toRefs(user),
      changeName, // 绑定下
      nameEmoji,
    };
  },

  // data() {
  //   //放数据的
  //   return {
  //     name: 'vue',
  //   };
  // },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {},

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  created() {
    //生命周期
    //console.log(this.$data);
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
</style>
