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

      if (!this.$store.state.category && this.category === null) {
        this.$store.commit('change', 'Surprise me!');
      } else if (this.$store.state.category === 'Surprise me!' && this.category === 'Surprise me!') {
        this.$store.commit('change', null);
      } else {
        this.$store.commit('change', this.category);
        this.$store.commit('updateSubcategory', null);

        const allSubcategoryBtns = document.querySelectorAll('.subcategories .btn');
        console.log(allSubcategoryBtns);
        allSubcategoryBtns.forEach((btn) => {
          btn.classList.remove('active');
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .filter-btn {
    background-color: white;
    border: 2px solid #666;
    padding: 10px;
    border-radius: none;
    font-weight: normal;
    outline: none;
      @media(max-width: 768px){
        font-size: 13px;
        padding: 8px 10px;
      }


    &:active {
      outline: none;
    }

    &.odd-names {
      border: 2px solid #F4D7B1;
      &.selected, &:hover {
        background-color: #F4D7B1;
        border: 2px solid #F4D7B1;
        color: #111;
      }
    }

    &.business-ventures {
        border: 2px solid #D2E6B7;
      &.selected, &:hover {
        background-color: #D2E6B7;
        border: 2px solid #D2E6B7;
        color: #111;
      }
    }

    &.foreign-ventures {
      border: 2px solid #BCEBE7;
      &.selected, &:hover {
        background-color: #BCEBE7;
        border: 2px solid #BCEBE7;
        color: #111;
      }
    }

    &.political-sites {
    border: 2px solid #F3C4C4;
      &.selected, &:hover {
        background-color: #F3C4C4;
        border: 2px solid #F3C4C4;
        color: #111;
      }
    }

    &.surprise-me {
    border: 2px solid #EAEAEA;
      &.selected, &:hover {
        background-color: #EAEAEA;
        border: 2px solid #EAEAEA;
        color: #111;
      }
    }

  }
</style>
