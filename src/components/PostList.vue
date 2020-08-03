<template>
  <div class="post-list">
    <section-header>
      Blog
    </section-header>
    <h2>{{year}}</h2>
    <div class="post-item">
      <PostItem :key="post.node.id" v-for="post in this.postsByYear" :post="post.node" />
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem';
import SectionHeader from './SectionHeader';

export default {
  props: ["year"],
  components: {
    SectionHeader,
    PostItem
  },
  computed: {
    postsByYear() {
      const posts = this.$page.allPost.edges;
      return posts.filter((post) => {
        return post.node.date.includes(this.year);
      })
    }
  }
};
</script>

<style scoped="true">
h1 {
  font-size:1.6em;
  margin:1rem 0;
}

.post-list {
}
.post-item {
  margin: 1.8rem 0;
}
</style>
