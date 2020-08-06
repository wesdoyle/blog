<template functional>
  <div class="reading-header highlight-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "SectionHeader"
  }
</script>

<style scoped>
  @import "../scss/global.scss";

  .reading-header {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 1rem 2rem 1rem 0;
    background: #fbfbfb;
    display: inline-flex;
    margin: 2rem 0;
    text-decoration: underline;
  }
</style>
