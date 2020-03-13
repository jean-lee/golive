<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/10
 * desc: 调用videojsbo播放器
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import VideojsPlayer from '@/views/live/video_player/videojs_player.vue';

@Component({
  name: 'employ-videojs-player',
  components: {
    VideojsPlayer,
  },
})
export default class EmployVideojsPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({type: Object, default() { return {}; }}) private VideoInfo!: LIVESPACE.VideoPlayerInfoType;
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private videoKey: number = 0;
  private videoOptions = {
    autoplay: true,
    controls: true,
    controlBar: {
      progressControl: !this.VideoInfo.islive, // 直播时，不显示进度条
      volumePanel: {inline: false}, // 音量纵向调整
      playToggle: {replay: false}, // 隐藏重播图标
    },
    width: 1024, // 单独设置宽或高时，另外一项会按比例自动适配，保证画面在宽或高中占满父级
    // height: '576px',

    loop: !this.VideoInfo.islive,
    muted: true, // 静音
    fluid: false,
    poster: this.VideoInfo.poster, // 封面
    preload: 'metadata', // 预加载如视频长度、尺寸的信息
    liveui: this.VideoInfo.islive, // H5标签播放时，让进度条失效，仅允许点击暂停， flash无效
    playsinline: true,
    techOrder: ['html5', 'flash'],
    playbackRates: this.VideoInfo.islive ? [] : [0.5, 0.75, 1, 1.5, 1.75, 2], // flash不支持倍速
    plugins: { }, // 初始化播放器时使用自定义选项自动初始化插件
    language: 'zh-CN',
    notSupportedMessage: '此视频暂时无法播放',
    // html5: {
    //   hls: { overrideNative: true }, // 覆盖本地
    //   // flash: { withCredentials: false }
    //   // swf: './js/video-js.swf',
    // },
    flash: {
      // hls: { withCredentials: false }, // 使用证书
      swf: './js/video-js.swf', // 指定Video.js SWF文件在Flash技术位置的位置
    },
    sources: [
      {
        type: this.VideoInfo.type === 'mp4' ? 'video/mp4' : (this.VideoInfo.type === 'hls' ? 'application/x-mpegURL' : 'rtmp/flv'),
        src: this.VideoInfo.source,
      },
    ],

  };
  /* ------------------------ WATCH ------------------------ */
  @Watch('VideoInfo') private videoinfo_change(val: LIVESPACE.VideoPlayerInfoType) {
    this.videoKey++;
  }
  /* ------------------------ METHODS ------------------------ */

}

</script>

<template>
<div class="module_employ_videojs_player">
  <!-- 调用播放器实例 -->
  <videojs-player ref="videojs" v-if="videoOptions.sources[0].src !== ''" :options="videoOptions"
    :video-info="VideoInfo"></videojs-player>
</div>
</template>

<style lang="stylus" scoped>

.module_employ_videojs_player
  margin 0 auto
  // width 100%
  height 100%

</style>
