<template>
  <header class="header">
    <g-link to="/"><h1>{{ siteName }}</h1></g-link>
  </header>
</template>

<script>
export default {
  props: ["siteName"],
};
</script>

<style lang="scss">
  .header {
    display:flex;
    align-items: center;
    justify-content: space-between;
    a {
      color:inherit;
      border-bottom: none;
    }
  }
</style>
