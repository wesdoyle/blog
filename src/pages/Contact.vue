<template>
  <Layout>
    <div id="contactContainer">
      <section-header>
        Contact
      </section-header>
      <div class="contact-section">
        <p>
          If you'd like to get in touch, you can reach me at
          <span class="highlight-container">
          <a href="mailto:wes@productivedev.com" class="highlight">wes@productivedev.com</a>.
        </span>
        </p>
        <p>
          I respond to emails daily and will get back to you as soon as possible.
        </p>
      </div>
    </div>
  </Layout>
</template>

<script>
import SectionHeader from '../components/SectionHeader';

export default {
  components: { SectionHeader },
  metaInfo: {
    title: "Contact"
  },
};
</script>

<style lang="scss">
  @import "../scss/global.scss";
  #contactContainer {
    width: 640px;
    a {
      font-weight: bold;
      border-bottom: 2px solid $dark;
    }
    .contact-section {
      padding-top: 3rem;
    }
  }
</style>
