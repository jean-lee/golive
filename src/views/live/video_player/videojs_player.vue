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
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  public player: any = null;
  public isPlay: boolean = false;
  public playerCurrentTime: number = 0;


  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private initVideojsPlayer() {
    // const _me = this;
    // debugger
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.volume(0.1);
      // this.player.currentTime(8); // 设置播放进度

      this.player.on('ended', () => {
        this.isPlay = false;
        console.log('播放结束了');
      });
      this.player.on('error', () => {
        this.isPlay = false;
        console.error('异常，无法播放');
      });
      this.player.on('play', () => {
        this.isPlay = true;
        // console.log('playing-----' + this.isPlay);
      });
      this.player.on('pause', () => {
        this.isPlay = false;
        // console.log('paused--' + this.isPlay);
      });
      // this.player.on('progress', () => { // 进度变化
      // });


      // this.player.on('timeupdate', () => { // 判断视频真正播放，currentTime会变化
      //   console.log('timeupdate');
      // });
      // this.player.on('click', (e: any) => {
      //   console.log('click8', e.which)
      // })
    });
    // dynamic动态绑定className, 更新播放器样式
    this.player.addClass('my_videojs_player');
  }
  private  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
  public play() {
    this.isPlay = true;
    this.player.play();
  }
  public pause() {
    this.isPlay = false;
    this.player.pause();
  }
  /**
   * 视频类型相同，切换视频地址时，重新调用src属性
   */
  public refreshPlay() {
    this.player.src(this.source);
    this.player.load(this.source);
    this.player.play();
  }
  /**
   * 获取当前视频播放点，已播放时长
   */
  public getPlayerCurrentTime(): number {
    this.playerCurrentTime = this.player ? this.player.currentTime() : 0;
    return this.playerCurrentTime;
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
