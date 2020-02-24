<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/24
 * desc: 直播 根页面
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import Living from './_part/living.vue';

@Component({
  name: 'live-index',
  components: {
    Living,
  },
})
export default class LiveIndex extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */

}

</script>

<template>
<div class="module_index">
  LIVE CONFIG

  <!-- 播放画面 -->
  <living/>
</div>
</template>

<style lang="stylus" scoped>

.module_index
  pass

</style>
