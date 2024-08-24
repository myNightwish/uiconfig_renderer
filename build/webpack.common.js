// 以 commonjs2 规范打包构建类库。
const path = require('path');
// 构建进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackDeployPlugin = require('webpack-deploy-plugin');

// 引入公共配置
const config = require('./config');
const ENV_RELEASE = process.env.MODE === 'release';

const CONFIG = {
    mode: 'production',
    entry: './examples/entry.js',
    output: {
        // 组件库打包产物输出的绝对路径
        path: path.resolve(process.cwd(), 'dist/'), // 绝对路径
        // 为项目中的所有资源指定一个基础路径【 相对于服务(server-relative)】
        publicPath: '/dist/',
        // 打包产物名字
        filename: 'uiconfig-renderer.js',
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
    performance: {
        // 控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
        hints: false // 不展示警告或错误提示
    },
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
let plugins = CONFIG.plugins;
if (ENV_RELEASE) {
    plugins.unshift(new WebpackDeployPlugin({
        autoUpload: true,
        receiver: 'http://maomao.pan.baidu.com:8765/receiver/upload',
        to: 'app/',
        // 具体匹配规则请参考https://www.npmjs.com/package/fast-glob
    }));
}

module.exports = CONFIG;