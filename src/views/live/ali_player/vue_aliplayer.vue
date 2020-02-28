<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/26
 * desc: 阿里播放器SDK（基于CommentCoreLibrary）
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import Aliplayer from 'vue-aliplayer';

import CommentDanmu from '@/views/live/barrage/comment_danmu.vue';

@Component({
  name: 'vue-aliplayer',
  components: {
    Aliplayer,
  },
})
export default class VueAliplayer extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // 默认播放湖南卫视
  @Prop({type: String, default: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'}) private videopath!: string;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */

}

</script>

<template>
<div class="module_vue_aliplayer">
  <!-- <vue-aliplayer></vue-aliplayer> -->
  <aliplayer :aliplayerSdkPath="videopath">
    <comment-danmu></comment-danmu>
  </aliplayer>
</div>
</template>

<style lang="stylus" scoped>

.module_vue_aliplayer
  pass

</style>
