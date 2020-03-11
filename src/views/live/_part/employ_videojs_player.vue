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
    width: '1024',
    height: '576',

    // techOrder: ['flash', 'html5'],
    // sourceOrder: true,
    // liveui: true,
    // flash: {
    //   hls: { withCredentials: true },
    //   // swf: 'statics/video-js.swf',
    // },
    // html5: { hls: { withCredentials: true } },
    sources: [{
      // type: 'rtmp/flv',
      type: 'video/mp4',
      // src: this.source,
      src: '/test_video.mp4',
      // src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
      // src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
      // src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks2', // 香港卫视
      // disableProgress: true,
    }],

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
