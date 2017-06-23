<template>
  <div id="explorer">
    <div class="btns">
      <filter-btn category="Defensive"></filter-btn>
      <filter-btn category="Business Ventures"></filter-btn>
      <filter-btn category="Politics"></filter-btn>
      <filter-btn category="Foreign Countries"></filter-btn>
      <filter-btn category="Surprise me!"></filter-btn>
    </div>
    <div class="selections">
      <carousel :navigationEnabled="true" :paginationEnabled="false" :perPage=2>
        <slide v-for="card in selectedCards">
          <card :url="card"></card>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import FilterBtn from './FilterBtn.vue';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'explorer',
  components: {
    'card': Card,
    'carousel': Carousel,
    'filter-btn': FilterBtn,
    'Slide': Slide
  },
  data() {
    return {
      selection: 'all'
    }
  },
  computed: {
    selectedCards: function() {
      return this.cards
    }
  },
  props: ['cards'],
}
</script>

<style lang="scss">
.btns {
  margin: 10px 0 40px;
}

.selections {
  margin: 20px 0;
}

</style>