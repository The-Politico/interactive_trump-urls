<template>
  <div class="explorer" @click="onExplorerClick">
    <div class="selections">
      <carousel :navigationEnabled="true" :paginationEnabled="false" :perPageCustom="[[0,1], [600, 2]]" :speed="swipeSpeed">
        <slide v-for="card in cards">
          <card :url="card"></card>
        </slide>
      </carousel>
      <div class="swipe-directions">&larr; Swipe to explore &rarr;</div>
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
  data() {
    return {
      swipeSpeed: 0
    }
  },
  props: ['cards'],
  mounted() {
    const bbox = this.$el.getBoundingClientRect();
    const width = bbox.width;

    if (width > 768) {
      this.swipeSpeed = 0;
    } else {
      this.swipeSpeed = 500;
    }
  },
  methods: {
    onExplorerClick(e) {
      if (this.$store && !this.$store.state.interacted  ) {
        this.$store.commit('updateInteraction', true);
      }
    }
  }
}
</script>

<style lang="scss">
.selections {
  margin: 20px 0;
}


</style>
