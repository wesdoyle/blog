<template>
  <div id="sideBarContainer">
    <section-header>
      About
    </section-header>
    <section id="profilePicture">
      <img id="pic" alt="Wes Doyle portrait" src="../assets/wes-profile.png" />
    </section>
    <section id="aboutSummary">
      <div class="about-section">
        Hi, I'm Wes. My current engineering interests include natural language processing,
        human learning, and search.
      </div>
      <div class="about-section">
        I'm the founder of <a href="http://productivedev.com" target="_blank" class="pd-link">Productive Dev</a>, where I create online courses focusing on full stack web development.
        I enjoy creating videos about software engineering, hiking, and playing chess.
      </div>
    </section>
    <section id="externalLinks">

      <section-header>
        External Links
      </section-header>

      <div class="subsection-group">
        <a href="https://courses.productivedev.com" target="_blank">
          <img src="../assets/logo-sq-dark.png" width="45px">
        </a>

        <a href="https://github.com/wesdoyle" target="_blank">
          <img src="../assets/001-cat.png">
        </a>
        <a href="https://stackoverflow.com/users/5278004/wes-doyle" target="_blank">
          <img src="../assets/002-overflow.png">
        </a>
        <a href="https://www.youtube.com/c/wesdoyle" target="_blank">
          <img src="../assets/youtube-logo.png">
        </a>
      </div>

      <br />

      <section-header>
        Certifications
      </section-header>

      <div class="subsection-group">
        <a href="https://www.certmetrics.com/amazon/public/badge.aspx?i=1&t=c&d=2020-01-25&ci=AWS01182551" target="_blank">
          AWS Certified Solutions Architect - Associate
        </a>
      </div>
    </section>
  </div>
</template>

<script>
  import SectionHeader from "../components/SectionHeader.vue";

  export default {
    name: "SideBar",
    components: { SectionHeader }
  }
</script>

<style scoped>
  @import "../scss/global.scss";

  #sideBarContainer {
  }

  #pic {
    width: 100%;
  }

  .about-section {
    padding: 1.3rem 0;
  }

  .subsection-group {
    display: flex;
    justify-content: space-evenly;
    padding: 2rem 0;
  }

  .pd-link {
    text-decoration: underline;
    font-weight: bolder;
  }
</style>
