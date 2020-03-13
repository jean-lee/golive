<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 播放页
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import AliPlayer from '@/views/live/video_player/ali_player.vue';

// import VueAliplayer from './ali_player/vue_aliplayer.vue';

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
  @Prop({type: String, default: ''}) private source!: string;
  @Prop({type: String, default: 'rtmp'}) private type!: string;
  @Prop({type: Boolean, default: true}) private islive!: boolean;
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private playStyle: object = {width: '1024px', height: '576px'};

  /* ------------------------ WATCH ------------------------ */
  @Watch('source') private source_change(val: string) {
    const player = (this.$refs.player as any);
    player && player.reloadPlayer();
  }
  /* ------------------------ METHODS ------------------------ */
  /**
   * 播放
   */
  private play() {
    const player = (this.$refs.player as any).instance;
    player && player.play();
  }
  /**
   * 暂停
   */
  private pause() {
    const player = (this.$refs.player as any).instance;
    player && player.pause();
  }
  /**
   * 重播
   */
  private replay() {
    const player = (this.$refs.player as any).instance;
    player && player.replay();
  }
  /**
   * 销毁
   */
  private dispose() {
    (this.$refs.player as any).instance.dispose();
    alert('This.$refs.player were destroyed, liveStream were stop! If you want see again, you need to refresh current page.');
  }
  /**
   * 组件销毁前，销毁播放器，停止数据请求
   */
  private beforeDestroy() {
    this.dispose();
  }
}

</script>

<template>
<div class="module_employ_ali_player">
  <div class="play_optation_row">
    <button class="common_btn" @click="play">播放</button>
    <button class="common_btn" @click="pause">暂停</button>
    <button class="common_btn" @click="replay">刷新视频</button>
    <button class="common_btn" @click="dispose">销毁播放器</button>
    <!-- <button @click="convert">切换</button> -->
  </div>

  <!-- 调用播放器实例 -->
  <ali-player :source="source" ref="player" :play-style="playStyle"
    :autoplay="islive" :is-live="islive" :use-h5-prism="true"></ali-player>

</div>
</template>

<style lang="stylus" scoped>

.module_employ_ali_player
  margin 0 auto
  width 1024px
  height 576px
  .play_optation_row
    margin 8px 0
    text-align right


</style>
