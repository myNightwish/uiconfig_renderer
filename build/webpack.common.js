// 以 commonjs2 规范打包构建类库。
const path = require('path');
// 构建进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 引入公共配置
const config = require('./config');

module.exports = {
    mode: 'production',
    entry: {
        app: ['./src/index.js'] // Entry descriptor  传入一个对象 ./src/index.js
    },
    output: {
        // 组件库打包产物输出的绝对路径
        path: path.resolve(process.cwd(), 'lib/'), // 绝对路径
        // 为项目中的所有资源指定一个基础路径【 相对于服务(server-relative)】
        publicPath: '/dist/',
        // 打包产物名字
        filename: 'mi-element-ui.js',
        // 对于按需记载的chunk文件，chunk命名按此规则
        chunkFilename: '[id].js',
        // libraryExport：指定哪一个导出应该被暴露为一个库
        libraryExport: 'default',  // 指定哪一个导出应该被暴露为一个库
        // 库以何种规范打包构建：以 commonjs2 规范打包构建类库，之后库需要库这种暴露的方式引入
        libraryTarget: 'commonjs2'
    },
    // 解析
    resolve: {
        // 在引入模块时，不带拓展名：此时会按照 .js .vue .json 顺序进行尝试
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        // 告知webpack解析模块时应该搜索的目录
        modules: ['node_modules']
    },
    // externals 配置项用于将某些依赖排除在打包结果之外。这些被排除的依赖通常是那些在运行时由外部环境提供的库，
    // 比如通过 CDN 加载的库。这样做可以减少打包文件的大小，并且避免重复打包已经存在于外部环境中的依赖。
    // 例如：假设你有一个项目依赖于 jQuery，但你希望通过 CDN 加载 jQuery，而不是将其打包到输出文件中：
    //     <head>
    //   <meta charset="UTF-8">
    //   <title>Document</title>
    //   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    // </head>
    // 则此时配置： externals: {
    //     jquery: 'jQuery'  // 表示全局变量 jQuery 应该用于导入 jQuery 模块
    //   }
    // 当 Webpack 遇到 require('jquery') 或 import $ from 'jquery' 时，
    // 它不会将 jQuery 打包到输出文件中，而是期望在运行时环境中全局存在 jQuery 变量。
    // externals: config.externals,
    performance: {
        // 控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
        hints: false // 不展示警告或错误提示
    },
    // 可以在统计输出里指定你想看到的信息
    stats: {
        children: false // 是否添加关于子模块的信息
    },
    optimization: {
        //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()]
};
