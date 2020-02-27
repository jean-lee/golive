<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 基于阿里web播放器，改写直播rtmp格式播放模板
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import {
  // SKINLAYOUT_H5_VOD,
  // SKINLAYOUT_FLASH_VOD,
  SKINLAYOUT_H5_LIVE,
  SKINLAYOUT_FLASH_LIVE,
} from '@/constant/ali_player.ts';

import CommentDanmu from '@/views/live/barrage/comment_danmu.vue';

@Component({
  name: 'ali-player',
  components: {
    CommentDanmu,
  },
})
export default class AliPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({type: Object, default() { return {width: '100%', height: '500px'}; }}) private playStyle!: object;
  @Prop({type: String, default: ''}) private aliplayerSdkPath!: string;

  @Prop({type: Boolean, default: false}) private autoplay!: boolean;
  @Prop({type: Boolean, default: true}) private isLive!: boolean;
  @Prop({type: Boolean, default: false}) private playsinline!: boolean;

  @Prop({type: String, default: '100%'}) private width!: string;
  @Prop({type: String, default: '100%'}) private height!: string;
  // controlBarVisibility -> hover | click | always
  @Prop({type: String, default: 'always'}) private controlBarVisibility!: string;

  @Prop({type: Boolean, default: false}) private useH5Prism!: boolean;
  @Prop({type: Boolean, default: false}) private useFlashPrism!: boolean;
  // 显示缓冲进度
  @Prop({type: Boolean, default: true}) private showBuffer!: boolean;
  // 快照
  @Prop({type: Boolean, default: true}) private snapshot!: boolean;

  @Prop({type: String, default: ''}) private vid!: string;
  @Prop({type: String, default: ''}) private playauth!: string;
  @Prop({type: String, default: ''}) private source!: string;
  @Prop({type: String, default: ''}) private cover!: string;
  @Prop({type: String, default: 'm3u8'}) private format!: string;

  @Prop({type: String, default: 'h5'}) private x5Type!: string;
  @Prop({type: String, default: 'top'}) private x5VideoPosition!: string;
  @Prop({type: Boolean, default: false}) private x5Fullscreen!: boolean;
  @Prop({type: Number, default: 2}) private x5Orientation!: number;

  @Prop({type: Number, default: 0}) private autoPlayNumber!: number;
  @Prop({type: Number, default: 0}) private autoPlayDelay!: number;
  @Prop({type: String, default: 'waiting'}) private autoPlayDelayDisplayText!: string;


  @Emit('ready') private readyEmit() {}
  @Emit('ready') private playEmit() {}
  @Emit('ready') private pauseEmit() {}
  @Emit('ready') private endedEmit() {}
  @Emit('ready') private liveStreamStopEmit() {}
  @Emit('ready') private m3u8RetryEmit() {}
  @Emit('ready') private hideBarEmit() {}
  @Emit('ready') private waitingEmit() {}
  @Emit('ready') private snapshotedEmit() {}

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private created() {
    this.get_window_aliplayer();
  }
  private mounted() {
    this.get_window_aliplayer();
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private playerId: string = 'aliplayer_' + Math.random() * 100000000000000000;
  private scriptTagsStatus: number = 0;
  private instance: any = null;

  private danmukuList = [
    {mode: 1, text: 'hello world', stime: 0, size: '25', color: '#0056dd'},
    {mode: 1, text: 'hello jean', stime: 10, size: '35', color: '#f00'},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: '#fff'},
  ];
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private get_window_aliplayer() {
    if ((window as any).Aliplayer !== undefined) {
      // 如果全局对象崔仔，说明编辑器代码已初始化完成，直接加载编辑器
      this.scriptTagsStatus = 2;
      this.initAliplayer();
    } else {
      // 全局对象不存在，加载编辑器代码
      this.insertScriptTag();
    }
  }
  /**
   * 插入播放节点
   */
  private insertScriptTag() {
    let playerScriptTag: any = document.getElementById('playerScriptTag');

    // 如果playerScriptTag不存在，则生成相关代码tag以加载代码
    if (playerScriptTag === null) {
      playerScriptTag = document.createElement('script') as HTMLElement;
      playerScriptTag.type = 'text/javascript';
      playerScriptTag.src = this.aliplayerSdkPath;
      playerScriptTag.id = 'playerScriptTag';
      const s = document.getElementsByTagName('head')[0];
      s.appendChild(playerScriptTag);
    }

    if (playerScriptTag.loaded) {
      this.scriptTagsStatus++;
    } else {
      playerScriptTag.addEventListener('load', () => {
        this.scriptTagsStatus++;
        playerScriptTag.loaded = true;
      });
    }
    this.initAliplayer();
  }

  /**
   * 初始化播放器
   */
  private initAliplayer() {
    // scriptTagsStatus 为 2 的时候，说明两个必须引入的js文件都已经被引入，且加载完成
    if (this.scriptTagsStatus === 2 && this.instance === null) {
      this.$nextTick(() => {
        this.instance = (window as any).Aliplayer({
          id: this.playerId,

          autoplay: this.autoplay,
          isLive: this.isLive, // 直播时，页面将无播放暂停按钮
          rePlay: this.replay,
          playsinline: this.playsinline,

          width: this.width,
          height: this.height,
          controlBarVisibility: this.controlBarVisibility,

          useH5Prism: this.useH5Prism,
          useFlashPrism: this.useFlashPrism,
          showBuffer: this.showBuffer,
          snapshot: this.snapshot,

          vid: this.vid,
          playauth: this.playauth,
          source: this.source,
          cover: this.cover,
          format: this.format,

          x5_type: this.x5Type,
          x5_video_position: this.x5VideoPosition,
          x5_fullscreen: this.x5Fullscreen,
          x5_orientation: this.x5Orientation,

          autoPlayDelay: this.autoPlayDelay,
          autoPlayDelayDisplayText: this.autoPlayDelayDisplayText,

          // skinLayout: SKINLAYOUT_H5_VOD,
          // skinLayout: SKINLAYOUT_FLASH_VOD,
          skinLayout: SKINLAYOUT_H5_LIVE,
          // skinLayout: SKINLAYOUT_FLASH_LIVE,

          // components: [{
          //   name: 'AliplayerDanmuComponent',
          //   // type: AliPlayerComponent.AliplayerDanmuComponent,
          //   args: [this.danmukuList],
          // }],
        });

        // 绑定事件： 当Alipalyer初始化完成后，将编辑器实例通过自定义的ready事件交出去
        this.instance.on('ready', () => {
          this.readyEmit();
        });
        this.instance.on('play', () => {
          this.playEmit();
        });
        this.instance.on('pause', () => {
          this.pauseEmit();
        });
        this.instance.on('ended', () => {
          this.endedEmit();
        });
        this.instance.on('liveStreamStop', () => {
          this.liveStreamStopEmit();
        });
        this.instance.on('m3u8Retry', () => {
          this.m3u8RetryEmit();
        });
        this.instance.on('hideBar', () => {
          this.hideBarEmit();
        });
        this.instance.on('waiting', () => {
          this.waitingEmit();
        });
        this.instance.on('snapshoted', () => {
          this.snapshotedEmit();
        });
      });
    }
  }
  /**
   * 播放 视频
   */
  private play() {
    this.instance.play();
  }
  /**
   * 暂停 视频
   */
  private pause() {
    this.instance.pause();
  }
  /**
   * 重播 视频
   */
  private replay() {
    this.instance.replay();
  }
  /**
   * 跳转到某个时刻进行播放
   * @argument time 的单位为秒
   */
  private seek(time: number) {
    this.instance.seek(time);
  }
  /**
   * 获取当前时间 单位秒
   */
  private getCurrentTime() {
    this.instance.getCurrentTime();
  }
  /**
   * 获取视频总时长，返回的单位为秒
   * @returns 返回的单位为秒
   */
  private getDuration() {
    this.instance.getDuration();
  }
  /**
   * 获取当前的音量，返回值为0-1的实数ios和部分android会失效
   */
  private getVolume() {
    this.instance.getVolume();
  }
  /**
   * 设置音量，vol为0-1的实数，ios和部分android会失效
   */
  private setVolume() {
    this.instance.setVolume();
  }
  /**
   * 直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
   * @argument url 视频地址
   * @argument time 跳转到多少秒
   */
  private loadByUrl(url: string, time: number) {
    this.instance.loadByUrl(url, time);
  }
  /**
   * 设置播放速度
   * @argument speed 速度
   */
  private setSpeed(speed: string) {
    this.instance.setSpeed(speed);
  }
  /**
   * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
   * @argument w 播放器宽度
   * @argument h 播放器高度
   */
  private setPlayerSize(w: number, h: number) {
    this.instance.setPlayerSize(w, h);
  }
  /**
   * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
   * @argument vid 视频id
   * @argument playauth 播放凭证
   */
  private reloaduserPlayInfoAndVidRequestMts(vid: number, playauth: string) {
    this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth);
  }
}

</script>

<template>
  <div class="prism-player" :id="playerId" :style="playStyle">
    <comment-danmu></comment-danmu>
  </div>
</template>

<style lang="stylus" scoped>
// @import url('https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css');

.module_idnex
  pass

</style>
