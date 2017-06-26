<template>
  <button class="filter-btn btn" v-on:click="changeCategory">{{ category }}</button>
</template>

<script>
export default {
  name: 'filter-btn',
  props: ['category'],
  methods: {
    changeCategory: function(event) {
      const allButtons = document.querySelectorAll('button.filter-btn');
      allButtons.forEach((btn) => {
        btn.classList.remove('selected');
      });
      event.target.classList.add('selected');
      this.$store.commit('change', this.category)
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-btn {
    background-color: white;
    border: 1px solid #666;
    padding: 15px;
    border-radius: none;

    &.odd-names {
      &.selected, &:hover {
        background-color: #F4D7B1;
        border: 1px solid #F4D7B1;
        color: #D5AD78;
      }
    }

    &.business-ventures {
      &.selected, &:hover {
        background-color: #D2E6B7;
        border: 1px solid #D2E6B7;
        color: #778E58;
      }
    }

    &.foreign-ventures {
      &.selected, &:hover {
        background-color: #BCEBE7;
        border: 1px solid #BCEBE7;
        color: #6FA8A4;
      }
    }

    &.political-sites {
      &.selected, &:hover {
        background-color: #F3C4C4;
        border: 1px solid #F3C4C4;
        color: #D49393;
      }
    }

    &.surprise-me {
      &.selected, &:hover {
        background-color: #EAEAEA;
        border: 1px solid #EAEAEA;
        color: #737373;
      }
    }

  }
</style>