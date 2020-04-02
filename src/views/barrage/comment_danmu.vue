<script lang='ts'>
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/26
 * desc: 弹幕库https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/Tutorial.zh_CN.md
 * 为直播添加弹幕发送输出功能
 */

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'comment-danmu',
})
export default class CommentDanmu extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */
  @Prop({ type: Number, default: 0}) private playerCurrentTime!: number;
  @Prop({ type: String, default: 'danmu_interaction' }) private dynamicClass!: string; // 弹幕舞台类名
  @Prop({ type: Object, default() { return {
    shieldtype: '1',
    opacity: 50,
    shieldcomment: 1,
    area: 1,
    speed: 40,
    fontsize: 40,
    limit: 0,
  }; } }) private GlobalSetVal!: LIVESPACE.CmtGlobalStylsSetType;
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    // my_danmu_stage元素挂载后，初始化CM，绑定CommentManager
    this.ccl_init();
  }

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private CM: any = null;
  private cmtArr: LIVESPACE.CmtDanmuType[] = [
    {mode: 1, text: '1上上上上上端 - who are you', stime: 0.001, size: '25', bgColor: '#424448', border: true},
    {mode: 2, text: '2下下下下下端 111111- hello world', stime: 1,  size: '12', backgroundColor: '#424448', border: false },
    {mode: 4, text: '4底底底底底部 - hello jean', stime: 15, size: '16', backgroundColor: '#fff', border: true},
    {mode: 5, text: '5顶顶顶顶顶部 - who are you', stime: 8, size: '18', bgColor: '#fff', border: false},
    {mode: 6, text: '6逆逆逆逆逆逆向 - who are you', stime: 5, size: '18', backgroundColor: '#400', border: false},
    {mode: 6, text: '6逆逆逆逆逆逆向 - who are you', stime: 17, size: '18', backgroundColor: '#400', border: false},
    {mode: 7, text: '7定定定定位 - who are you', stime: 17, size: '18', backgroundColor: '#400', border: false},
    {mode: 17, text: '17图图图图图片弹幕 - who are you', stime: 9, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '23 - who are you', stime: 23, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '3 - who are you', stime: 16.66, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '19 - who are you', stime: 19, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '13 - who are you', stime: 13, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '20 - who are you', stime: 20, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '23 - who are you', stime: 23, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '6 - who are you', stime: 6, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '13 - who are you', stime: 13, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '23 - who are you', stime: 23, size: '18', backgroundColor: '#400', border: false},
  ];

  /* ------------------------ WATCH ------------------------ */
  @Watch('playerCurrentTime') private playerCurrentTimeChange(val: number, oldVal: number) {
    // console.log('val---' + val + '---oldVal--' + oldVal + '---run--' + this.CM.isRunning);
    if (val !== oldVal) {
      this.CM.time(val);
    }
  }
  @Watch('GlobalSetVal', {deep: true}) private GlobalSetValChange(val: LIVESPACE.CmtGlobalStylsSetType) {
    this.set_global_style(val);
  }
  // @Watch('CM') private CMChange(val: any) {
  //   if (val === null) { return false; }

  //   console.log(this.CM);
  //   console.log(this.CM.runline);
  //   console.log(this.CM.timeline);
  //   console.log(this.CM.filter);
  // }
  /* ------------------------ METHODS ------------------------ */
  private ccl_init() {
    if ( ! (window as any) || ! (window as any).CommentManager || ! document.getElementById('my_danmu_stage') ) {
      return false;
    }

    this.CM = new (window as any).CommentManager(document.getElementById('my_danmu_stage'));
    (window as any).CM = this.CM;
    this.CM.init();

    // 将清空之前的时间轴，载入cmtArr抽象弹幕对象作为时间轴timeline, 并根据stime从小到大的顺序排序
    this.CM.load(this.cmtArr);
  }
  /**
   * 插入 弹幕
   */
  public insert(comment: LIVESPACE.CmtDanmuType) {
    this.CM.time(this.playerCurrentTime * 1000); // 强行更新 CM时间戳
    comment.stime = this.playerCurrentTime * 1000 - 1; // 插入这个弹幕，因为时间 < CM内现在播放时间，所以一定不会被显示
    this.CM.insert(comment); // 插入弹幕
    // sendCommentToServer(comment); // 把弹幕发到服务器上，注意服务器要无视 border=true 的

    this.CM.send(comment); // 立刻显示一次自己这条弹幕，保证用户肯定会看到
  }

  /**
   * 销毁
   */
  public close() {
    console.log('停止弹幕展示，并清空');
    // 停止播放（停止弹幕移动）
    // this.CM.finish();
    this.stop();
    this.clear();
  }
  /**
   * 播放
   */
  public start() {
    console.log('开启 弹幕');
    this.CM.start();

  }
  /**
   * 弹幕 暂停移动
   */
  public stop() {
    console.log('暂停 弹幕');
    // 弹幕停止移动
    this.CM.stop();
  }
  /**
   * 清空 舞台
   */
  public clear() {
    // 清除正在运行的管理器管辖内的所有弹幕（runline里的）。不清除 timeline。
    console.log('清空 弹幕');
    this.CM.clear();
  }
  /**
   * 获取弹幕数据
   */
  private getCmtDataList() {
    // axios.request 获取

    // 发送弹幕
    this.sendCmtData();
  }
  /**
   * 弹幕发送
   */
  public sendCmtData(cmtArr?: LIVESPACE.CmtDanmuType[]) {
    const showCmt = cmtArr || this.cmtArr;
    console.log('发送弹幕');
    // this.CM.send(showCmt);
    // for (const item of showCmt) {
    //   //  item.dur = Math.floor(Math.random() * 40000 + 4000);
    //   //  item.color = '#fff';
    //   //  item.backgroundColor = 'rgba(ff, 00, dd, .5)';
    //   //  item.backgroundColor = '#fee';
    //   // 把一条 弹幕显示到屏幕上, 它不会把弹幕发送到服务器，也不会把弹幕插入时间轴
    //    this.CM.send(item);
    //   //  this.CM.stop();
    // }
  }
  /**
   * 弹幕全局样式设置
   */
  public set_global_style(val: LIVESPACE.CmtGlobalStylsSetType) {
    // -------------------- 透明度 --------------------
    this.CM.options.global.className = 'cmt self_customization';
    // // this.CM.options.global.shieldtype = val.shieldtype;
    const _opacity = Number((1 - val.opacity / 100).toFixed(2));
    this.CM.options.global.opacity = _opacity; // 全局透明度上限
    this.CM.options.scroll.opacity = _opacity; // 滚动弹幕透明度上限

    // -------------------- 显示区域 --------------------

    // -------------------- 速度 ------------------------
    // a: this.CM.options.gloabal.scale // 单个弹幕对象 全局生存时间加成
    // b: this.CM.options.scroll.scale // 单个弹幕对象 滚动弹幕生存时间加成
    // 固定弹幕（顶部、底部）生存时间为4*a秒; 滚动弹幕（滚动、底部滚动、顶部滚动）总生存时间是4*a*b秒
    // 弹幕默认生存时间是4秒。       加成数值越大，弹幕运行速度越低
    // 注意：改变全局加成会改变包括高级弹幕在内的所有弹幕的生存时间。***不要***更改弹幕速度的加成数值
    // 相同加成下不同长度的弹幕， 速度是不一样的。 弹幕大了，速度就慢了
    // 4000 * (val.speed * 0.01);
    // this.CM.options.global.scale = 40 * val.speed;
    // this.CM.options.scroll.scale = 40 * val.speed;

    // -------------------- 字体大小 ---------------------
    // this.CM.options.global.shieldcomment = val.shieldcomment;
    // this.CM.options.global.area = val.area;
    // this.CM.options.global.fontsize = val.fontsize;
  }
  // private dynamicDanmu() {
  //   const provider = new CommentProvider();

  //   // 绑定动态源，动态源可以是两种：LongPoll 或者 EventDispatcher
  //   provider.addDynamicSource(source, CommentProvider.SOURCE_JSON);
  //   // 会使用 parseOne 来逐个解析动态弹幕
  //   provider.addParser(new SomeFormat.JSONParser(), CommentProvider.SOURCE_JSON);

  //   provider.addTarget(this.CM);
  // }
}

</script>

<template>
  <div id="my_danmu_stage" ref="myDanmuStage" :class="['container module_danmu_stage', dynamicClass]"></div>
</template>
