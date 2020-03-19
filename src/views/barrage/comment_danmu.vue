<script lang='ts'>
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/26
 * desc: 弹幕库https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/Tutorial.zh_CN.md
 * 为直播添加弹幕发送输出功能
 */

import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'comment-danmu',
})
export default class CommentDanmu extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private created() {

  }
  private mounted() {
    // my_comment_stage元素挂载后，初始化CM，绑定CommentManager
    this.ccl_init();
  }

  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private CM: any = null;
  private cmtArr: LIVESPACE.CmtDanmuType[] = [
    {mode: 1, text: '1 - hello world', stime: 0,  size: '12', backgroundColor: '#424448', border: false },
    {mode: 1, text: '2 - hello jean', stime: 1500, size: '16', backgroundColor: '#fff', border: true},
    {mode: 1, text: '3 - who are you', stime: 3000, size: '18', backgroundColor: '#400', border: false},
    {mode: 1, text: '4 - who are you', stime: 6000, size: '25', bgColor: '#424448', border: true},
    {mode: 1, text: '5 - who are you', stime: 12000, size: '18', bgColor: '#fff', border: false},
  ];

  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private ccl_init() {
    if ( ! (window as any) || ! (window as any).CommentManager || ! document.getElementById('my_comment_stage') ) {
      return false;
    }

    this.CM = new (window as any).CommentManager(document.getElementById('my_comment_stage'));

    this.CM.init();
    // this.CM.load(this.cmtArr);

    // 强行更新以下 CM 的时间戳。设置了CommentManager的播放时间，单位是毫秒(0.001s)
    // CM.time(500);
    // CM.time(1314);
  }
  /**
   * 插入 弹幕
   */
  // private insert() {
  //   // 弹幕有时间轴位置，那就插入时间轴
  //   // 弹幕插入时间轴,插入这个弹幕，因为时间 < CM内现在播放时间，所以一定不会被显示
  //   const needInsertDanmu = {
  //     mode: 1,
  //     text: 'hello world',
  //     stime: 0, // 比现在时间稍微慢一ms,
  //     size: '25',
  //     color: '#0056dd',
  //   };
  //   this.CM.insert(needInsertDanmu);
  // }
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
    // a: this.CM.options.gloabal.scale // 单个弹幕对象全局生存时间加成
    // b: this.CM.options.scroll.scale // 单个弹幕对象滚动弹幕生存时间加成
    // 固定弹幕（顶部、底部）生存时间为4*a; 滚动弹幕（滚动、底部滚动、顶部滚动）总生存时间是4*a*b
    // 弹幕默认生存时间是4s。加成数值越大，弹幕运行速度越低
    // 相同加成下不同长度的弹幕， 速度是不一样的。 弹幕大了，速度就慢了

    this.CM.options.global.className = 'cmt self_customization';
    // // this.CM.options.global.shieldtype = val.shieldtype;
    this.CM.options.global.opacity = val.opacity / 100;




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
