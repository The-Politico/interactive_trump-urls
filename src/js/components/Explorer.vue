<template>
  <div id="explorer" class="explorer">
    <div class="selections">
      <carousel :navigationEnabled="true" :paginationEnabled="false" :perPageCustom="[[480,1], [768, 2]]" :speed="0">
        <slide v-for="card in cards">
          <card :url="card"></card>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'explorer',
  components: {
    'card': Card,
    'carousel': Carousel,
    'Slide': Slide
  },
  props: ['cards'],
  mounted() {
    console.log(this.cards);
  }
}
</script>

<style lang="scss">
.selections {
  margin: 20px 0;
}
</style>