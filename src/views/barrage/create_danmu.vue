<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/16
 * desc: 创建新弹幕，使用websocket发送
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import SetGlobalStyle from './set_global_style.vue';

@Component({
  name: 'create-danmu',
  components: {
    SetGlobalStyle,
  },
})
export default class CreateDanmuku extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  @Emit('send-danmu') private send_event(danmu: LIVESPACE.CmtDanmuType[]) { }
  @Emit('start') private start_event() { this.show_danmu = true; }
  @Emit('close') private close_event() {}
  @Emit('stop') private stop_event() {  this.show_danmu = false; }
  @Emit('clear') private clear_event() {}

  @Emit('global-set-change') private global_set_change(val: LIVESPACE.CmtGlobalStylsSetType) {}
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
  private show_danmu: boolean = false;

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
  @Watch('show_danmu') private show_danmu_change(val: boolean) {
    val ? this.start_event() : this.close_event();
  }
  @Watch('global_set_value', {deep: true}) private cmt_global_set_change(val: LIVESPACE.CmtGlobalStylsSetType) {
    this.global_set_change(val);
  }
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
    this.show_danmu = true;
    console.log('连接已通');
  }
  /**
   * 结束websocket
   */
  private ws_onclose(e: any) {
    this.show_danmu = false;
    this.$message({ type: 'error', message: 'WebSocket连接异常'});
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
    this.newDanmu = '';
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
    this.send_event(sv); // 传递至（.module_comment_danmu）区域展示
  }
  /**
   * 调用websocket向服务端 发送 最新输入弹幕
   */
  private send() {
    if (this.myWs.readyState === 1) {
      this.ws_onsend();
    }
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
      <el-col :span="3"><button class="common_btn" @click="send">发送</button></el-col>
    </el-row> -->
    <div class="opration">
      <div class="opration_item occupied"></div>
      <!-- <div class="opration_item danmu_act">
        <button class="common_btn" @click="close_event">关闭</button>
        <button class="common_btn" @click="start_event">启动</button>
        <button class="common_btn" @click="stop_event">暂停</button>
        <button class="common_btn" @click="clear_event">清空</button>
      </div> -->
      <div class="opration_item is_showdanmu">
        <el-tooltip :content="'Switch value: ' + show_danmu" placement="top">
          <el-switch v-model="show_danmu" active-color="#2196f3" inactive-color="#ccc" />
        </el-tooltip>
      </div>
      <div class="opration_item item_set">
        <!--  title="全局弹幕展示设置" @click="setting_global_style_open" :show="set_global_style_show" -->
        <set-global-style v-model="global_set_value" @global-set-change="cmt_global_set_change"></set-global-style>
      </div>
      <div class="opration_item item_input" :class="{disabled: !show_danmu}">
        <input placeholder="发个友善弹幕见证当下" prefix-icon="el-icon-edit" v-model="newDanmu" />
        <button class="common_btn" @click="send">发送</button>
      </div>
      
    </div>

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
    .danmu_act
      flex 0 0 218px
    .is_showdanmu
      flex 0 0 44px
    .item_set
      flex 0 0 38px
      padding-left 5px
      text-align left
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
    .disabled
      position relative
      &:after
        position absolute
        display inline-block
        top 0
        left 0
        content ''
        width 100%
        min-width 230px
        height 24px
        z-index 9
        background rgba(0, 0, 0, 0.2)


</style>
