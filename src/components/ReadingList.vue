<template>
    <div id="readingListContainer">
      <section-header>
        Reading Notes
      </section-header>
      <div>
        Currently transferring notes from old blog. Check back soon.
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
};
</script>

<style lang="scss" scoped>
  @import "../scss/global.scss";
  #readingListContainer {
    width: 640px;
    a {
      font-weight: bold;
      border-bottom: 2px solid $dark;
    }
  }
</style>
