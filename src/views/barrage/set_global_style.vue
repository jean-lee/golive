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

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private set_global_style_show: boolean = false;
  private opcity_val: number = 2;
  private display_wrap_val: number = 100;
  private display_wrap_marks = {
          0: '1/4屏',
          25: '半屏',
          50: '3/4屏',
          75: '不重叠',
          100: '不限',
          // 50: {
          //   style: {
          //     color: '#1989FA'
          //   },
          //   label: this.$createElement('strong', '50%')
          // }
        };
  private speed_val: number = 40;
  private speed_val_marks = { 40: '慢', 160: '快' };
  private font_size_val: number = 40;
  private font_size_marks = { 40: '小', 160: '大' };
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */

  /**
   * 关闭设置
   */
  // private set_global_style_close() {
  //   this.show = false;
  // }
  /**
   * 格式化 透明度
   */
  private format_opcity(val: number) {
    return val + '%';
  }
}

</script>

<template>
 <el-popover popper-class="danmu_style_seting_popover" :tabindex="-1" placement="top" width="300" trigger="manual" v-model="set_global_style_show">
    <div class="seting_popover">
      <div class="shield_by_type">
        <p class="title">按类型屏蔽</p>
        <ul>
          <li><p><i class="el-icon-picture"></i></p><p class="desc">滚动</p></li>
          <li><p><i class="el-icon-picture"></i></p><p class="desc">顶部</p></li>
          <li><p><i class="el-icon-picture"></i></p><p class="desc">底部</p></li>
          <li><p><i class="el-icon-picture"></i></p><p class="desc">彩色</p></li>
          <li><p><i class="el-icon-picture"></i><p class="desc">高级</p></li>
        </ul>
      </div>
      <div class="shield_by_comment">
        <p class="title">防挡字幕</p>
        <ul>
          <li>添加屏蔽词</li>
          <li>同步屏蔽列表</li>
        </ul>
      </div>
      <div class="set_item set_opcity">
        <span class="title">不透明度</span>
        <el-slider v-model="opcity_val" :format-tooltip="format_opcity"></el-slider>
      </div>
      <div class="set_item set_display_wrap">
        <span class="title">显示区域</span>
        <el-slider v-model="display_wrap_val" :marks="display_wrap_marks" show-stops :step="25" :show-tooltip="false"></el-slider>
      </div>
      <div class="set_item set_danmu_speed">
        <span class="title">弹幕速度</span>
        <el-slider v-model="speed_val" :marks="speed_val_marks" :min="40" :max="160" :format-tooltip="format_opcity"></el-slider>
      </div>
      <div class="set_item set_font_size">
        <span class="title">字体大小</span>
        <el-slider v-model="font_size_val" :marks="font_size_marks" :min="40" :max="160" :format-tooltip="format_opcity"></el-slider>
      </div>
      <div class="set_item set_more">
        <span class="title">更多弹幕设置</span>
      </div>
    </div>
    <div slot="reference" @click="set_global_style_show = !set_global_style_show"><i class="el-icon-setting"></i></div>
  </el-popover>
</template>

<style lang="stylus" scoped>

.el-icon-setting
  line-height 24px
  font-size 18px
  color #ffffff
  cursor pointer
  text-align center
  &:hover
    color $active_color

</style>
