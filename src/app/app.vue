<template>
    {{ title }}
    <hr />

</template>

<script>  

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

          
     
        }
        

    }

</script>

<style >
body { font-size: 12px; }
input[type='text'],
textarea,
select{
    padding: 4px 8px;
    margin: 8px 0;
    margin-right: 3px;

}
label {
    margin-left:4px;
}
</style>