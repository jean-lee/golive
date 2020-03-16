<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/16
 * desc: 
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'set-global-style',
})
export default class SetGlobalStyle extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: Boolean, default: false}) private show!: boolean;

  @Emit('close') private close_event() {}
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private close() {
    this.close_event();
  }
}

</script>

<template>
  <div class="module_set_global_style">
    <!-- 全局 弹幕 样式设置 -->
    <base-dialog :show="show" :has-footer="false" size="big_normal" max-height="244"
      @close="close"></base-dialog>
  </div>
</template>

<style lang="stylus" scoped>

.module_set_global_style
  pass

</style>
