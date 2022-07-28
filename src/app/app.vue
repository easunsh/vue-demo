<template>
    {{ title }}
    <hr />
<UserProfile />

    <hr />
   组件2种写法,查看源代码  监听，@tap @init是子组件传过来的，父组件绑定后，执行自己的方法。<hr />
<!-- <AppButton text="提交" 
@tap="onTapAppButton"
@init="onInitAppButton"
></AppButton> -->

<!---使用插槽 可以在标签里直接写提交 不写text="提交"，但onTapAppButton测试会用默认的子组件里的default 的text '按钮'-->
<AppButton text="提交" 
@tap="onTapAppButton"
@init="onInitAppButton"
>提交</AppButton>

<AppButton />

<app-button>ok</app-button>

<AppDemoButton></AppDemoButton>
</template>

<script>  
import AppButton from './components/app-button.vue'
import AppDemoButton from './components/app-demo-button.vue'
import UserProfile from './components/user-profile.vue'

    export default {

       

        data(){   //放数据的
            return{
                
                title: '高级组件的应用',
            
               
            };
        },

        
           

        //computed一个对象，可操作下数据，
        //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
        computed: {  
           
        },

        //watch是监视某数据的变化，从而进行一些操作。
        //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
        watch: { 
           
        },

        created(){   //生命周期之一
           
        },

        methods: {  //写方法的地方。
            //与子组件传值练习
             onTapAppButton(text){
                console.log('on tap is',text);
             },
             //与子组件传值练习
             onInitAppButton(){
                console.log('on init app button');
             }
          
     
        },

      
      components: { UserProfile , AppButton , AppDemoButton },
   

    }

</script>

<style >
body { font-size: 12px; }

</style>