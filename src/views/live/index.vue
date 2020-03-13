<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 直播 根页面
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';


import EmployAliPlayer from '@/views/live/_part/employ_ali_player.vue';
import EmployVideojsPlayer from '@/views/live/_part/employ_videojs_player.vue';
import CommentDanmu from '@/views/live/barrage/comment_danmu.vue';

@Component({
  name: 'live-index',
  components: {
    EmployAliPlayer,
    EmployVideojsPlayer,
    CommentDanmu,
  },
})
export default class LiveIndex extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private videoAddress: LIVESPACE.VIDEOTYPE[] = [
    {type: 'hls', id: 0, label: 'CCTV1', value: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8', islive: true},
    {type: 'hls', id: 1, label: 'CCTV3', value: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8', islive: false},
    {type: 'hls', id: 2, label: 'CCTV6', value: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8', islive: true},
    {type: 'rtmp', id: 3, label: '湖南卫视', value: 'rtmp://58.200.131.2:1935/livetv/hunantv', islive: true},
    {type: 'rtmp', id: 4, label: '香港卫视', value: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1', islive: false},
    {type: 'rtmp', id: 5, label: '香港财经', value: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc', islive: true},
    {type: 'rtmp', id: 6, label: '韩国GoodTV', value: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp', islive: true},
    {type: 'rtmp', id: 7, label: '美国1', value: 'rtmp://ns8.indexforce.com/home/mystream', islive: true},
    {type: 'rtmp', id: 8, label: '美国中文电视', value: 'rtmp://media3.sinovision.net:1935/live/livestream', islive: true},
  ];

  private activeVideoIndex: number = 0;
  private useAliPlayer: boolean = false;
  private showDanmu: boolean = false;
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  /**
   * 播放
   * @ source: 所选视频地址
   */
  private play(index: number) {
    this.activeVideoIndex = index;
  }
  /**
   * 更换播放器
   */
  // private change_player() {
  //   this.useAliPlayer = ! this.useAliPlayer;
  // }
}

</script>

<template>
<div class="module_index">
  <div class="head_top">
    <p class="video_title">{{videoAddress[activeVideoIndex].label}}</p>
    <button class="common_btn" :class="{active: useAliPlayer}" @click.stop="() => {useAliPlayer=!useAliPlayer}">使用阿里播放器</button>
    <button class="common_btn" :class="{active: !useAliPlayer}" @click.stop="() => {useAliPlayer=!useAliPlayer}">使用videojs播放器</button>
    <button class="common_btn" :class="{active: showDanmu}" @click.stop="() => {showDanmu=!showDanmu}">展示弹幕</button>
  </div>
  <div class="menu">
    <ul class="video_list">
      <li :class="{'active': index === activeVideoIndex}" v-for="(item, index) of videoAddress" :key="index"
       @click.stop="play(index)">{{item.label}}</li>
    </ul>
  </div>
  <div class="player_wrapp abp">
    <!-- 使用阿里封装的播放器 -->
    <template v-if="useAliPlayer">
      <employ-ali-player :source="videoAddress[activeVideoIndex].value" :type="videoAddress[activeVideoIndex].type" 
        :islive="videoAddress[activeVideoIndex].islive" :show-danmu="showDanmu"/>
    </template>
    <!-- 使用video.js播放器 -->
    <template v-else>
      <employ-videojs-player :source="videoAddress[activeVideoIndex].value" :type="videoAddress[activeVideoIndex].type" 
        :islive="false" :show-danmu="showDanmu"/>
        <!-- :islive="videoAddress[activeVideoIndex].islive"/> -->
    </template>

    <!-- 弹幕 -->
    <comment-danmu v-if="showDanmu"></comment-danmu>
  </div>


  
</div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl';

.module_index
  // margin-top 60px
  .head_top
    padding 0 60px
    background #191717
    height 60px
    line-height 60px
    clearfix()
    .video_title
      float left
      font-size $big_title_size
      color #c3c3c3
      text-align left
    .common_btn
      float right
      margin-top 16px
      margin-left 10px
      padding 6px
    .active
      color #2196f3
      border-color #2196f3
  .menu
    width 100%
    height 48px
    padding 0 60px
    .video_list
      padding 14px 0
      li
        display inline-block
        padding 0 8px
        width fit-content
        border-right 1px solid #666
        color #565656
        text-align center
        cursor pointer
        font-size $normal_font_size
        &:last-child
          border-right none
      .active
        color #2196f3
  .player_wrapp
    display inline-block
    // padding 50px 8px 36px
    width 1024px
    background #000
    
</style>
