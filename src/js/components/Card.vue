<template>
  <div :class="[cardClass, categoryClass]">
    <h4>{{ url.category }}</h4>
    <h3 :class="isLongTitle">{{ url.domain.toLowerCase() }}</h3>
    <p class="org">{{ url.owner_org }}</p>

    <div class="dates">
      <div class="date">
        <h5>Registered</h5>
        <p>{{ url.creation_date }}</p>
      </div>
      <div class="date">
        <h5>Renewed</h5>
        <p>{{ url.updated_date }}</p>
      </div>
      <div class="date">
        <h5>Expires</h5>
        <p>{{ url.expiration_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['url'],
  computed: {
    cardClass() {
      return 'card'
    },
    categoryClass() {
      return window.classify(this.url.category)
    },
    isLongTitle() {
      return this.url.domain.length > 35 ? this.url.domain.length > 50 ? 'tiny' : 'small' : null
    }
  }
}

</script>

<style lang="scss">
.card {
  box-sizing: border-box;
  padding: 40px 40px;
  margin: 0 10px;
  min-height: 267px;

  &.business-ventures {
    background-color: #D2E6B7;  
  }

  &.foreign-ventures {
    background-color: #BCEBE7;
  }

  &.political-sites {
    background-color: #F3C4C4;
  }

  &.odd-names {
    background-color: #F4D7B1;
  }


  h1, h2, h3, h4, h5, h6, p {
    text-align: left;
    font-family: "proxima-nova";
  }

  p {
    max-width: 100%;
  }

  h3 {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 28px;
    word-break: break-all;
  }

  h4 {
    font-size: 12px;
  }

  p {
    font-size: 13px;
  }

  .org {
    min-height: 21px;
  }

  .dates {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date {
    width: 33%;
    h5, p {
      text-align: center;
    }
  }
}
</style>