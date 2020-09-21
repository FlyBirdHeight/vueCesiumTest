## CesiumJs结合Vue开发

## 开发记录
| 开发日期 | 开发内容 | 开发者 |
| :--- | :--- | :--- |
| 2020/08/23 | 创建项目并完成所需要的扩展导入  | adsionli |
| 2020/08/24 | 导入天地图图层，学习使用arcgis server  | adsionli |
| 2020/08/25 | 创建项目并完成所需要的扩展导入  | adsionli |
| 2020/08/26 | 完成poi搜索，同时导入天地图地图  | adsionli |
| 2020/08/27 | 完成几何体绘画，同时学习使用czml  | adsionli |
| 2020/08/30 | 项目结构化调整  | adsionli |
| 2020/09/01 | 完成相关前端视图代码构建 | adionli |
| 2020/09/05 | 整体代码优化，解耦，分模块 | adionli |
| 2020/09/07 | 关于Billboard的gif图片的实现与部分其他代码整理 | adionli |
| 2020/09/10 | 完善并学习entity中的操作 | adionli |
| 2020/09/14 | 完善dataSource操作 | adionli |
| 2020/09/16 | 学习并使用ScreenSpaceEventHandler完成部分操作 | adionli |
| 2020/09/21 | 完成多边形动态绘制，使用CallbackProperty进行操作 | adionli |


### 开发内容简介
1. 在研究生学习开学前，熟练掌握czml以及常使用类的数量掌握
2. 通过结合自己书写后台数据通过socket完成与前台实时数据交换，并呈现。
3. 尝试优化相关渲染代码，完成大批量模型呈现时卡顿问题解决。

### 所用工具版本记录
| 名称 | 版本 |
| :---: | :---: | 
| npm | 6.13.4 |
| nodejs | 12.14.0 |
| vue-cli | 4.5.2 |
| vue | 2.6.11 |
| vue-router | 3.2.0 |
| vuex | 3.4.0 |
| element-ui | 2.13.2 |
| CesiumJs | 1.72.0 |
| axios | 0.20.0 |

### 关于自己搭建vue-cesium的大致步骤
1. 安装vue
```
npm install -g vue
```
2. 创建vue-cli工程
```
1.vue create <name>
2.第一步:根据自身所需，选择相对创建方式，此处我选择了Manually select features,也就是根据自身需求进行定制
3. 第二步：选择需要预装入vue项目中的工具
3. 第三步：在vue-cli 4.x版本以上，需要选择使用vue的版本，这里暂时推荐vue2.x版本。
4. 第四步：是否选用以前所使用的router设置,建议输入:n
5. 第五步：选择eslint的使用组合,建议选择最后一个eslint+prettier
6. 第六步：选择eslint的工作时机，是在保存的时候还是在上传代码的时候进行检查
7. 第七步：选择你所喜欢的配置方式，根据自身需求选择
8. 第八步：选择是否需要将你上面的配置进行存储，根据自身需求选择
ending
```
3. 配置组件
    1. 导入CesiumJs ``npm i cesiumjs --save``
    2. 在src目录下的main.js文件中进行如下配置:

    ```
    var Cesium = require('cesium/Cesium');
    var widgets= require('cesium/Widgets/widgets.css');
    Vue.prototype.Cesium = Cesium
    Vue.prototype.widgets = widgets
    ```
    3. 在根目录中创建``vue.config.js``文件，并添加如下代码(可以根据实际需要加入对应配置)：
    
    ```
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    const webpack = require('webpack')
    const path = require('path')

    let cesiumSource = './node_modules/cesium/Source'
    let cesiumWorkers = '../Build/Cesium/Workers'

    module.exports = {
        // 基本路径  3.6之前的版本时 baseUrl
        publicPath: "./",
        // 输出文件目录
        outputDir: "dist",
        // eslint-loader 是否在保存的时候检查
        lintOnSave: false,
        // webpack-dev-server 相关配置
        devServer: {
            open: process.platform === "darwin",
            host: "0.0.0.0",
            port: 5000,
            https: false,
            hotOnly: false
        },
        configureWebpack: {
            output: {
            sourcePrefix: ' '
            },
            amd: {
            toUrlUndefined: true
            },
            resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
            },
            plugins: [
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            })
            ],
            module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false
            }
        }
    };
    ```
    4. 创建对应文件，同时设置路由即可查看。

**Ending**