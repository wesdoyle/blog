<template>
  <div class="content-section-container">
    <div class="content-title highlight-container">
      {{ data.title }}
    </div>

    <div class="content-author">
      {{ data.author }}
    </div>

    <div v-for="section in data.content">
      <div v-if="isPlain(section.variation)" class="content-plain">
        {{ section.content }}
      </div>
      <div v-if="isQuote(section.variation)" class="content-quote">
        {{ section.content }}
      </div>
      <div v-if="isCode(section.variation)" class="content-code">
        {{ section.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { ContentVariation } from '@/types/IContent';
  import { IContent } from '@/types/IContent';

  @Component({
    name: 'ContentSection'
  })
  export default class ContentSection extends Vue {
    @Prop()
    readonly data!: IContent;

    isPlain(variation: string) {
        return variation === ContentVariation.Plain
    }

    isCode(variation: string) {
        return variation === ContentVariation.Code
    }

    isQuote(variation: string) {
        return variation === ContentVariation.Quote
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/global.scss";

  .content-section-container {
    margin: 3rem 0 5rem;

    .content-title {
      font-weight: bold;
      color: $dark;
      font-size: 1.8rem;
    }

    .content-author {
      margin-top: 1rem;
      font-size: 1.8rem;
      font-weight: bold;
      color: lighten($dark, 30%);
      display: block;
    }
  }


  .content-plain {
    margin: 2rem 0;
  }

  .content-code {
    white-space: pre;
    border-left:3px solid $blue;
    font-family: "Roboto Mono", monospace;
    line-height: 2.4rem;
    font-size: 1.4rem;
    background-color: #202A31;
    color: #C5CBDB;
    padding: 16px;
    margin: 12px 0;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .content-code::first-line {
    white-space: pre-line;
  }

  .content-quote::before {
    content: "“";
    font-size: 6rem;
    position: absolute;
    font-family: Serif;
    top: 0;
    left: 1rem;
    color: rgba(0,140,60,0.1);
  }

  .content-quote::after{
    content: "”";
    font-size: 6rem;
    position: absolute;
    font-family: Serif;
    bottom: -1;
    right: 1rem;
    color: rgba(0,140,60,0.1);
  }

  .content-quote {
    position: relative;
    border-left: 4px solid $green;
    padding: 1.8rem 2.2rem 2rem 5rem;
    color: lighten($dark, 10%);
    margin: 1rem 0;
    font-style: italic;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  }

</style>

