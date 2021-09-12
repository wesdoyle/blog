<template>
  <div id="navContainer">
    <div class="wes highlight-container">
      <router-link :to="{name: 'home'}">
        <span>Wes Doyle</span>
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
          Reading Notes
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
    font-size: 1.8rem;
    font-weight: bold;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    .wes {
      a {
        color: #555;
      }
      margin-right: 2rem;

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
        padding: 0 1.2rem;
        cursor: pointer;
        align-self: flex-end;

        a {
          color: $dark;
          transition: 0.2s;
          border-bottom: 3px solid $dark;

          &:hover {
            transition: 0.2s;
            border-bottom: 3px solid $bluegreen;
          }
        }
      }
    }

  }
</style>
