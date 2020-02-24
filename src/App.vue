<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VideoPlayer from '@/views/live/video-player.vue';

@Component({
  components: {
    VideoPlayer,
  },
})
export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <video-player />
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
