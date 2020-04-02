<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/16
 * desc: 创建新弹幕，使用websocket发送
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'create-danmu',
})
export default class CreateDanmuku extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Emit('send-danmu') private send_event(danmu: LIVESPACE.CmtDanmuType[]) { }
  @Emit('start') private start_event() {}
  @Emit('close') private close_event() {}
  @Emit('stop') private stop_event() {}
  @Emit('clear') private clear_event() {}

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    // 初始化websocket连接
    this.initWebsocket();
  }
  private beforeDestroy() {
    if (this.myWs) {
      this.myWs.close();
    }
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */

  private myWs: any = null;
  private serviceUrl: string = 'ws://123.207.136.134:9010/ajaxchattest'; // 开源websocket在线测试服务端
  // private serviceUrl: string = 'ws://127.0.0.1:8080/ws';
  private newDanmu: string = '';

  // switch 是否展示弹幕，并且可新建弹幕
  private show_danmu: boolean = true;

  /* ------------------------ WATCH ------------------------ */
  @Watch('show_danmu') private show_danmu_change(val: boolean) {
    val ? this.start_event() : this.close_event();
  }

  /* ------------------------ METHODS ------------------------ */
  /**
   * 初始化websocket
   */
  private initWebsocket() {
    if ( ! (window as any) || ! (window as any).CommentManager || ! document.getElementById('my_danmu_stage') ) {
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
    console.log('WebSocket连接已通');
  }
  /**
   * 结束websocket
   */
  private ws_onclose(e: any) {
    this.show_danmu = false;
    console.error('WebSocket连接异常');
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
    this.send_event(sv); // 传递至（.module_danmu_stage）区域展示
  }
  /**
   * 调用websocket向服务端 发送 最新输入弹幕
   */
  private send() {
    if (this.myWs.readyState === 1) {
      this.ws_onsend();
    }
  }
  /**
   * 新增弹幕 设置
   */
  private new_set() {
    this.$message({ type: 'warning', message: '字号颜色等配置'});
  }
}

</script>

<template>
  <!-- 弹幕输入、发送、配置区域 -->
  <div class="module_danmu_create">
    <div class="opration">
      <!-- <div class="opration_item occupied"></div> -->
      <!-- <div class="opration_item danmu_act">
        <button class="common_btn" @click="close_event">关闭</button>
        <button class="common_btn" @click="start_event">启动</button>
        <button class="common_btn" @click="stop_event">暂停</button>
        <button class="common_btn" @click="clear_event">清空</button>
      </div> -->
      <div class="opration_item is_showdanmu">
        <el-switch v-model="show_danmu" active-color="#2196f3" inactive-color="#ccc" />
      </div>
      <div class="opration_item item_input" :class="{disabled: !show_danmu}">
        <el-input class="my_input_32" placeholder="发个友善弹幕见证当下" prefix-icon="" v-model="newDanmu" @keyup.enter.native="send">
          <i slot="prefix" class="el-icon-setting" @click.stop="new_set"></i>
          <el-button slot="append">发送</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/var.styl';

.module_danmu_create
  .opration
    width fit-content
    .opration_item
      display inline-block
      height 24px
      line-height 24px
      text-align center
    .danmu_act
      width 218px
    .is_showdanmu
      width 50px
      .el-switch
        margin-right 18px
    .item_input
      min-width 245px
      max-width 400px
      .el-icon-setting
        cursor pointer
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
