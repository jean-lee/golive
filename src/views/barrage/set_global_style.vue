<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/16
 * desc: 弹幕样式 全局设置
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'set-global-style',
})
export default class SetGlobalStyle extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: Object, default() { return {
    shieldtype: '1',
    opacity: 50,
    shieldcomment: 1,
    area: 1,
    speed: 40,
    fontsize: 40,
    limit: 0,
  }; } }) private value!: LIVESPACE.CmtGlobalStylsSetType;


  @Emit('global-set-change') private global_set_change(val: LIVESPACE.CmtGlobalStylsSetType) {}
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private global_set_value: LIVESPACE.CmtGlobalStylsSetType = this.value;

  private set_global_style_show: boolean = false;
  // 当 `mode >= 7`时，弹幕为高级弹幕，text部分为JSON对象。根对象是一个数组，属性按照出没顺序
  private shield_type_opstions = [
    { mode: '1,2', name: '滚动', icon: 'el-icon-picture' },
    { mode: '5', name: '顶部', icon: 'el-icon-picture' },
    { mode: '4', name: '底部', icon: 'el-icon-picture' },
    // { mode: '4', name: '彩色', icon: 'el-icon-picture' },
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
  // 依据B站40%对应字号10px, 上限160%对应40px
  // 此处展示的字号 = 25*X% ： 25 * (X% / 100)
  // 12非常小,16特小,18小,25中,36大,45很大,64特别大
  private font_size_marks = { 40: '小', 160: '大' };

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  /**
   * 按滚动类型屏蔽
   */
  private type_select(val: string) {
    this.global_set_value.shieldtype = val;
  }
  /**
   * 关闭设置
   */
  // private set_global_style_close() {
  //   this.show = false;
  // }
  /**
   * 格式化 透明度
   */
  private format_number(val: number) {
    return val + '%';
  }

}

</script>

<template>
<div class="setting_style">
  <el-popover popper-class="danmu_style_seting_popover" :tabindex="-1" placement="top" width="300" trigger="hover" v-model="set_global_style_show">
   <!-- trigger="manual" -->
    <div class="seting_popover">
      <div class="shield_by_type">
        <p class="title">按类型屏蔽</p>
        <ul>
          <li :class="{'active': global_set_value.shieldtype === item.mode}" v-for="(item, index) in shield_type_opstions" :key="index"
            @click.stop="type_select(item.mode)">
            <p><i :class="item.icon"></i></p><p class="desc">{{item.name}}</p></li>
        </ul>
      </div>
      <div class="shield_by_comment">
        <p class="title">防挡字幕</p>
        <ul>
          <li @click.stop="() => { global_set_value.shieldcomment = 1}">添加屏蔽词</li>
          <li @click.stop="() => { global_set_value.shieldcomment = 2}">同步屏蔽列表</li>
        </ul>
      </div>
      <div class="set_item set_opacity">
        <span class="title">不透明度</span>
        <el-slider v-model="global_set_value.opacity" :format-tooltip="format_number"></el-slider>
      </div>
      <div class="set_item set_display_wrap">
        <span class="title">显示区域</span>
        <el-slider v-model="global_set_value.area" :marks="display_wrap_marks" show-stops :step="25" :show-tooltip="false"></el-slider>
      </div>
      <div class="set_item set_danmu_speed">
        <span class="title">弹幕速度</span>
        <el-slider v-model="global_set_value.speed" :marks="speed_val_marks" :min="40" :max="160" :format-tooltip="format_number"></el-slider>
      </div>
      <div class="set_item set_font_size">
        <span class="title">字体大小</span>
        <el-slider v-model="global_set_value.fontsize" :marks="font_size_marks" :min="40" :max="160" :format-tooltip="format_number"></el-slider>
      </div>
      <div class="set_item set_more">
        <span class="title">更多弹幕设置</span>
      </div>
    </div>
    <div class="seticon" slot="reference" @click="set_global_style_show = !set_global_style_show"><i class="el-icon-set-up"></i></div>
  </el-popover>
</div>
</template>

<style lang="stylus" scoped>

.setting_style
  .seticon
    font-size 18px
    color #ffffff
    cursor pointer
    text-align center
    &:hover
      color $active_color

</style>
