import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue'

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

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    category: 'Surprise me!'
  },
  mutations: {
    change (state, newCategory) {
      state.category = newCategory
    }
  }
})

const app = new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: {
    App: App
  },
  render: h => h(App),
})