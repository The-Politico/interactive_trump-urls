<template>
  <div id="wrapper">
    <div id="search">
      <vue-typer
        :text='typeList'
        :repeat='Infinity'
        initial-action='typing'
        :pre-type-delay='70'
        :type-delay='70'
        :pre-erase-delay='5000'
        :erase-delay='250'
        erase-style='select-all'
        :erase-on-complete='false'
        @typed='onTyped'
        v-if="!interacted"
      ></vue-typer>
      <span class="explore-prompt" v-if="interacted">Explore the URLs below</span>
    </div>
    <div class="btns">
      <filter-btn category="Business Ventures" class="business-ventures" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Foreign Ventures" class="foreign-ventures" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Political Sites" class="political-sites" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Odd Names" class="odd-names" v-on:reshuffle="reshuffleCards"></filter-btn>
      <filter-btn category="Surprise me!" class="surprise-me" v-on:reshuffle="reshuffleCards"></filter-btn>
    </div>
    <div class="subcategories secondary">
      <subcategory-btn v-for="subcategory in subcategories" :key="subcategory" :name="subcategory"></subcategory-btn>
    </div>
    <explorer :cards="selectedCards"></explorer>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer';
import request from 'superagent';
import Suggestions from 'suggestions';
import FilterBtn from './FilterBtn.vue';
import Explorer from './Explorer.vue';
import SubcategoryBtn from './SubcategoryBtn.vue';

export default {
  name: 'app',
  components: {
    'explorer': Explorer,
    'filter-btn': FilterBtn,
    'vue-typer': VueTyper,
    'subcategory-btn': SubcategoryBtn
  },
  data() {
    return {
      typeList: ['trumponice.com', 'donaldtrumpponzischeme.com', 'electtrump.com', 'downloaddonald.com', 'playwithdonald.com', 'trumpvodkasucks.com'],
      cards: {},
      subcategories: []
    }
  },
  mounted() {
    this.getCards();
  },
  computed: {
    interacted() {
      return this.$store.state.interacted
    },
    selectedCards() {
      var filter = []

      for (var key in this.cards) {
        if (this.cards.hasOwnProperty(key)) {
          const category = this.cards[key]['category']
          const subcategory = this.cards[key]['subcategory'];

          if (this.$store.state.subcategory) {
            if (this.$store.state.category === 'Surprise me!' && this.$store.state.subcategory === subcategory) {
              filter.push(this.cards[key])
            }
            else if (category === this.$store.state.category && this.$store.state.subcategory === subcategory) {
              filter.push(this.cards[key]);
            }
          } else {
            if (this.$store.state.category === 'Surprise me!') {
              filter.push(this.cards[key])
            }
            else if (category === this.$store.state.category) {
              filter.push(this.cards[key]);
            }
          }
        }
      }
      this.shuffle(filter)
      this.setSliderIndex(0);
      this.updateSubcategories();
      return filter
    },
  },
  methods: {
    onTyped(typedString) {
      this.$store.commit('updateSelection', this.cards[typedString.toUpperCase()]);

      let navigateIndex = 0;
      const slides = document.querySelectorAll('.VueCarousel-slide');
      for (var i = 0; i < slides.length; i++) {
        const domain = slides[i].querySelector('h3').textContent;
        if (domain === typedString){
          navigateIndex = i;
        }
      }

      const len = this.$children.length;
      this.setSliderIndex(navigateIndex)
    },
    getCards() {
      request
        .get('data/cards.json')
        .end((err, res) => {
          this.cards = res.body
        })
    },
    shuffle(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
    },
    reshuffleCards() {
      this.shuffle(this.selectedCards);
    },
    setSliderIndex(navigateIndex) {
      for (var i = 0; i < this.$children.length; i++) {
        if (this.$children[i].$el.classList.contains('explorer')) {
          const carousel = this.$children[i].$children[0];
          carousel.currentPage = navigateIndex;
        }
      }
    },
    updateSubcategories() {
      var filter = [];
      for (var key in this.cards) {
        if (this.cards.hasOwnProperty(key)) {
          const currentCategory = this.$store.state.category;
          const subcategory = this.cards[key]['subcategory'];
          if (subcategory && (currentCategory && this.cards[key]['category'] === currentCategory)) {
            filter.push(subcategory);
          }
        }
      }

      filter.sort();
      const unique = new Set(filter);
      const uniqueArray = Array.from(unique);
      this.subcategories = uniqueArray;
    }
  },
  updated() {
    if (document.querySelector('.url-search') && !this.typeahead) {
      this.initSuggestions();
    }
  }
}
</script>

<style lang="scss">
#search {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 40px;
  font-family: 'Roboto', monospace;
  text-align: center;
    @media(max-width: 768px){
        font-size: 20px;
    }

  &:before {
    font-family: "fontello";
    content: '\e801';
    padding-right: 30px;
    color: #999;
    float: right;
    @media(max-width: 768px){
        padding-right: 0px;
    }
  }

  .suggestions {
    list-style-type: none;
    a {
      color: #666;
      text-decoration: none;

      &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .explore-prompt {
    position: relative;
    left: -10px;
  }
}

.vue-typer .custom.caret {
  width: 45px;
  transform: rotate(90deg);
  background-color: #999;
  color: #999;
  height: 2px;
  position: relative;
  left: -8px;
  top: -2px;
}

.btns {
  margin: 10px 0 10px;
  text-align: center;
  display: block
}

.secondary {
  text-align: center;
  display: block;

  .btn {
    font-size: 14px;
    line-height: 1em;
    border: 2px solid #e4e4e4;
    color: #000;
    background-color: #fff;
    padding: 5px 14px 3px;
    margin: 0 4px 7px 0px;
    border-radius: 15px;
    box-shadow: 0 1px 2px rgba(218, 218, 218, 0.16), 0 1px 2px rgba(204, 201, 201, 0.23);


    &:hover, &:focus {
      background-color: #efebe4;
      border: 2px solid #efebe4;
    }

    &:active,
    &.active {
      border: 2px solid #efebe4;
      background-color: #efebe4;
    }
  }
}
</style>
