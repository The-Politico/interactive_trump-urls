<template>
  <div id="explorer">
    <div class="btns">
      <filter-btn category="Odd Names" class="odd-names" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Business Ventures" class="business-ventures" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Political Sites" class="political-sites" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Foreign Ventures" class="foreign-ventures" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Surprise me!" class="surprise-me" v-on:reshuffle="reshuffleCards"></filter-btn>
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
      var filter = []

      for (var key in this.cards) {
        if (this.cards.hasOwnProperty(key)) {
          const category = this.cards[key]['category']
          if (this.$store.state.category === 'Surprise me!') {
            filter.push(this.cards[key])
          }
          else if (category === this.$store.state.category) {
            filter.push(this.cards[key]);
          }
        }
      }
      this.shuffle(filter)

      if (this.$children.length > 0) {
        this.$children[5].currentPage = 0
      }

      return filter
    }
  },
  methods: {
    shuffle(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
    },
    reshuffleCards() {
      this.shuffle(this.selectedCards);
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