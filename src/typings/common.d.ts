declare namespace LIVESPACE {
  /* ============================ services 类型 ============================ */
  /**
   * 返回数据
   *
   * @export
   * @interface AjaxResponseType
   */
  export interface AjaxResponseType {
    readonly code: number;      // 状态码
    readonly msg: string;       // 信息
    readonly data: any;         // 具体数据

    readonly token?: string;    // token
    readonly status?: boolean;  // 接口状态
  }


/* ============================ 播放视频 ============================ */
/**
 * 视频对象
 */
interface VideoType {
  type: string; // 视频类型mp4, m3u8, rtmp, rtmps, rtmpe等等
  id: number;
  name: string; // 名称
  source: string; // 地址
  islive: boolean; // 播放方式
  poster: string; // 封面
}
/**
 * 播放器需要的视频信息
 */
interface VideoPlayerInfoType {
  type: string; // 不同的媒体协议对应不同的数据流类型
  source: string; // 视频（流）地址
  islive: boolean;
  poster: string;
}


/* ============================ CommentCoreLibrary 弹幕 类型 ============================ */
/**
 *  CommentCoreLibrary CommentManager CommentObject单条弹幕类型 | 弹幕抽象对象ICommentData
 */
export interface CmtDanmuType {
  stime: number; // 弹幕相对于视频位置的开始时间（ms）弹幕根据stime排序输出
  mode: number; // 弹幕类型 (`< 7` 时为普通弹幕)
  size: string; // 字号
  text: string; // 弹幕的文字内容。在创造弹幕对象后，对 text 的更改将无意义。图片弹幕中的 text 字段表示图片的URL。
  // color: number; // 字体颜色, 需为16进制格式: 0xff00ff

  // ############### 弹幕附加显示信息 ###############
  color?: string;
  font?: string; // 弹幕字体。默认使用字体
  bgColor?: string; // 背景
  backgroundColor?: string; // 背景
  border?: boolean; // 弹幕边框
  shadow?: number; //是否显示弹幕描边/阴影



  ttl?: number; // Time To Live: ttl 表示弹幕剩余的生存时间（ms）（注意：在css模式下该子段可能不准确）
  dur?: number; // 弹幕的总生存时间（ms）。默认情况下，对于滚动弹幕这个数字是 4000
  motion?: string[]; // 控制一般弹幕（CoreComment）的运动轨迹，别的类型的弹幕可能忽略此属性（如 滚动弹幕）
  movable?: boolean; // 弹幕是否可移动
  width?: number; // 弹幕的宽高
  height?: number;
  
  
  // ############### 暂未使用的配置 ###############
  author?: number; // 发送者ID
  date?: string; // 发送时间戳。排序时，两个相同stime的弹幕，Date更新的排序在后面（渲染更靠上层）
  cindex?: number; // 弹幕在弹幕池里的ID，用于删除弹幕时寻找
  pool?: number; // 
  dbid?: any; // 记录弹幕的数据库ID，同一时间靠前的弹幕会先显示，靠后的后显示，来实现遮罩


  // axis: number; // 坐标轴增长方向
  // aling: number; // 对齐锚点（方形四角）
  // absolute: boolean; // 对齐锚点（方形四角）
  // parent: string; // 此弹幕归属的上层管理器
  // dom: any; // 对应的渲染元素，根据不同情况选择HTMLDivElement|Canvas|etc. 默认为div元素
  // ############### 弹幕methods方法 ###############
  // constructor
  // init
  // time
  // update
  // invalidate
  // animate
  // finish
  // stop
  // toString
}

/**
 * 全局弹幕 设置
 */
export interface CmtGlobalStylsSetType {
  shieldtype: string; // 按弹幕类型屏蔽（滚动、底部、彩色等）
  opacity: number; // 透明度
  shieldcomment: number; // 关键词屏蔽
  area: number; // 弹幕显示区域
  speed: number; // 弹幕速度
  fontsize: number; // 弹幕字号
  limit: number; // 最大显示数量（0或以下表示不限制同屏弹幕数量）
}
}
