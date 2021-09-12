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
    width: 100%;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 1.5rem 2.2rem;
    background: #fbfbfb;
    display: inline-block;
    margin: 1rem 0;
  }
</style>
