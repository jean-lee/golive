<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 直播 根页面
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';


import EmployAliPlayer from '@/views/live/_part/employ_ali_player.vue';
import EmployVideojsPlayer from '@/views/live/_part/employ_videojs_player.vue';

import CreateDanmu from '@/views/barrage/create_danmu.vue';
import SetGlobalStyle from '@/views/barrage/set_global_style.vue';
import CommentDanmu from '@/views/barrage/comment_danmu.vue';

@Component({
  name: 'live-index',
  components: {
    EmployAliPlayer,
    EmployVideojsPlayer,
    CommentDanmu,
    CreateDanmu,
    SetGlobalStyle,
  },
})
export default class LiveIndex extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    this.intervalGetCurrentTime();
  }
  private destroyed() {
    this.clearMyInterval();
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private videoAddress: LIVESPACE.VideoType[] = [
    {type: 'mp4', id: 9, name: '飞屋环游记（节选）', source: '/badhappy.mp4', islive: false, poster: '/images/see.jpg'},
    {type: 'hls', id: 0, name: 'CCTV1', source: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8', islive: true, poster: '/images/see.jpg'},
    {type: 'rtmp', id: 3, name: '湖南卫视', source: 'rtmp://58.200.131.2:1935/livetv/hunantv', islive: true, poster: '/images/see.jpg'},
    {type: 'hls', id: 1, name: 'CCTV3', source: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8', islive: true, poster: '/images/see.jpg'},
    {type: 'hls', id: 2, name: 'CCTV6', source: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8', islive: true, poster: '/images/see.jpg'},
    {type: 'rtmp', id: 5, name: '香港财经', source: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc', islive: true, poster: '/images/see_ha.jpg'},
    {type: 'rtmp', id: 4, name: '香港卫视', source: 'rtmp://live.hkstv.hk.lxdns.com/live/hks1', islive: true, poster: '/images/see.jpg'},
    {type: 'rtmp', id: 6, name: '韩国GoodTV', source: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp', islive: true, poster: '/images/see.jpg'},
    {type: 'rtmp', id: 7, name: '美国1', source: 'rtmp://ns8.indexforce.com/home/mystream', islive: true, poster: '/images/see.jpg'},
    {type: 'rtmp', id: 8, name: '美国中文电视', source: 'rtmp://media3.sinovision.net:1935/live/livestream', islive: true, poster: '/images/see.jpg'},
  ];

  private activeVideoIndex: number = 0;
  private useAliPlayer: boolean = false;
  private showDanmu: boolean = true;
  private videoKey: number = 0;

  // 播放器 实例
  private curTimeInterval: number = 0;
  private playerCurrentTime: number = 0;
  private isplay: boolean = true;

  // 弹幕展示 全局设置
  private global_set_value: LIVESPACE.CmtGlobalStylsSetType = {
    shieldtype: '1,2',
    opacity: 50,
    shieldcomment: 1,
    area: 0,
    speed: 40,
    fontsize: 40,
    limit: 0,
  };

  /* ------------------------ WATCH ------------------------ */
  @Watch('showDanmu') private showDanmuChange(val: boolean) {
    if (val && !this.curTimeInterval) {
      this.intervalGetCurrentTime();
    } else {
      this.clearMyInterval();
      this.close_cmt();
    }
  }
  @Watch('isplay', {immediate: true}) private isplay_change(val: boolean) {
    // 仅当展示弹幕时， 针对视频的播放暂停，弹幕联动
    if (this.showDanmu && val) {
      this.start_cmt();
    } else {
      this.stop_cmt();
    }
  }

  /* ------------------------ METHODS ------------------------ */
  /**
   * 设置定时器，获取视频当前播放时间及是否正在播放
   */
  private intervalGetCurrentTime() {
    if (this.showDanmu) {
      this.curTimeInterval = setInterval(() => {
        this.get_player_current_time();
      }, 100);
    }
  }
  /**
   * 清空定时器
   */
  private clearMyInterval() {
    clearInterval(this.curTimeInterval);
    this.curTimeInterval = 0;
  }
  /**
   * 播放
   * @ source: 所选视频地址
   */
  private play(index: number) {
    this.activeVideoIndex = index;
    this.videoKey++;
  }
  /**
   * 获取 当前已播放 时长
   */
  private get_player_current_time() {
    if (this.useAliPlayer) {
      const {isplay, currentTime}  =  (this.$refs.aliplayer as EmployAliPlayer).get_player_state();
      this.isplay = isplay;
      this.playerCurrentTime = Number(currentTime);
    } else {
      const {isplay, currentTime} = (this.$refs.videojsplayer as EmployVideojsPlayer).get_player_state();
      this.isplay = isplay;
      this.playerCurrentTime = currentTime;
    }
  }
  /**
   * 开启弹幕（销毁弹幕播放界面）
   */
  private start_cmt() {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).start();
    }
  }
  /**
   * 停止 弹幕 移动
   */
  private stop_cmt() {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).stop();
    }
  }
  /**
   * 插入弹幕
   */
  private insert_cmt_danmu(val: LIVESPACE.CmtDanmuType) {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).insert(val);
    }
  }
  /**
   * 关闭弹幕（销毁弹幕播放界面）
   */
  private close_cmt() {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).close();
    }
  }
  /**
   * 清空 弹幕
   */
  private clear_cmt() {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).clear();
    }
  }
  /**
   * 弹幕 输出 全局更改
   */
  // private cmt_global_set_change(val: LIVESPACE.CmtGlobalStylsSetType) {
  //   if (this.$refs.commentDanmuWrap) {
  //     (this.$refs.commentDanmuWrap as CommentDanmu).globalCmtStyleSet(val);
  //   }
  // }
}

