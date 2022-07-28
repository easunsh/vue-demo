<template>
    <div>用户登录</div>
    <!--ref 用法 --->
    <input type="text" ref="username" />
    
    <AppInput v-model="userpwd" />{{ userpwd }}
    
</template>


<script>
import AppInput from './app-input.vue'
    export default {

         data(){   //放数据的
            return {
                
                userpwd: '',
               
            };
        },
        
        beforeCreate(){
            console.log('beforeCreate...');

        },

        created(){
            console.log('created;;;');
        },

        beforeMount(){
                 console.log('beforeMount====');

        },

        mounted(){
             console.log('mounted====');
        },

        beforeUpdate(){
             console.log('beforeUpdate----');

        },

        update(){
             console.log('update=====');
        },

        //解除挂载，比如去除 keeplive的文本切换后
        unmounted(){
             console.log('unmounted----');

        },

      components: { AppInput },
        
    }
</script>
