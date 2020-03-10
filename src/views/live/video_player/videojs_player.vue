<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/10
 * desc: video.js 播放器
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import 'video.js/dist/video-js.css';

import _videojs from 'video.js';
const videojs = (window as any).videojs || _videojs;
import 'videojs-flash';

@Component({
  name: 'videojs-player',
})
export default class VideojsPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({type: String, default: ''}) private source!: string;
  @Prop({type: Object, default() { return {}; }}) private options!: object;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    console.log('dispose beforeDestroy');
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady mounted');
    });
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private player: any = null;

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private  beforeDestroy() {
    console.log('dispose beforeDestroy');
    if (this.player) {
      this.player.dispose();
    }
  }
}

</script>

<template>
<div class="module_video_player">
  <video src="" ref="videoPlayer" class="video-js"></video>
</div>
</template>

<style lang="stylus" scoped>

.module_video_player
  width 1024px

</style>
