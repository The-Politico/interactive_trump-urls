import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';
import Explorer from './components/Explorer.vue'
import request from 'superagent';

let allCards = {};

window.$('.icon-facebook').click((e) => {
  e.preventDefault();
  const uri = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uri}`);
});


window.$('.icon-twitter').click((e) => {
  e.preventDefault();
  const uri = window.location.href;
  const status = encodeURIComponent(`${window.tweetText} ${uri}`);
  window.open(`https://twitter.com/home?status=${status}`);
});


window.classify = function(str) {
  return str.toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
} 

getCards();

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    category: null,
    interacted: false,
    selection: null,
    subcategory: null
  },
  mutations: {
    change(state, newCategory) {
      state.category = newCategory;
    },
    updateInteraction(state, interaction) {
      state.interacted = interaction;
    },
    updateSelection(state, newSelection) {
      state.selection = newSelection;
    },
    updateSubcategory(state, newSubcategory) {
      state.subcategory = newSubcategory;
    }
  }
})

const app = new Vue({
  el: '#intro-app',
  store,
  components: {
    App: App
  },
  render: h => h(App),
})

function getCards() {
  request
    .get('data/cards.json')
    .end((err, res) => {
      allCards = res.body;
      renderExtraEmbeds();
    });
}

function cardFilter(category, subcategory) { 
  const filter = [];

  for (var key in allCards) {
    if (allCards.hasOwnProperty(key)) {
      const cardCategory = allCards[key]['category']
      const cardSubcategory = allCards[key]['subcategory'];

      if (subcategory) {
        if (cardCategory === category && cardSubcategory === subcategory) {
          filter.push(allCards[key]);
        }
      } else {
        if (cardCategory === category) {
          filter.push(allCards[key]);
        }
      }
    }
  }

  return filter;
}

function renderExtraEmbeds() {
  const trumpU = new Vue({
    el: '#trump-u',
    components: {
      Explorer: Explorer  
    },
    render: h => h(Explorer, { 
      props: {
        cards: cardFilter('Business Ventures', 'Trump University')
      },
    })
  });

  const foreign = new Vue({
    el: '#foreign',
    components: {
      Explorer: Explorer  
    },
    render: h => h(Explorer, { 
      props: {
        cards: cardFilter('Foreign Ventures')
      },
    })
  });
}