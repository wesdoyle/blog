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
    padding: 2rem 4rem;
    background: #fbfbfb;
    display: inline-block;
    margin: 1rem 0;
  }
</style>
