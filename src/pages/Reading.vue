<template>
  <Layout>
    <section class="readings">
      <ReadingList v-for="year in years" :key="year" :year="year" />
    </section>
  </Layout>
</template>

<script>
import ReadingList from '../components/ReadingList';

export default {
  components: {
    ReadingList,
  },
  metaInfo: {
    title: "Reading Notes"
  },
  computed: {
    years() {
      const years = {};
      const readings = this.$page.allReading.edges;
      readings.map((reading) => {
        const year = reading.node.date.split(" ")[2];
        years[year] = "";
      });
      return Object.keys(years).sort((a, b) => {
        return b - a;
      });
    }
  }
};
</script>

<page-query>
query {
  metadata {
    siteName
    siteDescription
  }
  allReading(filter: { date: { gte: "2018" }}) {
    totalCount
    edges {
      node {
        id
        title
        timeToRead
        date (format: "MMM D YYYY")
        path
      }
    }

  }
}
</page-query>

<style>
</style>
