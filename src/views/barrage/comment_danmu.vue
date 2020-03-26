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
  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    // my_comment_stage元素挂载后，初始化CM，绑定CommentManager
    this.ccl_init();
  }

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private CM: any = null;
  private cmtArr: LIVESPACE.CmtDanmuType[] = [
    {mode: 1, text: '4 - who are you', stime: 4, size: '25', bgColor: '#424448', border: true},
    {mode: 1, text: '1 111111- hello world', stime: 0,  size: '12', backgroundColor: '#424448', border: false },
    {mode: 1, text: '15 - hello jean', stime: 15, size: '16', backgroundColor: '#fff', border: true},
    {mode: 1, text: '5 - who are you', stime: 8, size: '18', bgColor: '#fff', border: false},
    {mode: 1, text: '23 - who are you', stime: 23, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '5 - who are you', stime: 5, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '6 - who are you', stime: 6, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '13 - who are you', stime: 13, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '17 - who are you', stime: 17, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '9 - who are you', stime: 9, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '23 - who are you', stime: 23, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '3 - who are you', stime: 3000, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '19 - who are you', stime: 19, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '13 - who are you', stime: 13, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '20 - who are you', stime: 20, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '23 - who are you', stime: 23, size: '18', backgroundColor: '#400', border: false},
  ];

  /* ------------------------ WATCH ------------------------ */
  @Watch('playerCurrentTime') private playerCurrentTimeChange(val: number, oldVal: number) {
    if (val !== oldVal) {
      this.CM.time(val);
    }
  }
  /* ------------------------ METHODS ------------------------ */
  private ccl_init() {
    if ( ! (window as any) || ! (window as any).CommentManager || ! document.getElementById('my_comment_stage') ) {
      return false;
    }

    this.CM = new (window as any).CommentManager(document.getElementById('my_comment_stage'));
    (window as any).CM = this.CM;
    this.CM.init();
    this.CM.start();

    // 将清空之前的时间轴，载入cmtArr抽象弹幕对象作为时间轴timeline, 并根据stime从小到大的顺序排序
    this.CM.load(this.cmtArr);
    // this.CM.insert();
    this.CM.time(0);

    // 通报目前的时间轴时间。管理器会自动处理时间前进和后退的情况，包括在需要时清除屏幕上正再运行的弹幕。
    // 这里的`currentTime`是绝对时间，对应弹幕的 `stime`。时间单位是毫秒（ms）。`time`只会把相关的
    // 弹幕放到runline（运行列表）里。至于这些弹幕是否在移动，则要根据目前管理器的 `isRunning` 状态。
    // 强行更新以下 CM 的时间戳。设置了CommentManager的播放时间，单位是毫秒(0.001s)
    // CM.time(500);
    // CM.time(1314);
  }
  /**
   * 插入 弹幕
   */
  private insert() {

    // 弹幕有时间轴位置，那就插入时间轴
    // 弹幕插入时间轴,插入这个弹幕，因为时间 < CM内现在播放时间，所以一定不会被显示
    const needInsertDanmu: LIVESPACE.CmtDanmuType = {
      mode: 1,
      text: 'hello world',
      stime: 10000, // 比现在时间稍微慢一ms,
      size: '25',
      color: '#0056dd',
      backgroundColor: '#400',
      border: false,
    };

    this.CM.insert(needInsertDanmu);
    console.log('插入弹幕');
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
    // this.sendCmtData();
    // this.cmtController();
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
  private cmtController() {
    // 定时循环发送
    setInterval(() => {
      this.sendCmtData();
    }, 3000);
  }
  /**
   * 弹幕发送时长速度计算
   */
  public sendCmtData(cmtArr?: LIVESPACE.CmtDanmuType[]) {
    const showCmt = cmtArr || this.cmtArr;
    console.log('发送弹幕');
    this.CM.send(showCmt);
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
  public globalCmtStyleSet(val: LIVESPACE.CmtGlobalStylsSetType) {
    // -------------------- 透明度 --------------------
    this.CM.options.global.className = 'cmt self_customization';
    // // this.CM.options.global.shieldtype = val.shieldtype;
    this.CM.options.global.opacity = val.opacity / 100; // 全局透明度上限
    this.CM.options.scroll = val.opacity / 100; // 滚动弹幕透明度上限

    // -------------------- 速度 --------------------
    // a: this.CM.options.gloabal.scale // 单个弹幕对象全局生存时间加成
    // b: this.CM.options.scroll.scale // 单个弹幕对象滚动弹幕生存时间加成
    // 固定弹幕（顶部、底部）生存时间为4*a; 滚动弹幕（滚动、底部滚动、顶部滚动）总生存时间是4*a*b
    // 弹幕默认生存时间是4s。加成数值越大，弹幕运行速度越低
    // 相同加成下不同长度的弹幕， 速度是不一样的。 弹幕大了，速度就慢了
    // 4000 * (val.speed * 0.01);
    // switch(val.mode)
    this.CM.options.gloabal.scale = 40 * val.speed;
    this.CM.options.scroll.scale = 40 * val.speed;


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
  <div>
    <div id="my_comment_stage" class="container module_comment_danmu"></div>
  </div>
</template>

<style lang="stylus" scoped>

</style>
