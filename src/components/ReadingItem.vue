<template>
  <div class="reading-item">
    <div class="reading-title">
      <reading-header>
        <div class="reading-title">
          {{reading.title}}
        </div>
        <div class="reading-author">
          {{reading.author}}
        </div>
      </reading-header>
    </div>
    <article v-html="reading.content" />
  </div>
</template>

<script>
import ReadingHeader from './ReadingHeader';

export default {
  components: {
    ReadingHeader
  },
  props: ["reading"],
  computed: {
    date() {
      return this.reading.date.substring(0, this.reading.date.length - 4);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/global.scss";
.date {
  margin-right:10px;
  min-width: 60px;
  display:inline-block;
  border-right: 1px solid darken($light, 12%);
}
.time-to-read {
  margin-left:10px;
  color:gray;
  font-size:.8em;
}

.reading-title {
  text-decoration: underline;
}

.reading-author{
  display: block;
  font-size: 1.1rem;
}

</style>
