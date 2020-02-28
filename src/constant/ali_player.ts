
/**
 * Aliplayer可以通过skinLayout属性去定制三个组件是否显示和位置:
 * 播放按钮 | Loading动画 | Controlbar的UI
 *
 * 设置规则：
 * skinLayout属性未设置，则默认显示全部；设置为空集合[]或false时，则全部隐藏
 * 如果是直播controlBar的children属性，只能是liveDisplay、fullScreenButton和Volume3个UI组件
 *
 * 可定义属性
 * align， {string}， 组件相对于父级组件的对齐方式，可选项有：
 * cc： 相对于父组件绝对居中
 * tl | tr： 相对于父组件左上（右上）对齐，受同级组件的占位影响，已组建的相对位置左上角（右上角）作为偏移点，可类比float:left(right)
 * tlabs | trabs： 相对于父组件左上（右上）绝对对齐，不受同级组件的占位影响，以父组件左上角（右上角）作为偏移原点
 * blabs | brabs： 相对于父组件左下（右下）绝对对齐，不受同级组件的占位影响，以父组件左下角（右下角）作为偏移原点
 * x | y： 水平（垂直）方向偏移量，偏移原点参考align的说明，cc时无效
 */


// h5 点播
export const SKINLAYOUT_H5_VOD = [
  {name: 'bigPlayButton', align: 'blabs', x: 30, y: 80},
  {
     name: 'H5Loading', align: 'cc',
  },
  {name: 'errorDisplay', align: 'tlabs', x: 0, y: 0},
  {name: 'infoDisplay'},
  {name: 'tooltip', align: 'blabs', x: 0, y: 56},
  {name: 'thumbnail'},
  {
    name: 'controlBar', align: 'blabs', x: 0, y: 0,
    children: [
      {name: 'progress', align: 'blabs', x: 0, y: 44},
      {name: 'playButton', align: 'tl', x: 15, y: 12},
      {name: 'timeDisplay', align: 'tl', x: 10, y: 7},
      {name: 'fullScreenButton', align: 'tr', x: 10, y: 12},
      {name: 'subtitle', align: 'tr', x: 15, y: 12},
      {name: 'setting', align: 'tr', x: 15, y: 12},
      {name: 'volume', align: 'tr', x: 5, y: 10},
     ],
   },
 ];

// flash 点播
export const SKINLAYOUT_FLASH_VOD = [
  {name: 'bigPlayButton', align: 'blabs', x: 30, y: 80},
  {
    name: 'controlBar', align: 'blabs', x: 0, y: 0,
    children: [
      {name: 'progress', align: 'tlabs', x:  0, y: 0},
      {name: 'playButton', align: 'tl', x: 15, y: 26},
      {name: 'nextButton', align: 'tl', x: 10, y: 26},
      {name: 'timeDisplay', align: 'tl', x: 10, y: 24},
      {name: 'fullScreenButton', align: 'tr', x: 10, y: 25},
      {name: 'streamButton', align: 'tr', x: 10, y: 23},
      {name: 'volume', align: 'tr', x: 10, y: 25},
    ],
  },
  {
    name: 'fullControlBar', align: 'tlabs', x: 0, y: 0,
    children: [
      {name: 'fullTitle', align: 'tl', x: 25, y: 6},
      {name: 'fullNormalScreenButton', align: 'tr', x: 24, y: 13},
      {name: 'fullTimeDisplay', align: 'tr', x: 10, y: 12},
      {name: 'fullZoom', align: 'cc'},
    ],
  },
];

// h5 直播
export const SKINLAYOUT_H5_LIVE = [
  {name: 'bigPlayButton', align: 'blabs', x: 30, y: 80},
  {name: 'errorDisplay', align: 'tlabs', x: 0, y: 0},
  {name: 'infoDisplay', align: 'cc'},
  {
    name: 'controlBar', align: 'blabs', x: 0, y: 0,
    children: [
      {name: 'liveDisplay', align: 'tlabs', x:  15, y: 6},
      {name: 'fullScreenButton', align: 'tr', x: 10, y:  10},
      {name: 'subtitle', align: 'tr', x: 15, y: 12},
      {name: 'setting', align: 'tr', x: 15, y: 12},
      {name: 'volume', align: 'tr', x: 5, y: 10},
    ],
  },
];

// flash 直播
export const SKINLAYOUT_FLASH_LIVE = [
  {name: 'bigPlayButton', align: 'blabs', x: 30, y: 80},
  {name: 'errorDisplay', align: 'tlabs', x: 0, y: 0},
  {name: 'infoDisplay', align: 'cc'},
  {
    name: 'controlBar', align: 'blabs', x: 0, y: 0,
    children: [
      {name: 'liveDisplay', align: 'tlabs', x: 15, y: 25},
      {name: 'fullScreenButton', align: 'tr', x: 10, y: 25},
      {name: 'volume', align: 'tr', x: 10, y: 25},
    ],
  },
];



// Aliplayer可以通过skinLayout属性去定制三个组件是否显示和位置:
export const SKINLAYOUT = [
  {
    name: 'bigPlayButton',
    align: 'blabs',
    x: 30,
    y: 80,
  },
  {
    name: 'controlBar',
    align: 'blabs',
    x: 0,
    y: 0,
    children: [
      {
        name: 'progress',
        align: 'tlabs',
        x: 0,
        y: 0,
      },
      {
        name: 'playButton',
        align: 'tl',
        x: 15,
        y: 26,
      },
      {
        name: 'nextButton',
        align: 'tl',
        x: 10,
        y: 26,
      },
      {
        name: 'streamButton',
        align: 'tr',
        x: 10,
        y: 23,
      },
    ],
  },
  {
    name: 'fullControlBar',
    align: 'tlabs',
    x: 0,
    y: 0,
    children: [
      {
        name: 'fullTitle',
        align: 'tl',
        x: 25,
        y: 6,
      },
      {
        name: 'fullNormalScreenButton',
        align: 'tr',
        x: 24,
        y: 13,
      },
      {
        name: 'fullTimeDisplay',
        align: 'tr',
        x: 10,
        y: 12,
      },
      {
        name: 'fullZoom',
        align: 'cc',
      },
    ],
  },
];
