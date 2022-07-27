<template>
    <h3>{{ name }}</h3>
        <hr />
      <h3>content的值: {{ content }}</h3>
      <!---文本框 text-->
    v-mode="content" 相当于 :value="content" @input="content = $event.target.value" <br />
   <input type="text"  v-model="content" placeholder="none" /> <br />   
    延迟v-model.lazy，需要失去焦点，或其他动作的时候再绑定同步数据
   <input type="text"  v-model.lazy="content" placeholder="none" /> <br />
   <!---textarea-->
   <textarea v-model="content" placeholder="none"></textarea> <br />
   <!---checkbox single-->
    <input id="checklabel" type="checkbox" v-model="checked" /> 
    <label for="checklabel" >checked is {{ checked }}</label> 
    <hr />
 <!---checkbox more-->
 <label for="tag-1">
    <input id="tag-1" type="checkbox" value="可乐" v-model="tags"  />可乐
 </label>
 <label for="tag-2">
    <input id="tag-2" type="checkbox" value="雪碧" v-model="tags"  />雪碧
 </label>
 <label for="tag-3">
    <input id="tag-3" type="checkbox" value="芬达" v-model="tags"  />芬达
 </label>
tags is {{ tags }}

    <hr />
    <!---radio-->
<label for="radios-1">
    <input id="radios-1" type="radio" value="按年" checked v-model="raidos"  />按年
 </label>
<label for="radios-2">
    <input id="radios-2" type="radio" value="按月" v-model="raidos"  />按月
 </label>
 radios is {{ raidos }}
    <hr />
<select v-model="selects">
    <option value="please choose">--请选择--</option>
    <option value="banana">香蕉</option>
    <option value="apple">苹果</option>
</select>
selects is {{ selects }}
   <hr />
<small>一个简单的文本框事件处理器 绑定 onInputContent 方法</small>
<br />
<input type="text" placeholder="打开CONSOLE查看" @input="onInputContent" />
 <hr />
 文本框，change事件，用户提交或文本框失去焦点等，触发，
 <input type="text" @change="onChangeContent"   placeholder="打开CONSOLE查看" />
<hr />
文本框内按下按键，抬起来，keyup事件
 <input type="text" @keyup="onKeyUp"  placeholder="输入回车看看"/><br />
 或者使用 @keyup.enter="onKeyUp" 只有按了特定的按键，才会执行方法，不需要方法里再去判断。
 <input type="text" @keyup.enter="onKeyUp"  placeholder="输入回车看看"/>
<hr />
文本框输入string数据保持为number / v-model.number , 回车测试
<input type="text" v-model.number="contentNumber" @keyup.enter="checkNumType" placeholder=""/><br />
<hr />
去除空格等
<input type="text" v-model.trim="content"  placeholder=""/><br />
</template>

<script>  

    export default {

        data(){   //放数据的
            return{
                name: '表单DEMO集合',
                content: '测试表单v-model',
                checked: true,
                tags: [],
                raidos: 'year',
                selects:'please choose',
                contentNumber: 0,
               
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

          
          onInputContent(event){ 
        //event参数就是事件对象 ,event.targe.value就是值
            console.log(event);
          },

        //on change 事件
          onChangeContent(event){
            console.log(event.target.value);
          },

          //keyup 
          onKeyUp(event){
            console.log(event);

            //二选1
            if(event.key === 'Enter'){
                alert('enter!');
            }

             alert('enter!');
          },

          checkNumType(){
            alert( typeof this.contentNumber );
          }
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