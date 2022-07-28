<template>
    <!--不适用插槽 <button class="button" @click="$emit('tap',text)">{{text}}</button>-->

    <!--使用插槽-->
    <button class="button" @click="$emit('tap',text)"><slot></slot></button>
</template>



<script>  

    export default {

        //Vue 组件的属性
        props: {
            text:{
                type: String,
                default: '按钮',
            }
        },

        created(){
            this.$emit('init');   //没有传递值，所以可以不用写值
        },
   }
   
</script>
<style scoped >
/*****scoped 样式本组件有效，其他组件无效****/
.button { border-radius: 5px; border: 1px blue solid; margin: 3px; cursor: pointer; }
</style>