<template>
  {{ title }}
  <hr />
</template>

<script>
export default {
  data() {
    //放数据的
    return {
      title: 'vuPoxye',
    };
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {},

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {},

  created() {
    //目标数据
    const user = {
      name: '元宇宙',
    };

    /**
     * 拦截处理对象的行为
     * 拦截get()  拦截 SET行为
     * 原有的数据被get里的拦截代替了
     *  get(target , properyt){}
     * 对象，属性名
     *  return target[properyt]
     * 输出的就是name里的值了
     * set(target, properyt , value)
     * 对象，属性名，值
     */
    const handler = {
      get() {
        return 'ninghao';
      },

      set(target, properyt, value) {
        //做一下判断，
        if (properyt === 'name') {
          if (value.length > 10) {
            throw new Error('名字太长了');
          }
        }
        //如果通过了判断，就正常继续执行，Reflect是处理器的默认行为
        return Reflect.set(target, properyt, value);
      },
    };

    //创建 proxy 要提供目标数据，和处理器
    const userProxy = new Proxy(user, handler);

    try {
      userProxy.name = '45544';
    } catch (error) {
      console.log('error', error.message);
    }

    console.log(userProxy.name);
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
