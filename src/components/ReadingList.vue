<template>
    <div id="readingListContainer">
      <div class="highlight-container reading-year">
        {{ year }}
      </div>
      <div class="reading-item">
        <ReadingItem :key="reading.node.id" v-for="reading in this.readingsByYear" :reading="reading.node" />
      </div>
    </div>
</template>

<script>
import ReadingItem from './ReadingItem';
import SectionHeader from './SectionHeader';

export default {
  props: ["year"],
  components: {
    ReadingItem, SectionHeader
  },
  computed: {
    readingsByYear() {
      const readings = this.$page.allReading.edges;
      return readings.filter((reading) => {
        return reading.node.date.includes(this.year);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../scss/global.scss";
  #readingListContainer {
    a {
      font-weight: bold;
      border-bottom: 2px solid $dark;
    }
  }

  .reading-year {
    font-size: 1.8rem;
    font-weight: bold;
    padding: 1rem 2rem;
  }
</style>
