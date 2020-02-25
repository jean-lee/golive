<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LivingIndex from '@/views/live/index.vue';

@Component({
  components: {
    LivingIndex,
  },
})
export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <living-index></living-index>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  height 100%

</style>
