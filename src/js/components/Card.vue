<template>
  <div class="card">
    <h4>{{ url.category }}</h4>
    <h3>{{ url.domain }}</h3>
    <p>{{ url.owner_org }}</p>

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
import request from 'superagent';

export default {
  name: 'card',
  props: ['url']
}

</script>

<style lang="scss">
.card {
  box-sizing: border-box;
  padding: 40px 100px;
  margin: 0 10px;
  background-color: #D2E6B7;


  h1, h2, h3, h4, h5, h6, p {
    text-align: left;
    font-family: "proxima-nova";
  }

  p {
    max-width: 100%;
  }

  h3 {
    font-family: monospace;
    font-size: 18px;
  }

  h4 {
    font-size: 12px;
  }

  p {
    font-size: 13px;
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