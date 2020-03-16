<script lang="ts">
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/03/16
 * desc: 创建新弹幕，使用websocket发送
 */

import { Component, Vue, Emit } from 'vue-property-decorator';

@Component({
  name: 'create-danmu',
})
export default class CreateDanmuku extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
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
}

</script>

<template>
  <!-- 弹幕输入、发送、配置区域 -->
  <div class="module_create_danmu">
    <input type="text" v-model="newDanmu"/>
    <button class="common_btn" @click="sendDanmu">发送</button>
  </div>
</template>

<style lang="stylus" scoped>

.module_create_danmu
  pass

</style>
