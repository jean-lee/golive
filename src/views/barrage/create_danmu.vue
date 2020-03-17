<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/16
 * desc: 创建新弹幕，使用websocket发送
 */

import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

import SetGlobalStyle from './set_global_style.vue';

@Component({
  name: 'create-danmu',
  components: {
    SetGlobalStyle,
  },
})
export default class CreateDanmuku extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  // @Prop({ type: Boolean, default: true}) private isShowDanmu!: boolean;

  @Emit('send-danmu') private senddanmu_event(danmu: LIVESPACE.CmtDanmuType[]) { }
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    // 初始化websocket连接
    this.initWebsocket();
  }
  private beforeDestroy() {
    this.myWs.close();
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */

  private myWs: any = null;
  private serviceUrl: string = 'ws://123.207.136.134:9010/ajaxchattest'; // 开源websocket在线测试服务端
  // private serviceUrl: string = 'ws://127.0.0.1:8080/ws';
  private newDanmu: string = '';

  // 弹幕样式设置
  private set_global_style_show: boolean = false;
  private isShowDanmu: boolean = true;
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
   * 初始化websocket
   */
  private initWebsocket() {
    if ( ! (window as any) || ! (window as any).CommentManager || ! document.getElementById('my_comment_stage') ) {
      return false;
    }
    // params1: 需要连接的地址
    // params2: 可选参数（字符串或数组），用来表示自协议
    this.myWs = new WebSocket(this.serviceUrl);

    // 引入websocket
    this.myWs.onopen = this.ws_onopen;
    this.myWs.onerror = this.ws_onerror;
    this.myWs.onclose = this.ws_onclose;
    this.myWs.onmessage = this.ws_onmessage;

  }
  /**
   * websocket 连接 OK
   */
  private ws_onopen() {
    console.log('连接已通');
  }
  /**
   * 结束websocket
   */
  private ws_onclose(e: any) {
    console.log('连接断开', e);
  }
  /**
   * websocket 连接 异常， 再次重连
   */
  private ws_onerror() {
    this.initWebsocket();
  }
  /**
   * 客户端 发送的 信息
   * sendval: 已经被序列化的数据sendval: any
   */
  private ws_onsend() {
    const str: LIVESPACE.CmtDanmuType = {mode: 1, text: this.newDanmu, stime: 0, size: '22', backgroundColor: '#f24448', border: false };

    console.log('发送弹幕');
    this.myWs.send(JSON.stringify(str));
  }
  /**
   * 接收到 来自服务端 的信息
   */
  private ws_onmessage(e: any) {
    const str = e.data;
    let sstr: string = '';

    // 所用websocket在线测试会在response message中附带网站地址[<a href="http://coolaf.com/tool/chattest">http://coolaf.com</a>]
    // 导致无法使用JSON.parse()解析出发送数据
    const _index = str.indexOf('[<a href=');
    if (_index > -1) {
      sstr = str.substring(0, _index);
    } else {
      sstr = e.data;
    }

    const sv: LIVESPACE.CmtDanmuType[] = [JSON.parse(sstr)];
    this.senddanmu_event(sv); // 传递至（.module_comment_danmu）区域展示
  }
  /**
   * 调用websocket向服务端 发送 最新输入弹幕
   */
  private sendDanmu() {
    if (this.myWs.readyState === 1) {
      this.ws_onsend();
    }
  }
  private setting_global_style_open() {
    this.set_global_style_show = true;
  }
  /**
   * 关闭设置
   */
  private set_global_style_close() {
    this.set_global_style_show = false;
  }
  /**
   * 格式化 透明度
   */
  private format_opcity(val: number) {
    return val + '%';
  }
}

</script>

<template>
  <!-- 弹幕输入、发送、配置区域 -->
  <div class="module_create_danmu">
    <!-- <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="3"><button class="common_btn" @click="setting_global_style_open"><i class="el-icon-setting"></i>设置</button></el-col>
      <el-col :span="10"><el-input placeholder="发个友善弹幕记录见证当下" prefix-icon="el-icon-edit" v-model="newDanmu"></el-input></el-col>
      <el-col :span="3"><button class="common_btn" @click="sendDanmu">发送</button></el-col>
    </el-row> -->
    <div class="opration">
      <div class="opration_item occupied"></div>
      <div class="opration_item is_showdanmu">
        <el-tooltip :content="'Switch value: ' + isShowDanmu" placement="top">
          <el-switch v-model="isShowDanmu" active-color="#2196f3" inactive-color="#ccc" active-value="true" inactive-value="false" />
        </el-tooltip>
      </div>
      <div class="opration_item item_set">
        <!--  title="全局弹幕展示设置" -->
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
      </div>
      <div class="opration_item item_input">
        <input placeholder="发个友善弹幕见证当下" prefix-icon="el-icon-edit" v-model="newDanmu" />
        <button class="common_btn" @click="sendDanmu">发送</button>
      </div>
      
    </div>

    <!-- <set-global-style :show="set_global_style_show" @close="set_global_style_close"></set-global-style> -->
  </div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl';

.module_create_danmu
  padding 10px
  // height 40px
  text-align right
  .opration
    display flex
    flex-wrap wrap
    align-content space-between
    .opration_item
      flex 1
      height 24px
      line-height 24px
      text-align center
    .occupied
      flex -1
    .is_showdanmu
      flex 0 0 44px
    .item_set
      flex 0 0 38px
      padding-left 5px
      text-align left
      .el-icon-setting
        line-height 24px
        font-size 18px
        color #ffffff
        cursor pointer
        text-align center
        &:hover
          color $active_color
    .item_input
      flex 0 0 45%
      input
        font-size 12px
        width calc(100% - 50px)
        min-width 180px
        height inherit
        text-indent 4px
        border none
        border-top-left-radius 4px
        border-bottom-left-radius 4px
      .common_btn
        margin-left 0
        height inherit
        padding 0 12px
        font-size 12px
        background $active_color
        border none
        border-top-left-radius 0
        border-bottom-left-radius 0


</style>
