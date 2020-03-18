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
  private checkedVal = {
    shieldtype: '1',
    opcity: 50,
    shieldcomment: 1,
    area: 1,
    speed: 40,
    fontsize: 40,
  };
  private set_global_style_show: boolean = false;
  private shield_type_opstions = [
    { mode: '1,2', name: '滚动', icon: 'el-icon-picture' },
    { mode: '5', name: '顶部', icon: 'el-icon-picture' },
    { mode: '4', name: '底部', icon: 'el-icon-picture' },
    { mode: '4', name: '彩色', icon: 'el-icon-picture' },
    { mode: '8', name: '高级', icon: 'el-icon-picture' },
  ];
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
  private speed_val_marks = { 40: '慢', 160: '快' };
  private font_size_marks = { 40: '小', 160: '大' };

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  /**
   * 按滚动类型屏蔽
   */
  private type_select(val: string) {
    this.checkedVal.shieldtype = val;
  }
  // private comment_select() {

  // }
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
          <li v-for="(item, index) in shield_type_opstions" :key="index"
            @click.stop="type_select(item.mode)">
            <p><i :class="item.icon"></i></p><p class="desc">{{item.name}}</p></li>
        </ul>
      </div>
      <div class="shield_by_comment">
        <p class="title">防挡字幕</p>
        <ul>
          <li @click.stop="() => { checkedVal.shieldcomment = 1}">添加屏蔽词</li>
          <li @click.stop="() => { checkedVal.shieldcomment = 2}">同步屏蔽列表</li>
        </ul>
      </div>
      <div class="set_item set_opcity">
        <span class="title">不透明度</span>
        <el-slider v-model="checkedVal.opcity" :format-tooltip="format_opcity"></el-slider>
      </div>
      <div class="set_item set_display_wrap">
        <span class="title">显示区域</span>
        <el-slider v-model="checkedVal.area" :marks="display_wrap_marks" show-stops :step="25" :show-tooltip="false"></el-slider>
      </div>
      <div class="set_item set_danmu_speed">
        <span class="title">弹幕速度</span>
        <el-slider v-model="checkedVal.speed" :marks="speed_val_marks" :min="40" :max="160" :format-tooltip="format_opcity"></el-slider>
      </div>
      <div class="set_item set_font_size">
        <span class="title">字体大小</span>
        <el-slider v-model="checkedVal.fontsize" :marks="font_size_marks" :min="40" :max="160" :format-tooltip="format_opcity"></el-slider>
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
