<template>
  <div id="app">
    <nav>
      <nav-bar />
    </nav>
    <main class="layout" role="main">
      <div id="contentWrapper">
        <section id="mainContent">
          <slot/>
        </section>
        <section id="sideBar">
          <side-bar />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header";
import NavBar from '../components/NavBar';
import MainContent from '../components/MainContent';
import BlogFooter from '../components/BlogFooter';
import SideBar from '../components/SideBar';

export default {
  components: {
    SideBar,
    Header,
    NavBar,
    MainContent,
    BlogFooter
  }
}
</script>

<style lang="scss">
  @import "../scss/global.scss";

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

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
    min-width: 240px;
    max-width: 240px;
    padding: 2rem;
    border-left: 1px solid #f3f3f3;
    text-align: left;
  }
</style>
