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


/* ============================ CommentCoreLibrary 弹幕 类型 ============================ */
/**
 *  CommentCoreLibrary CommentManager 单条弹幕类型
 */
export interface CmtDanmuType {
  mode: number; // 类型
  text: string; // 弹幕的文字内容。在创造弹幕对象后，对 text 的更改将无意义。
  stime?: number; // 弹幕相对于视频位置的开始时间（ms）
  size: string; // 文字大小
  color: number; // 字体颜色, 需为16进制格式: 0xff00ff
  bgColor?: string; // 背景
  backgroundColor?: string; // 背景
  border?: boolean; // 弹幕边框
  
  ttl?: number; // Time To Live: ttl 表示弹幕剩余的生存时间（ms）（注意：在css模式下该子段可能不准确）
  dur?: number; // 弹幕的总生存时间（ms）。默认情况下，对于滚动弹幕这个数字是 4000
  motion?: string[]; // 控制一般弹幕（CoreComment）的运动轨迹，别的类型的弹幕可能忽略此属性（如 滚动弹幕）
  movable?: boolean; // 弹幕是否可移动
  width?: number; // 弹幕的宽高
  height?: number;
  shadow?: number;
}

}
