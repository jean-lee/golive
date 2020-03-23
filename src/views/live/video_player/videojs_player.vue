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
  @Prop({type: String, default: ''}) public source!: string;
  @Prop({type: Object, default() { return {}; }}) private options!: object;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    this.initVideojsPlayer();
  }
  // public playerCurrentTime: any = 0;
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  public player: any = null;
  private loading: boolean = false;

  // public get playerCurrentTime() {
  //   return this.player.cache_.currentTime;
  // }
  // public get playerDuration() {
  //   return this.player.cache_.duration;
  // }
  // : Promise<Object>
  public getVideojsTimeState() {
    return {currentTime: this.player.cache_.currentTime, duration: this.player.cache_.duration}
  }
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private initVideojsPlayer() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      console.log('onPlayerReady mounted');

      this.player.on('ended', () => {
        console.log('播放结束了');
      });
      // this.player.on('progress', () => {
      //   console.log('开始播放--- ' + this.player.duration);
      //   this.loading = false;
      // });
      this.player.on('error', () => {
        console.log('异常，无法播放');
      });
    });

    // dynamic动态绑定className, 更新播放器样式
    this.player.addClass('my_videojs_player');
  }
  private  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
  /**
   * 视频类型相同，切换视频地址时，重新调用src属性
   */
  public refreshPlay() {
    this.player.src(this.source);
    this.player.load(this.source);
    this.player.play();
  }
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
