<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 基于阿里web播放器，改写直播rtmp格式播放模板
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import {
  SKINLAYOUT_H5_VOD,
  SKINLAYOUT_FLASH_VOD,
  SKINLAYOUT_H5_LIVE,
  SKINLAYOUT_FLASH_LIVE,
} from '@/constant/ali_player.ts';

import CommentDanmu from '@/views/barrage/comment_danmu.vue';

@Component({
  name: 'ali-player',
  components: {
    CommentDanmu,
  },
})
export default class AliPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // 阿里播放器引用地址
  @Prop({type: String, default: 'http://g.alicdn.com/de/prismplayer/2.8.7/aliplayer-min.js'}) private aliplayerSdkPath!: string;
  // 播放器自定义样式style '100%' | '100px' 宽高比规则：  w:h = 16:9
  @Prop({type: Object, default() { return {width: '924px', height: '520px'}; }}) private playStyle!: object;
  // 播放器宽度 | 高度
  @Prop({type: String, default: '100%'}) private width!: string;
  @Prop({type: String, default: '100%'}) private height!: string;
  // controlBarVisibility -> hover | click | always
  @Prop({type: String, default: 'always'}) private controlBarVisibility!: string;

  // 显示缓冲进度
  @Prop({type: Boolean, default: true}) private showBuffer!: boolean;
  // 快照
  @Prop({type: Boolean, default: true}) private snapshot!: boolean;


  // 自动播放
  @Prop({type: Boolean, default: true}) private autoplay!: boolean;
  // 自动加载
  @Prop({type: Boolean, default: true}) private preload!: boolean;
  // 播放器默认封面图片，请填写正确的图片url地址Flash播放器封面也需要开启允许跨域访问
  // 自动加载与自动播放为false时生效显示
  @Prop({type: String, default: ''}) private cover!: string;
  // 媒体转码服务的媒体Id
  @Prop({type: String, default: ''}) private vid!: string;
  @Prop({type: String, default: ''}) private playauth!: string;
  // 视频播放地址url：1、单独url；2、默认状态，表示使用“vi+playauth3、source播放方式优先级最高
  @Prop({type: String, default: ''}) private source!: string;
  // 指定播放地址格式，只有使用vid+plauth播放方式时支持可选值为'mp4'和'm3u8',默认为'mp4'
  @Prop({type: String, default: 'm3u8'}) private format!: string;

  // 播放内容是否为直播，直播时会禁止用户拖动进度条
  @Prop({type: Boolean, default: true}) private isLive!: boolean;
  // 指定使用Flash播放器
  @Prop({type: Boolean, default: false}) private useFlashPrism!: boolean;
  // H5是否内置播放
  @Prop({type: Boolean, default: true}) private playsinline!: boolean;
  // 指定使用H5播放器
  @Prop({type: Boolean, default: true}) private useH5Prism!: boolean;
  // 声明启用同层H5播放器，启用时设置的值为'h5'具体参考同层播放 默认'auto'
  @Prop({type: String, default: 'h5'}) private x5Type!: string;
  // 声明视频播在界面上的位置，默认为"center" 可选值为：'top'，'center' 具体参考同层播放
  @Prop({type: String, default: 'top'}) private x5VideoPosition!: string;
  // 声明视频播放时是否进入到TBS的全屏模式，默认为false具体参考同层播放
  @Prop({type: Boolean, default: false}) private x5Fullscreen!: boolean;
  // 声明TBS播放器支持的方向，可选值：landscape:横屏） portraint:竖屏 landscape
  @Prop({type: Number, default: 2}) private x5Orientation!: number;

  // @Prop({type: Number, default: 0}) private autoPlayNumber!: number;
  // 延迟播放时间，单位为秒具体参考延迟播放
  @Prop({type: Number, default: 0}) private autoPlayDelay!: number;
  // 延迟播放提示文本具体参考延迟播放
  @Prop({type: String, default: 'waiting'}) private autoPlayDelayDisplayText!: string;


  @Emit('ready') private readyEmit() {}
  @Emit('play') private playEmit() {}
  @Emit('pause') private pauseEmit() {}
  @Emit('replay') private replayEmit() {}
  @Emit('ended') private endedEmit() {}
  @Emit('live-streamstop') private liveStreamStopEmit() {}
  @Emit('m3u8retry') private m3u8RetryEmit() {}
  @Emit('hidebar') private hideBarEmit() {}
  @Emit('waiting') private waitingEmit() {}
  @Emit('snapshoted') private snapshotedEmit() {}

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  // private created() {
  //   this.get_window_aliplayer();
  // }
  private mounted() {
    this.get_window_aliplayer();
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private playerId: string = 'aliplayer_' + Math.random() * 100000000000000000;
  private scriptTagsStatus: number = 0;
  private instance: any = null;
  private ct: any = null;
  public isPlay: boolean = false;

  get whichSkinLayout() {
    // h5
    if (this.isLive) {
      return this.useH5Prism ? SKINLAYOUT_H5_LIVE : SKINLAYOUT_FLASH_LIVE;
    }
    // flash
    return this.useH5Prism ? SKINLAYOUT_H5_VOD : SKINLAYOUT_FLASH_VOD;
    // return this.isLive ? (this.useH5Prism ? SKINLAYOUT_H5_LIVE : SKINLAYOUT_FLASH_LIVE)
    //   : (this.useH5Prism ? SKINLAYOUT_H5_VOD : SKINLAYOUT_FLASH_VOD);
  }
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private get_window_aliplayer() {
    if ((window as any).Aliplayer !== undefined) {
      // 如果全局对象存在，说明编辑器代码已初始化完成，直接加载编辑器
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
    if (
        this.scriptTagsStatus === 2 &&
        (this.instance === null || this.reloadPlayer)
    ) {

      // (document.querySelector('#' + this.playerId) as HTMLElement).innerHTML = '';
      // this.instance && this.instance.dispose();

      this.$nextTick(() => {
        this.instance = (window as any).Aliplayer({
          id: this.playerId,

          autoplay: this.autoplay,
          isLive: this.isLive,
          rePlay: this.replay,
          playsinline: this.playsinline,

          width: this.width,
          height: this.height,
          controlBarVisibility: this.controlBarVisibility,

          vid: this.vid,
          playauth: this.playauth,
          source: this.source,
          cover:  !this.autoplay && !this.preload ? this.cover : '', // preload和autoplay为false时， 才生效
          format: this.format,

          useH5Prism: this.useH5Prism,
          useFlashPrism: !this.useH5Prism,
          showBuffer: this.showBuffer,
          snapshot: this.snapshot,

          x5_type: this.x5Type,
          x5_video_position: this.x5VideoPosition,
          x5_fullscreen: this.x5Fullscreen,
          x5_orientation: this.x5Orientation,

          autoPlayDelay: this.autoPlayDelay,
          autoPlayDelayDisplayText: this.autoPlayDelayDisplayText,

          skinLayout: this.whichSkinLayout,
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
        this.instance.on('replay', () => {
          this.replayEmit();
        });
        this.instance.on('waiting', () => {
          this.waitingEmit();
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
        this.instance.on('snapshoted', () => {
          this.snapshotedEmit();
        });

        this.setVolume(0.1);
      });
    }
  }
  /**
   * 播放 视频
   */
  public play() {
    this.isPlay = true;
    this.instance.play();
  }
  /**
   * 暂停 视频
   */
  public pause() {
    this.isPlay = false;
    this.instance.pause();
  }
  /**
   * 重播 视频
   */
  public replay() {
    this.isPlay = true;
    this.instance.replay();
  }
  /**
   * 跳转到某个时刻进行播放
   */
  public seek(time: number) {
    this.instance.seek(time);
  }
  /**
   * 获取当前时间 单位秒
   */
  public getCurrentTime() {
   return this.instance.getCurrentTime();
  }
  /**
   * 获取视频总时长，返回的单位为秒
   */
  public getDuration() {
   return this.instance.getDuration();
  }
  /**
   * 获取当前的音量，返回值为0-1的实数ios和部分android会失效
   */
  public getVolume() {
    return this.instance.getVolume();
  }
  /**
   * 设置音量，vol为0-1的实数，ios和部分android会失效
   */
  public setVolume(val: number) {
    this.instance.setVolume(val);
  }
  /**
   * 直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换，暂不支持直播rtmp流切换
   * @argument url 视频地址
   * @argument time 跳转到多少秒
   */
  public loadByUrl(url: string, time: number) {
    this.instance.loadByUrl(url, time);
  }
  /**
   * 设置倍速播放移动端可能会失效，比如android 微信
   */
  public setSpeed(speed: string) {
    this.instance.setSpeed(speed);
  }
  /**
   * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
   * @argument w 播放器宽度
   * @argument h 播放器高度
   */
  public setPlayerSize(w: number, h: number) {
    this.instance.setPlayerSize(w, h);
  }
  /**
   * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
   * @argument vid 视频id
   * @argument playauth 播放凭证
   */
  public reloaduserPlayInfoAndVidRequestMts(vid: number, playauth: string) {
    this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth);
  }
  /**
   * 重新加载
   */
  public reloadPlayer() {
    this.initAliplayer();
  }
  /**
   * 播放器释放销毁
   */
  public dispose() {
    this.instance.dispose();
  }
}

</script>

<template>
  <div class="prism-player" :id="playerId" :style="playStyle">
  </div>
</template>

