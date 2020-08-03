<template>
  <div class="reading-item">
    <span class="date">{{date}}</span>
    <g-link :to="reading.path" class="read">{{reading.title}}</g-link>
    <span class="time-to-read"><i>{{reading.timeToRead}} min read</i></span>
  </div>
</template>

<script>
export default {
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
</style>
