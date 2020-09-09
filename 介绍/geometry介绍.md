## Geometry的介绍


1. Billboard
| 属性 | 作用 |
|:---:|:---:|
| pixelOffset | 像素偏移(多个billboard在同一个位置的时候进行偏移 |
| verticalOrigin | 原点相对于billboard的垂直位置，可以是bottom\center\top三种形式  |
| sclar | 缩放比例 |
| eyeOffset | 眼偏移量,眼睛抵消通常用于安排多个广告牌或对象在同一位置,如 , 安排一个广告牌高于其相应的三维模型。 |
| disableDepthTestDistance | 禁用深度测试距离,也就是去掉地形遮挡 |
| distanceDisplayCondition | 指定在什么距离,这个多边形将显示出来。 |
| horizontalOrigin  | 获取或设置指定水平原点的属性。 |
| rotation | 获取或设置在世界空间轴对齐。 对齐的轴的单位向量向量指向广告牌。 缺省值是零向量,这意味着广告牌向量对齐到屏幕上。可以设置对其其他方向 |
