<template>
    <h3>{{ name }}</h3>
    <h4>{{ processStatus }}</h4>
    <button v-on:click="resetName">重置</button>
    <button @click="setName">设置名字</button>
    <hr />
     <!--此div就是一个循环的模块，post是起的名字，:key 绑定KEY，必须是唯一的。所以用ID-->
    <!--<div v-for="post in postList" :key="post.id">-->
    <!--index 是循环中的索引号，从0开始，--->
   <div v-for="( post,index ) in postList" :key="post.id">
    <small> {{ index+1 }} - {{ post.content }} -  {{ post.author }} </small>
    </div>
   <hr />
   <!--visible 如果为true 则显示--->
    <!--{{}}里可以进行些计算和判断 --->
   <div v-if="visible">隐藏的内容</div>
   <button @click="visible = !visible">{{ visible ? '隐藏' : '显示'}}</button>
    <hr />
       <!--绑定CLASS , 里面做判断，active 如果为 false 则不绑定--->
        <!-- <div :class="{ active: true }"></div>--->
        <!---数组的写法:class="[ 'menu-item' , { active: currentItem ===index } ]-->
<div class="menu">
    <div  
    :class="[ 'menu-item' , { active: currentItem ===index } ]"
    @click = "currentItem = index"
    v-for="(item , index) in menuItems" :key="index">
        {{ item }} 
    </div>
</div>
</template>

<script>  

    export default {

        data(){   //放数据的
            return{
                name: 'sunyi',
                visible: true,
                menuItems: ['首页','街道','学校','医院'],  //模拟导航内容
                currentItem: 0,  //当前激活的导航内容
                postList: [
                    {
                        id:1,
                        content: 'aaaaaaa',
                        author: 'easun',
                    },
                    {
                        id:2,
                        content: 'bbbbbb',
                        author: 'black',
                    },
                    {
                        id:3,
                        content: 'ccccc',
                        author: 'crise',
                    },

                ],
            };
        },

        //computed一个对象，可操作下数据，
        //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
        computed: {  
            processStatus(){
                return this.name === 'sunyi' ? '初始化' : '设置数据完成';
            }
        },

        //watch是监视某数据的变化，从而进行一些操作。
        //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
        watch: { 
            name( newName , oldName ){
                console.log(`name 发生了变化: ${oldName} -> ${newName}`);
            }            
        },

        created(){   //生命周期之一
            console.log('app has created');
            this.setName();   //this 表示当前组件的实例
        },

        methods: {  //写方法的地方。
            setName(){
                setTimeout( ()=>{
                    this.name = 'easun';  //改数据
                } ,3000);
            },

            resetName(){
                this.name = 'sunyi';
            },
        }
        

    }

</script>

<style >
/*** @import './styles/app.css'; *****/

button {
    margin: 3px;
}

.menu {
   display: flex;
   gap: 16px; 
  
}

.menu-item {

    float: left;
   cursor: pointer;
   margin-right: 10px;

}

.active {   
   color: palevioletred; 
}

</style>