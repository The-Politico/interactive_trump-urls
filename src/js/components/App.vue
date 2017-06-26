<template>
  <div id="wrapper">
    <div id="search">
      <vue-typer
        :text='["trumponice.com","trumpindia.com"]'
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
      <input class="url-search" type="text" v-if="interacted" placeholder="Search for a URL" />
    </div>
    <explorer :cards="cards"></explorer>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer';
import request from 'superagent';
import Explorer from './Explorer.vue'

export default {
  name: 'app',
  components: { 
    'explorer': Explorer,
    'vue-typer': VueTyper,
  },
  data() {
    return {
      url: "trumponice.com",
      cards: {}
    }
  },
  mounted() {
    this.getCards();
  },
  computed: {
    interacted() {
      return this.$store.state.interacted
    }
  },
  methods: {
    onTyped: function(typedString) {
      this.url = typedString;
    },
    getCards: function() {
      request
        .get('data/cards.json')
        .end((err, res) => {
          this.cards = res.body
        })
    }
  },
}
</script>

<style lang="scss">
#search {
  border: 1px solid #ddd;
  padding: 10px 20px;
  font-size: 24px;
  font-family: monospace;

  &:before {
    font-family: "fontello";
    content: '\e801';
    padding-right: 10px;
  }

  .url-search {
    border: none;
    width: 95%;
    display: inline-block;
    position: relative;
    left: -12px;
  }
}

.vue-typer .custom.caret {
  width: 30px;
  transform: rotate(90deg);
  background-color: #ccc;
  color: #ccc;
  height: 2px;
  position: relative;
  left: -8px;
  top: -2px;
}
</style>