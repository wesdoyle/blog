<template>
  <div id="navContainer">
    <div class="wes highlight-container">
      <router-link :to="{name: 'home'}" class="highlight">
        <span class="wes-name">Wes Doyle</span>
      </router-link>
    </div>
    <div class="nav-links">
      <div class="nav-item">
        <router-link to="/">
          Blog
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/reading">
          My Reading Notes
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/courses">
          Courses
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/contact">
          Contact
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "NavBar"
  }
</script>

<style scoped lang="scss">
  @import "../scss/global.scss";

  #navContainer {
    background-color: $light;
    color: $dark;
    padding: 1rem 8rem;
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 2rem;
    font-weight: bold;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    .wes {
      margin-right: 2rem;

      .wes-name {
        margin-right: 2rem;
        font-weight: bolder;
        font-size: 2.3rem;
      }

      .blinkingCursor {
        font-family: 'Fira Code', monospace;
        display: inline-block;
        font-size: 1.4em;
        color: $dark;
        -webkit-animation: 2s blink infinite;
        -moz-animation: 2s blink infinite;
        -ms-animation: 2s blink infinite;
        -o-animation: 2s blink infinite;
        animation: 2s blink infinite;
      }

      @keyframes blink {
        0% {
          opacity: 1;
        }
        75% {
          opacity: .21;
        }
        100% {
          opacity: 1;
        }
      }
    }

    .nav-links {
      display: inline-flex;

      .nav-item {
        height: 100%;
        flex-grow: 1;
        display: inline-block;
        padding: 0 2.2rem;
        cursor: pointer;
        align-self: flex-end;

        a {
          color: $dark;
          transition: 0.2s;
          border-bottom: 4px solid $dark;

          &:hover {
            color: $bluegreen;
            transition: 0.2s;
            border-bottom: 4px solid $bluegreen;
          }
        }
      }
    }

  }
</style>
