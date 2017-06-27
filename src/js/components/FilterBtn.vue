<template>
  <button class="filter-btn btn" v-on:click="changeCategory">{{ category }}</button>
</template>

<script>
export default {
  name: 'filter-btn',
  props: ['category'],
  methods: {
    changeCategory: function(event) {
      this.$store.commit('updateInteraction', true);

      const allButtons = document.querySelectorAll('button.filter-btn');
      allButtons.forEach((btn) => {
        btn.classList.remove('selected');
      });
      event.target.classList.add('selected');

      if (this.$store.state.category === this.category) {
        this.$emit('reshuffle')
      } else {
        this.$store.commit('change', this.category)
        this.$store.commit('updateSubcategory', null);
      }
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
    font-weight: bold;
    outline: none;

    &:active {
      outline: none;
    }

    &.odd-names {
      &.selected, &:hover {
        background-color: #F4D7B1;
        border: 1px solid #F4D7B1;
        color: #111;
      }
    }

    &.business-ventures {
      &.selected, &:hover {
        background-color: #D2E6B7;
        border: 1px solid #D2E6B7;
        color: #111;
      }
    }

    &.foreign-ventures {
      &.selected, &:hover {
        background-color: #BCEBE7;
        border: 1px solid #BCEBE7;
        color: #111;
      }
    }

    &.political-sites {
      &.selected, &:hover {
        background-color: #F3C4C4;
        border: 1px solid #F3C4C4;
        color: #111;
      }
    }

    &.surprise-me {
      &.selected, &:hover {
        background-color: #EAEAEA;
        border: 1px solid #EAEAEA;
        color: #111;
      }
    }

  }
</style>