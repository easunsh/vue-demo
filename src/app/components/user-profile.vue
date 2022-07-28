<template>
    <keep-alive>
        <component :is="currentComponent"></component>
    </keep-alive>
        <small @click="onClickText">{{ hintText }}</small>
</template>

<script>
import UserLogin from './user-login.vue'
import UserReg from './user-reg.vue'

export default {
    data() {
        return {
            currentComponent: 'UserLogin',
            hintText: '还没有账户，点击注册',
        };
    },

  

    methods: {
        onClickText(){
            switch( this.currentComponent ){
                case 'UserReg':
                    this.currentComponent = 'UserLogin';
                    this.hintText = '还没有账户，点击注册';
                    break;
                case 'UserLogin':
                    this.currentComponent = 'UserReg';
                    this.hintText = '已有账户，立即登陆';
                    break;
                
            }
        }
    },

      components: { UserLogin, UserReg },
}
</script>
