<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/26
 * desc: 弹幕 全套
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import CommentDanmu from '@/views/barrage/comment_danmu.vue';
import CreateDanmu from '@/views/barrage/create_danmu.vue';
import SetGlobalStyle from '@/views/barrage/set_global_style.vue';

@Component({
  name: 'barrage',
  components: {
    CommentDanmu,
    CreateDanmu,
    SetGlobalStyle,
  },
})
export default class Barrage extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: Boolean, default: false}) private showDanmu!: boolean;
  @Prop({ type: Boolean, default: false}) private isplay!: boolean;
  @Prop({ type: Number, default: 0}) private playerCurrentTime!: number;

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  // 弹幕展示 全局设置
  private global_set_value: LIVESPACE.CmtGlobalStylsSetType = {
    shieldtype: '1',
    opacity: 50,
    shieldcomment: 1,
    area: 1,
    speed: 40,
    fontsize: 40,
    limit: 0,
  };
  /* ------------------------ WATCH ------------------------ */
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
   * 发送弹幕
   */
  private send_cmt_danmu(val: LIVESPACE.CmtDanmuType[]) {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).sendCmtData(val);
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
   * 关闭弹幕（销毁弹幕播放界面）
   */
  private close_cmt() {
    if (this.$refs.commentDanmuWrap) {
      (this.$refs.commentDanmuWrap as CommentDanmu).close();
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
<div class="module_barrage_index">
  <!-- 展示弹幕 -->
  <comment-danmu ref="commentDanmuWrap" :player-current-time="playerCurrentTime"></comment-danmu>

  <div class="row_op">
    <!-- 新增弹幕 @global-set-change="cmt_global_set_change" -->
    <create-danmu class="row_op_item" @send-danmu="send_cmt_danmu" @start="start_cmt" @close="close_cmt"></create-danmu>

    <!-- 全局设置弹幕样式 -->
    <set-global-style class="row_op_item item_set" v-model="global_set_value" @global-set-change="cmt_global_set_change"></set-global-style>
  </div>
</div>

</template>

<style lang="stylus" scoped>

.module_barrage_index
  .row_op
    height 44px
    line-height 44px
    clearfix()
    .row_op_item
      float right
      margin-right 12px

</style>
