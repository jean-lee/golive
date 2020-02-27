<script lang='ts'>
/* COMPONENT DOCUMENT
 * author: ljx
 * date: 2020/02/26
 * desc: 弹幕库https://github.com/jabbany/CommentCoreLibrary/blob/master/docs/Tutorial.zh_CN.md
 * 为直播添加弹幕发送输出功能
 */

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

// import CommentManager from 'comment-core-library';

@Component({
  name: 'comment-danmu',
})
export default class CommentDanmu extends Vue {
  /* ------------------------ INPUT & OUTPUT ------------------------ */

  /* ------------------------ VUEX (vuex getter & vuex action) ------------------------ */

  /* ------------------------ LIFECYCLE HOOKS (created & mounted & ...) ------------------------ */
  private mounted() {
    // my_comment_stage元素挂载后，初始化CM，绑定CommentManager
    this.ccl_init();
  }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private CM: any;
  private cmtArr: LIVESPACE.CmtDanmuType[] = [
    {mode: 1, text: 'hello world',  size: '25', color: 0x0056dd, backgroundColor: '#424448', border: true },
    {mode: 1, text: 'hello jean', size: '35', color: 0x0ff6dd, backgroundColor: '#fff', border: true},
    {mode: 1, text: 'who are you', size: '14', color: 0x00ffdd, backgroundColor: '#400', border: true},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: 0x0056ff, bgColor: '#424448', border: true},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: 0xff56dd, bgColor: '#424448'},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: 0xff56dd, bgColor: '#424448'},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: 0xff56dd, bgColor: '#fff'},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: 0xff56dd, bgColor: '#fff'},
  ];
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private ccl_init() {
    if ( ! (window as any) || ! (window as any).CommentManager || ! document.getElementById('my_comment_stage') ) {
      return false;
    }

    this.CM = new (window as any).CommentManager(document.getElementById('my_comment_stage'));
    this.CM.init();
    // CM.load(this.danmukuList);

     // 弹幕有时间轴位置，那就插入时间轴
    // 弹幕插入时间轴,插入这个弹幕，因为时间 < CM内现在播放时间，所以一定不会被显示
    // const needInsertDanmu = {
    //   mode: 1,
    //   text: 'hello world',
    //   stime: video.currentTime * 1000 - 1, // 比现在时间稍微慢一ms,
    //   size: '25',
    //   color: '#0056dd'，
    // };
    // CM.insert(needInsertDanmu);

    // 启动播放弹幕（在未启动状态下弹幕不会移动）
    this.CM.start();

    this.cmtController();
    // this.danmukuList.map((item: any) => {
    //   CM.send(item);
    // });

    // 停止播放（停止弹幕移动）
    // CM.stop();
    // 强行更新以下 CM 的时间戳。设置了CommentManager的播放时间，单位是毫秒(0.001s)
    // CM.time(500);
    // CM.time(1314);
  }
  /**
   * 获取弹幕数据
   */
  private getCmtDataList() {
    // axios.request 获取


    // 发送弹幕
    this.sendCmtData(this.cmtArr);
  }
  /**
   * 弹幕发送时长速度计算
   */
  private sendCmtData(cmtArr: LIVESPACE.CmtDanmuType[]) {
    for (const item of cmtArr) {
       item.dur = Math.floor(Math.random() * 4000 + 4000);
      // 把一条 弹幕显示到屏幕上, 它不会把弹幕发送到服务器，也不会把弹幕插入时间轴
       this.CM.send(item);
    }
  }
  /**
   * 弹幕发送
   */
  private cmtController() {
    // 定时循环发送
    setInterval(() => {
      this.getCmtDataList();
    }, 3000);
  }
}

</script>

<template>
  <div id="my_comment_stage" class="container"></div>
</template>

<style lang="stylus" scoped>

// .module_comment_danmu
// .container
//   position relative
//   width 100%
//   height 500px

</style>
