<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2019/03/16
 * desc: 基础弹窗
 */

import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { MessageBoxInputData, MessageBoxCloseAction } from 'element-ui/types/message-box';

// import { confirm_message } from '@/utils/dom';

@Component({
  name: 'base-dailog',
})
export default class BaseDialog extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // 是否有默认 header
  @Prop({type: Boolean, default: true}) private hasHeader!: boolean;
  // 是否有默认 footer
  @Prop({type: Boolean, default: true}) private hasFooter!: boolean;
  // 不显示弹窗的 x 按钮
  @Prop({type: Boolean, default: true}) private hasCloseXButton!: boolean;
  // 按Esc 关闭弹框
  @Prop({type: Boolean, default: false}) private closeOnPressEscape!: boolean;
  // header\ footer 下方是否有分隔线 (默认是占满全 dialog 的 border-bottom)
  @Prop({type: Boolean, default: false}) private hasCutOffLine!: boolean;
  // 弹窗标题
  @Prop({type: String, default: '父组件存在 slot="header"， 则此处被替换'}) private title!: string;
  // 弹框打开关闭
  @Prop({type: Boolean, default: false}) private show!: boolean;
  // 弹框 body 加载中
  @Prop({type: Boolean, default: false}) private loading!: boolean;

  // 弹窗是否有 modal
  @Prop({type: Boolean, default: true}) private hasModal!: boolean;
  // 遮罩层是否插入至 body 元素上
  @Prop({type: Boolean, default: true}) private modalAppendToBody!: boolean;
  // 点击遮罩关闭弹框
  @Prop({type: Boolean, default: false}) private closeOnClickModal!: boolean;
  // 弹框dialog 自身是否插入至 body 元素上
  @Prop({type: Boolean, default: false}) private isAppendToBody!: boolean;
  // 是否全屏
  @Prop({type: Boolean, default: false}) private isFullscreen!: boolean;
  // 在 Dialog 出现时将 body 滚动锁定
  @Prop({type: Boolean, default: true}) private lockScroll!: boolean;
  // 弹框距顶部的位置
  @Prop({type: String, default: '110px'}) private top!: string;
  // 弹窗的 right
  @Prop({type: String, default: 'auto'}) private right!: string;
  // 弹窗尺寸 small: 300 / middle: 600 / normal: 800 / big_normal: 1000 / big: 1200
  @Prop({type: String, default: 'middle'}) private size!: string;
  // 由内容撑开弹窗宽度
  @Prop({type: Boolean, default: false}) private autoWidth!: boolean;
  // footer 的尺寸 small: 60 / middle&big: 90
  @Prop({type: String, default: 'middle'}) private footerSize!: string;
  // 弹框body最小高度
  @Prop({type: Number, default: 120}) private bodyMinHeight!: number;
  // 弹框body最高高度
  @Prop({type: Number, default: 1000}) private bodyMaxHeight!: number;



  // 向外暴露的事件
  @Emit('open') private open_event() {}
  @Emit('close') private close_event() {}
  @Emit('cancel') private cancel_event() {}
  @Emit('submit') private submit_event() {}

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */


  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private disabled_submit_button = false;
  // Dialog 的自定义类名- 基础类名
  private get dialog_classname() {
    return this.autoWidth
      ? `${this.loading ? 'dialog_loading' : ''}`
      : `
          module_base_dialog module_base_dialog_${this.size}
          ${ this.hasCloseXButton ? '' : 'hide_close_button'}
          ${ this.loading ? 'dialog_loading' : '' }
        `;
  }

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  /*
   * 打开弹框
   */
  private open() {
    this.open_event();
  }
  /*
   * 关闭弹框
   */
 private async close(done: any) {
    // const status = await confirm_message('是否确定关闭？');
    // if (status) {
    //   this.close_event();
    // }
    this.close_event();
  }
  /*
   * 关闭弹框
   */
  private cancel() {
    if (this.loading) { return; }
    this.cancel_event();
  }
  /*
   * 弹框确定
   */
 private submit() {
    this.submit_event();
  }

  /*
  * 更新弹窗样式
  */
  private set_dialog_right_style() {
    const $dialog = this.$el.querySelector('.module_base_dialog');
    if ($dialog) {
      ($dialog as HTMLElement).style.marginRight = this.right;
    }
  }

  @Watch('show') private show_changed(val: boolean) {
    if (val) {
      this.set_dialog_right_style();
    }
  }
}

</script>

