<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 播放页
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import AliPlayer from '@/views/live/video_player/ali_player.vue';

function getUrlParam(sKey: string) {
  const resObj: any = null;
  const reg = /(\w+)=(\w+)/g;
  while (reg.exec(window.location.href)) {
    resObj[RegExp.$1] ? resObj[RegExp.$1] = [].concat(resObj[RegExp.$1], (RegExp as any).$2) : resObj[RegExp.$1] = RegExp.$2;
  }
  if (sKey) {
    return (resObj[sKey] ? resObj[sKey] : '');
  }
  return resObj;
}

@Component({
  name: 'employ-ali-player',
  components: {
    AliPlayer,
  },
})
export default class EmployAliPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({type: Object, default() { return {}; }}) private VideoInfo!: LIVESPACE.VideoPlayerInfoType;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private playStyle: object = {width: '1024px', height: '576px'};
  /* ------------------------ WATCH ------------------------ */
  // @Watch('source') private source_change(val: string) {
  //   const player = (this.$refs.aliplayer as any);
  //   this.$nextTick(() => {
  //     player && player.reloadPlayer();
  //   });
  // }
  /* ------------------------ METHODS ------------------------ */
  /**
   * 播放
   */
  private play() {
    (this.$refs.aliplayer as any).play();
  }
  /**
   * 暂停
   */
  private pause() {
    (this.$refs.aliplayer as any).pause();
  }
  /**
   * 重播
   */
  private replay() {
    (this.$refs.aliplayer as any).replay();
  }
  /**
   * 销毁
   */
  private dispose() {
    (this.$refs.aliplayer as any).dispose();
    // alert('This.$refs.player were destroyed, liveStream were stop! If you want see again, you need to refresh current page.');
  }
  /**
   * 组件销毁前，销毁播放器，停止数据请求
   */
  private beforeDestroy() {
    this.dispose();
  }
  /**
   * 获取当前播放时间
   */
  public get_player_state() {
    const currentTime = (this.$refs.aliplayer as AliPlayer).getCurrentTime();
    const isplay = (this.$refs.aliplayer as AliPlayer).isPlay;

    return {isplay, currentTime};
  }
}

</script>

<template>
<div class="module_employ_ali_player">
  <!-- 调用播放器实例 -->
  <ali-player ref="aliplayer" :play-style="playStyle" v-if="VideoInfo.source !== ''"
    :source="VideoInfo.source" :is-live="VideoInfo.islive" :cover="VideoInfo.poster"
    @play="play" @pause="pause" @replay="replay"></ali-player>

  <!--
    <div class="play_optation_row">
      <button class="common_btn" @click="play">播放</button>
      <button class="common_btn" @click="pause">暂停</button>
      <button class="common_btn" @click="replay">刷新视频</button>
      <button class="common_btn" @click="dispose">销毁播放器</button>
    </div>
   -->

</div>
</template>

<style lang="stylus" scoped>

.module_employ_ali_player
  margin 0 auto
  width 100%
  .play_optation_row
    margin 8px 0
    text-align right


</style>
