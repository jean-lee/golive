<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LiveIndex from '@/views/live/index.vue';

@Component({
  components: {
    LiveIndex,
  },
})
export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <live-index/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
