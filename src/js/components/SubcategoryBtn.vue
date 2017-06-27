<template>
  <button class="btn" @click="onBtnClick">{{ name }}</button>
</template>

<script>
export default {
  name: 'subcategory-btn',
  props: ['name'],
  methods: {
    onBtnClick(e) {
      this.$store.commit('updateInteraction', true);
      this.$store.commit('updateSubcategory', this.name)
    }
  }
}
</script>