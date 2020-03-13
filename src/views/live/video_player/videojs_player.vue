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
 // video.js 6.x 及更高版本，flash技术位于单独的存储库中，video.js不能直接播放rtmp流，需要此插件
import 'videojs-flash';

@Component({
  name: 'videojs-player',
})
export default class VideojsPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({type: Object, default() { return {}; }}) private options!: object;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    // element, options, onPlayerReady
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      console.log('onPlayerReady mounted');

      this.player.on('ended', () => {
        console.log('播放结束了');
      });
      // this.player.on('progress', () => {
      //   console.log('开始播放播放中');
      //   this.loading = false;

      // });
      this.player.on('error', () => {
        console.log('异常，无法播放');
      });
    });

    // dynamic 动态绑定className, 更新播放器样式
    this.player.addClass('my_videojs_player');
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private player: any = null;
  private loading: boolean = false;

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private  beforeDestroy() {
    console.log('dispose beforeDestroy');
    if (this.player) {
      this.player.dispose();
    }
  }
  /**
   * 视频类型相同，切换视频地址时，重新调用src属性
   */
  // public refreshPlay() {
  //    this.player.src(this.source);
  //    this.player.load(source);
  //    this.player.play();
  // }
}

</script>

<template>
<div class="module_videojs_player">
  <video ref="videoPlayer" class="video-js vjs-big-play-centered" data-setup="{}"></video>
</div>
</template>

<style lang="stylus" scoped>

.module_videojs_player
  width 100%

</style>
