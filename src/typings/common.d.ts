declare namespace LIVISPACE {
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
}