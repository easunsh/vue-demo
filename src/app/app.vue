<template>
  <div class="page">
    <div class="card">
      <div class="card_header">
        <h3 class="card-title">{{ name }}</h3>
        <div class="card-subtitle">动画动画</div>
      </div>

      <div class="card_content">
        <div class="emoji">{{ animatedNumber }}</div>
        <transition-group
          name="custom"
          leave-active-class="animate__animated animate__tada"
        >
          <div class="emoji" v-for="emoji in emojiList" :key="emoji">
            {{ emoji }}
          </div>
        </transition-group>
        <!-- <div class="emoji">♥</div> -->
        <!-- <div :class="['emoji', { hidden: !isActive }]">♥</div> -->
        <!-- <div :class="['emoji', { pulse: isActive }]">♥</div> -->
        <!-- <transition name="pulse"> -->

        <!-- <transition
          name="custom-class"
          enter-active-class="animate__animated animate__tada"
          leave-active-class="animate__animated animate__bounce"
          mode="out-in"
        > -->
        <!-- <div v-if="isActive" class="emoji">♥</div> -->
        <!-- <component :is="currentEmoji"></component>
        </transition> -->
      </div>
      <div class="card_action">
        <!-- <button @click="isActive = !isActive">按这里</button> -->
        <!-- <button @click="isActive = !isActive" :class="{ active: isActive }">
          按这里
        </button> -->

        <button @click="shuffle" :class="{ active: isActive }">
          按这里
        </button>

        <button @click="pop">
          删除
        </button>

        <button @click="number = number + 10">
          数字
        </button>
      </div>
    </div>

    <div class="status">
      <small>isActive: {{ isActive }}</small>
    </div>
  </div>
</template>

<script>
// import StarEmoji from './components/star-emoji.vue';
// import LoveEmoji from './components/love-emoji.vue';
import _ from 'lodash';
import gsap from 'gsap';

export default {
  data() {
    //放数据的
    return {
      name: 'Happy birthday',
      isActive: true,
      //emoji: 'StarEmoji',
      emojiList: ['火星', '月球', '太阳'],
      number: 0,
      tweenedNumber: 0,
    };
  },

  components: {
    // StarEmoji,
    // LoveEmoji,
  },

  //computed一个对象，可操作下数据，
  //,不同data ,可用方法返回，DEMO里可直接{{ processStatus }},
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
    currentEmoji() {
      return this.isActive ? 'StarEmoji' : 'LoveEmoji';
    },
  },

  //watch是监视某数据的变化，从而进行一些操作。
  //要监听name ，有两个参数 ，新的值和旧的值。参数取名 newName , oldName
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    },
  },

  created() {
    //生命周期之一
  },

  methods: {
    //写方法的地方。
    shuffle() {
      this.emojiList = _.shuffle(this.emojiList); //随机排列 lodash
    },

    pop() {
      this.emojiList.pop();
    },
  },
};
</script>

<style>
body {
  font-size: 12px;
}
@import './styles/app.css';
@import './styles/card.css';
@import './styles/animate.css';
</style>
