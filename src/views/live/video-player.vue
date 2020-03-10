<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 播放页
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import AliPlayer from './ali_player/ali_player.vue';
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
  name: 'video-player',
  components: {
    AliPlayer,
    // VueAliplayer,
  },
})
export default class VideoPlayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // 默认播放湖南卫视
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
    alert('this.$refs.player were destroyed , liveStream were stop! you need to reload this page to restart video playback');
  }
}

</script>

<template>
<div class="module_living">
   <div class="play_optation_row">
    <button class="op_btn" @click="play">播放</button>
    <button class="op_btn" @click="pause">暂停</button>
    <button class="op_btn" @click="replay">刷新视频</button>
    <button class="op_btn" @click="dispose">销毁播放器</button>
    <!-- <button @click="convert">切换</button> -->
  </div>
  <ali-player :source="source" ref="player" :play-style="playStyle"
  :autoplay="islive" :is-live="islive" :use-h5-prism="true"></ali-player>

  <!-- v-if="videopath !== ''" <vue-aliplayer></vue-aliplayer> type === 'rtmp' -->
</div>
</template>

<style lang="stylus" scoped>

.module_living
  margin 0 auto
  width 1024px
  height 576px
  .play_optation_row
    margin 8px 0
    text-align right
    .op_btn
      margin-left 8px
      cursor pointer
      background rgba(255,255,255,0.3)
      border 1px solid #727272
      color #f0f0f0
      border-radius 3px
      font-size 12px
      padding 4px 10px
      &:hover
        color #2196f3

</style>