<template>
<el-dialog ref="dialog" :visible.sync="show" :custom-class="dialog_classname" :fullscreen="isFullscreen" :top="top"
  :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape"
  :modal-append-to-body="modalAppendToBody" :modal="hasModal"
  :append-to-body="isAppendToBody" :lock-scroll="lockScroll"
  @open="open" :before-close="close">

  <!-- header -->
  <template v-if="hasHeader">
    <div slot="title" :class="['dialog_header', {['cut_off_line_' + size]: hasCutOffLine}, {dialog_loading: loading}]">
      <slot name="header">
        <h4 slot="title" class="header_title">{{ title }}</h4>
      </slot>
    </div>
  </template>

  <!-- body -->
  <!-- {, maxHeight: bodyMaxHeight + 'px', overflowY: 'scroll'}" -->
  <div class="dialog_body" :style="{minHeight: bodyMinHeight + 'px'}" v-loading="loading">
    <slot></slot>
  </div>

  <!-- footer -->
  <template v-if="hasFooter">
    <div slot="footer"> <!-- 替换原el-dialog中的footer -->
      <slot name="footer"> <!-- 由父组件中的slot="footer" 替换 -->
        <div slot="footer" :class="['dialog_footer', 'dialog_footer_' + footerSize, {['cut_off_line_'+ size]: hasCutOffLine}]">
          <el-button @click="cancel" class="my_btn_32 btn_cancel">取消</el-button>
          <el-button @click="submit" class="my_btn_32 btn_sure">确定</el-button>
        </div>
      </slot>
    </div>
  </template>
</el-dialog>
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl'

$_header_height        = 60px

$_footer_middle_height = 90px
$_footer_small_height  = 60px

$_dialog_small_width      = 300px
$_dialog_middle_width     = 600px
$_dialog_normal_width     = 800px
$_dialog_big_normal_width = 1000px
$_dialog_big_width        = 1200px


$_padding_left_and_right = 25px

// dialog width
.module_base_dialog_small
  width $_dialog_small_width
.module_base_dialog_middle
  width $_dialog_middle_width
.module_base_dialog_normal
  width $_dialog_normal_width
.module_base_dialog_big_normal
  width $_dialog_big_normal_width
.module_base_dialog_big
  width $_dialog_big_width

//--------------- stylus function
// footer style
_footer_style($height, $btn_w, $btn_h)
  height $height
  line-height $height
  border-top 1px solid $border_color
  text-align center
  .footer_button
    width $btn_w
    height $btn_h
    line-height 0
    &.grey_button
      background #f5f5f5
  .footer_button + .footer_button
    margin-left 30px
  &.cut_off_line_small
    _footer_cut_off_line_style($_dialog_small_width)
  &.cut_off_line_middle
    _footer_cut_off_line_style($_dialog_middle_width)
  &.cut_off_line_normal
    _footer_cut_off_line_style($_dialog_normal_width)
  &.cut_off_line_big_normal
    _footer_cut_off_line_style($_dialog_big_normal_width)
  &.cut_off_line_big
    _footer_cut_off_line_style($_dialog_big_width)


// 
_header_cut_off_line_style($size)
  position relative
  border-bottom none
  &::after
    position absolute
    display block
    content ''
    left $_padding_left_and_right
    bottom 0
    width $size - ($_padding_left_and_right * 2)
    height 1px
    background-color $border_color

_footer_cut_off_line_style($size)
  position relative
  border-top none
  &::after
    position absolute
    content ''
    display block
    left $_padding_left_and_right
    top 0
    width $size - ($_padding_left_and_right * 2)
    height 1px
    background-color $border_color


.module_base_dialog
  &.hide_close_button
    .el-dialog__headerbtn
      display none
  &.dialog_loading
    .el-dialog__headerbtn
      .el-icon-close:before
        color $border_color
        cursor not-allowed
  // header
  .dialog_header
    height $_header_height
    line-height $_header_height
    border-bottom 1px solid $border_color
    padding-left $_padding_left_and_right
    letter-spacing 1px
    background $dialog_header_bg
    &.cut_off_line_small
      _header_cut_off_line_style($_dialog_small_width)
    &.cut_off_line_middle
      _header_cut_off_line_style($_dialog_middle_width)
    &.cut_off_line_normal
      _header_cut_off_line_style($_dialog_normal_width)
    &.cut_off_line_big_normal
      _header_cut_off_line_style($_dialog_big_normal_width)
    &.cut_off_line_big
      _header_cut_off_line_style($_dialog_big_width)
  .header_title
    font-size $small_title_size
    font-weight bolder
    color $dialog_header_text
    text-align left
  .dialog_header~.el-dialog__headerbtn
    top $_padding_left_and_right
    right $_padding_left-and_right
  // footer
  .dialog_footer
    .my_btn_32
      padding 0 20px
  .dialog_footer_middle,
  .dialog_footer_big
    _footer_style($_footer_middle_height, 96px, 36px)
  .dialog_footer_small
    _footer_style($_footer_small_height, 74px, 28px)
  // body
  .el-dialog__body
    padding 0
    width 100%




</style>
