<template functional>
  <div class="section-header highlight-container paper">
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

  .section-header {
    font-weight: bold;
    font-size: 2rem;
    padding: 1rem 2rem 1rem 0;
    background: #fbfbfb;
    display: block;
    margin: 1rem 0;
    text-align: center;
    max-width: 240px;
  }
</style>
