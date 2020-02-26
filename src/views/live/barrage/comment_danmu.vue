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
  // private created() {
  //   // 初始化CM，绑定CommentManager
  //   this.ccl_init();
  // }
  // private mounted() {
  //   // 初始化CM，绑定CommentManager
  //   this.ccl_init();
  // }
  /* ------------------------ COMPONENT STATE (data & computed & model) ------------------------ */
  private danmukuList = [
    {mode: 1, text: 'hello world', stime: 0, size: '25', color: '#0056dd'},
    {mode: 1, text: 'hello jean', stime: 10, size: '35', color: '#f00'},
    {mode: 1, text: 'who are you', stime: 30, size: '14', color: '#fff'},
    // {text: '大家期待什么新品啊', bgColor: '#424448', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '会有什么惊喜吗？', bgColor: '#424448', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '等待中。。', bgColor: '#23b28b', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '会有什么新产品呢？', bgColor: '#424448', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '定时执行', bgColor: '#23b28b', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '1123333446红咖喱的非农房价', bgColor: '#ec4262', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '测试接口发评论00', bgColor: '#ec4262', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '测试接口发评论00', bgColor: '#3dbbc0', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '啊啊啊啊啊啊啊哦哦哦诶IEIE恩家报表出具', bgColor: '#ec4262', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
    // {text: '的方式的方法反反复复反复反复', bgColor: '#23b28b', icon: 'http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg'},
  ];
  /* ------------------------ WATCH ------------------------ */

  /* ------------------------ METHODS ------------------------ */
  private ccl_init() {
    if ( ! (window as any) || ! (window as any).CommentManager ) {
      return false;
    }
    debugger
    const CM = new (window as any).CommentManager(document.getElementById('comment_danmu_canvas'));
    CM.init();
    CM.load(this.danmukuList);
    // const inserDanmu = {mode: 1, text: 'hello world', stime: 0, size: '25', color: '#0056dd'};
    // CM.insert(inserDanmu);

    CM.start();

    // setTimeout(() => {
    //   CM.stop();
    // }, 50000);

    // CM.time(500);
    // CM.time(1314);
  }

private getCmtDataList() {
    var cmtArr = [];
    // 测试数据
    cmtArr = [
        {"text":"大家期待什么新品啊", "bgColor":"#424448", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"会有什么惊喜吗？", "bgColor":"#424448", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"等待中。。", "bgColor":"#23b28b", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"会有什么新产品呢？", "bgColor":"#424448", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"定时执行", "bgColor":"#23b28b", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"1123333446红咖喱的非农房价", "bgColor":"#ec4262", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"测试接口发评论00", "bgColor":"#ec4262", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"测试接口发评论00", "bgColor":"#3dbbc0", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"啊啊啊啊啊啊啊哦哦哦诶IEIE恩家报表出具", "bgColor":"#ec4262", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"的方式的方法反反复复反复反复", "bgColor":"#23b28b", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"}
    ]
    this.sendMsg(cmtArr);
}
private sendMsg(cmtArr: any) {
    for (var i=0; i<cmtArr.length; i++) {
        var cmtItem = cmtArr[i],
            iconStr = '';
        if (cmtItem.icon && cmtItem.icon.length > 0) {
            iconStr = '<span class="icon"><img src="'+ cmtItem.icon +'"></span>';
        }
        // 字幕的节点内容
        cmtItem.text = iconStr + cmtItem.text;
        cmtItem.mode = 1;
        cmtItem.dur = Math.floor(Math.random()*4000 + 4000);
        (window as any).CM.send(cmtItem);
    }
}
public cmtController() {
    this.getCmtDataList();
    setTimeout(function(){
        cmtController();
    }, 5000);
}
}

</script>

<template>
  <!-- <div id"'comment_danmu_canvas" class="container"></div> -->
  <div id="my-comment-stage" class="container"></div>
</template>

<style lang="stylus" scoped>

// .module_comment_danmu
.container
  width 100%
  height 500px

</style>
