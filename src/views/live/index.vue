<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 直播 根页面
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';


import VideoPlayer from '@/views/live/video-player.vue';

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
  private videoAddress = [
    {type: 'hls', label: 'CCTV1', value: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'},
    {type: 'hls', label: 'CCTV3', value: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'},
    {type: 'hls', label: 'CCTV6', value: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'},
    {type: 'rtmp', label: '湖南卫视', value: 'rtmp://58.200.131.2:1935/livetv/hunantv'},
    {type: 'rtmp', label: '香港卫视', value: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1'},
    {type: 'rtmp', label: '香港财经', value: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc'},
    {type: 'rtmp', label: '韩国GoodTV', value: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp'},
    {type: 'rtmp', label: '美国1', value: 'rtmp://ns8.indexforce.com/home/mystream'},
    {type: 'rtmp', label: '美国中文电视', value: 'rtmp://media3.sinovision.net:1935/live/livestream'},
  ];

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */

}

</script>

<template>
<div class="module_index">
  <div class="left">
    <!-- 播放画面 -->
    <video-player :videopath="videoAddress[0].value"/>
  </div>
  <div class="right">
    <ul>
      <li v-for="(item, index) of videoAddress" :key="index">{{ item.label}}</li>
    </ul>
  </div>

  
</div>
</template>

<style lang="stylus" scoped>

.module_index
  .left
    display inline-block
    width calc(100% - 201px)
  .right
    display inline-block
    width 200px
    border-left 1px solid #666

</style>
