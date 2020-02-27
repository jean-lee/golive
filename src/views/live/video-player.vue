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
  @Prop({type: String, default: 'rtmp://58.200.131.2:1935/livetv/hunantv'}) private videopath!: string;
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private playStyle: object = {width: '100%', height: '500px'};

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */

}

</script>

<template>
<div class="module_living">
  <ali-player v-if="videopath !== ''" :source="videopath" 
  :autoplay="false" :is-live="true" :play-style="playStyle"></ali-player>

  <!-- <vue-aliplayer></vue-aliplayer> -->
</div>
</template>

<style lang="stylus" scoped>

.module_living
  width 100%
  height auto

</style>