</script>

<template>
<div class="module_index">
  <div class="head_top">
    <p class="video_title">{{videoAddress[activeVideoIndex].name}}</p>
    <button class="common_btn" :class="{active: useAliPlayer}" @click.stop="() => {useAliPlayer=!useAliPlayer}">使用阿里播放器</button>
    <button class="common_btn" :class="{active: !useAliPlayer}" @click.stop="() => {useAliPlayer=!useAliPlayer}">使用videojs播放器</button>
    <button class="common_btn" :class="{active: showDanmu}" @click.stop="() => {showDanmu=!showDanmu}">展示弹幕</button>
  </div>
  <div class="menu">
    <ul class="video_list">
      <li :class="{'active': index === activeVideoIndex}" v-for="(item, index) of videoAddress" :key="index"
       @click.stop="play(index)">{{item.name}}（{{item.type}}）</li>
    </ul>
  </div>

  <div class="player_wrapp abp">
    <!-- 使用阿里封装的播放器 -->
    <template v-if="useAliPlayer">
      <employ-ali-player ref="aliplayer" :key="videoKey" :video-info="videoAddress[activeVideoIndex]" />
    </template>

    <!-- 使用video.js播放器 -->
    <template v-else>
      <employ-videojs-player ref="videojsplayer" :key="videoKey" :video-info="videoAddress[activeVideoIndex]" />
    </template>

    <!-- 弹幕 -->
    <template v-show="showDanmu">
      <!-- 输出 弹幕 -->
      <comment-danmu ref="commentDanmuWrap" :player-current-time="playerCurrentTime" 
        :global-set-val="global_set_value"/>
      <div class="row_op">
        <!-- 新增 弹幕 -->
        <create-danmu class="row_op_item" @send-danmu="insert_cmt_danmu" @start="start_cmt" @close="close_cmt" />
        <!-- 全局样式设置 弹幕 -->
        <set-global-style class="row_op_item item_set" v-model="global_set_value" />
      </div>
    </template>
  </div>

</div>
</template>


<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl';

.module_index
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
      color $active_color
      border-color $active_color
  .menu
    padding 0 60px
    width 100%
    .video_list
      margin-top 10px
      padding 14px 0
      li
        display inline-block
        margin-bottom 10px
        padding 0 8px
        width fit-content
        height 14px
        line-height 14px
        border-right 1px solid #666
        color #565656
        text-align center
        cursor pointer
        font-size $normal_font_size
        &:last-child
          border-right none
      .active
        color $active_color
        font-weight 700
  .player_wrapp
    display inline-block
    width 1024px
    background #000
    .row_op
      height 44px
      line-height 44px
      clearfix()
      .row_op_item
        float right
        margin-right 12px

</style>
