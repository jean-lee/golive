<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 直播 根页面
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';


import VideoPlayer from '@/views/live/video-player.vue';

interface VIDEOTYPE {
  type: string;
  id: number;
  label: string;
  value: string;
}

@Component({
  name: 'live-index',
  components: {
    VideoPlayer,
  },
})
export default class LiveIndex extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private videoAddress: VIDEOTYPE[] = [
    {type: 'hls', id: 0, label: 'CCTV1', value: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'},
    {type: 'hls', id: 1, label: 'CCTV3', value: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'},
    {type: 'hls', id: 2, label: 'CCTV6', value: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'},
    {type: 'rtmp', id: 3, label: '湖南卫视', value: 'rtmp://58.200.131.2:1935/livetv/hunantv'},
    {type: 'rtmp', id: 4, label: '香港卫视', value: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1'},
    {type: 'rtmp', id: 5, label: '香港财经', value: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc'},
    {type: 'rtmp', id: 6, label: '韩国GoodTV', value: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp'},
    {type: 'rtmp', id: 7, label: '美国1', value: 'rtmp://ns8.indexforce.com/home/mystream'},
    {type: 'rtmp', id: 8, label: '美国中文电视', value: 'rtmp://media3.sinovision.net:1935/live/livestream'},
  ];

  private activeVideoIndex: number = 0;
  private key: number = 0;
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  /**
   * 播放
   * @ source: 所选视频地址
   */
  private play(index: number) {
    this.activeVideoIndex = index;
    this.key++;
  }
}

</script>

<template>
<div class="module_index">
  <div class="left">
    <p class="video_title">{{videoAddress[activeVideoIndex].label}}</p>
    <!-- 播放画面 -->
    <video-player :videopath="videoAddress[activeVideoIndex].value" :key="key"/>
  </div>
  <div class="right">
    <ul class="video_list">
      <li :class="{'active': index === activeVideoIndex}" v-for="(item, index) of videoAddress" :key="index"
       @click.stop="play(index)">{{ item.label}}</li>
    </ul>
  </div>

  
</div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl';

.module_index
  margin-top 60px
  .left
    display inline-block
    width calc(100% - 201px)
    vertical-align top
    border-right 1px solid #666
    .video_title
      padding-left 20px
      line-height 50px
      font-size $big_title_size
      color #565656
      text-align left
  .right
    display inline-block
    width 200px
    .video_list
      li
        // float left
        // padding 0 12px
        // width fit-content
        height 32px
        line-height 32px
        border-bottom 1px dashed #333
        color #565656
        text-align center
        cursor pointer
        font-size $normal_font_size
      .active
        color #f8f8f8

</style>
