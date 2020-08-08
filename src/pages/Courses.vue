<template>
  <Layout>
    <div id="coursesContainer">
      <section-header>
        Courses
      </section-header>
      <div class="courses-section">
        <p>
          I create in-depth free and premium courses on
          <span class="highlight-container">
            <a href="https://courses.productivedev.com" target="_blank">
              ProductiveDev
            </a>
          </span>
          and
          <span class="highlight-container">
            <a href="https://www.youtube.com/channel/UCfniixfhHqpIGbU7z2JCNJw" target="_blank">
              my YouTube channel.
            </a>
          </span>
        </p>
        <p>
          I enjoy helping others learn to code and to think about software development as a craft
          and a practice of lifelong learning.
        </p>
        <p>
          My passion is to help anyone who wants to learn to build a strong foundation in software
          engineering and leadership through hands-on projects and practice.
        </p>
      </div>
    </div>
  </Layout>
</template>

<script>
import SectionHeader from '../components/SectionHeader';
export default {
  components: {SectionHeader },
  metaInfo: {
    title: "Courses"
  },
};
</script>

<style lang="scss">
  @import "../scss/global.scss";
  #coursesContainer {
    width: 640px;
    a {
      font-weight: bold;
      border-bottom: 2px solid $dark;
    }
    .courses-section {
      padding-top: 3rem;
    }
  }
</style>
