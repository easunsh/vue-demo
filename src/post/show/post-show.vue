<template>
  <div v-if="showPost">
    <h1>{{ post.title }}</h1>
    <h2>
      {{ post.content }} - <small>{{ post.user.name }}</small>
    </h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  props: {
    postId: String,
  },

  created() {
    this.getPostById(this.postId);
  },

  computed: {
    ...mapGetters({
      loading: 'post/show/loading',
      post: 'post/show/post',
    }),

    showPost() {
      return !this.loading && this.post;
    },
  },

  methods: {
    ...mapActions({
      getPostById: 'post/show/getPostById',
    }),
  },
});
</script>
