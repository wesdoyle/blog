<template>
  <div id="contentWrapper">
    <section id="mainContent">
    </section>
    <section id="sideBar">
      <side-bar />
    </section>
  </div>
</template>

<script>
  import SideBar from './SideBar';

  export default {
    name: "MainContent",
    components: {
      SideBar
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/global.scss";

  #contentWrapper {
    display: flex;
    height: 100vh;
    padding: 1rem 6rem;
  }

  #mainContent {
    flex-grow: 4;
    padding: 2rem;
    text-align: left;
  }

  #sideBar {
    flex-grow: 1;
    max-width: 20%;
    padding: 2rem;
    border-left: 1px solid #f3f3f3;
    text-align: left;
  }
</style>
