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
  @Prop({type: String, default: ''}) private source!: string;
  @Prop({type: String, default: 'rtmp'}) private type!: string;
  @Prop({type: Boolean, default: true}) private islive!: boolean;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */

  private videoOptions = {
    autoplay: true,
    controls: true,
    width: 1024, // 单独设置宽或高时，另外一项会按比例自动适配，保证画面在宽或高中占满父级
    // height: '576px',

    loop: true,
    muted: false, // 静音
    fluid: false,
    poster: '',
    preload: 'metadata', // 自动加载如视频长度、尺寸的信息
    // sourceOrder: true,
    liveui: this.islive, // 让进度条失效，仅允许点击暂停
    playsinline: true,
    techOrder: ['html5', 'flash'],
    playbackRates: this.islive ? [] : [0.5, 0.75, 1, 1.5, 1.75, 2], // flash不支持倍速
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
        type: 'video/mp4',
        src: '/badhappy.mp4',
      },
      // {
      //   type: 'application/x-mpegURL',
      //   src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
      // },
      // {
      //   type: 'rtmp/flv',
      //   src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
      // },
    ],

  };
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */

}

</script>

<template>
<div class="module_employ_videojs_player">
  <!-- 调用播放器实例 -->
  <videojs-player v-if="videoOptions.sources[0].src !== ''" :options="videoOptions"></videojs-player>

</div>
</template>

<style lang="stylus" scoped>

.module_employ_videojs_player
  margin 0 auto
  width 1024px
  height 576px

</style>
