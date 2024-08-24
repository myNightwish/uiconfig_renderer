const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// webpack-dev-server v4.0.0 开始，模块热替换是默认开启的
// 新增部分
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
  // 动态mode，根据环境变量 NODE_ENV 决定是开发模式还是生产模式
  mode: process.env.NODE_ENV,
  entry: './examples/entry.js',
  output: {
    path: path.resolve(process.cwd(), 'dist/'),
    // 指定发布到线上资源的 URL 前缀，在浏览器加载资源时会用到。常用于设置 CDN 地址或服务器路径。
    // 这里 publicPath 的值根据环境变量 CI_ENV 动态设置，如果 CI_ENV 存在，则使用其值作为前缀，否则使用空字符串
    publicPath: process.env.CI_ENV || '',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  performance: {
    hints: false
  },
  stats: {
    children: true
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.vue', '.json'], // 自动解析这些扩展
    alias: config.alias,
    modules: ['node_modules']
  },
  module: {
    rules: [
      // eslint 7X 之前版本中，需要使用 eslint-loader 替换 eslint-plugin-vue
      // 在构建过程中使用 ESLint 对 JavaScript 和 Vue 文件进行代码检查
      // {
      //   /* 作用是将 eslint-loader 设置为一个前置加载器（pre-loader）
      //   这个配置项的作用是将 eslint-loader 设置为一个前置加载器（pre-loader）。
      //   Webpack 的 loader 有三种类型：前置（pre）、正常（normal）、后置（post）。
      //   前置加载器会在所有其他类型的 loader 之前执行。*/
      //   enforce: 'pre',
      //   // 用于指定哪些文件会被这个 loader 处理。
      //   test: /\.(vue|jsx?)$/,
      //   // 用于指定哪些文件或目录不应该被这个 loader 处理
      //   exclude: /node_modules/,
      //   // 指定使用 eslint-loader 进行处理：eslint-loader 用于在构建过程中使用 ESLint 对代码静态分析，查找和修复代码中的问题和风格错误
      //   loader: 'eslint-loader'
      // },
    {
        test: /\.(jsx?|babel|es6)$/,
        // process.cwd()返回的是当前工作目录的路径，意味着 Babel 将会处理当前工作目录中的所有匹配文件。
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader',
        /* 如果不传递 options，babel-loader 将使用其默认配置:
        1.默认 Babel 配置: 如果没有 .babelrc 或 babel.config.js 文件，那么 babel-loader 将无法找到任何配置，将不会对代码任何转换
        2.项目兼容性问题: 现代 JS 特性（如箭头函数、async/await 等）将不会被转换，可能导致在不支持这些特性的浏览器中出现兼容性问题。*/
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // loader借助传入的options可以更细微的控制loader行为
        options: {
            // 传递给 Vue 模板编译器的选项。
            compilerOptions: {
                // 作用：在编译模板时移除模板中的空格
                // preserveWhitespace：默认Vue 模板编译器会保留模板中的空格，但可能会导致生成的 HTML 中包含多余的空格，增加最终打包文件大小
                preserveWhitespace: false
                // 除此之外，vue-loader还有提供的其他选项，如：CSS 模块、热重载、自定义模板编译器
            }
        }
      },
      {
        test: /\.css$/,
        use: [
            // 在生产环境中，使用 MiniCssExtractPlugin.loader 提取 CSS 到单独的文件中
            // 在开发环境中，使用 style-loader 将 CSS 插入到 DOM 中的 <style> 标签里。
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            // 解析 CSS 文件，处理 @import 和 url() 等 CSS 内部的导入语句
            'css-loader',
            // 使用 PostCSS 处理 CSS，例如添加前缀，处理兼容性问题。
            'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            // 将 SCSS 文件编译为 CSS 文件。
            'sass-loader'
        ]
      },
    // 使用 url-loader 处理各种静态资源文件，小于 10KB 的文件会被内联到代码中，
    // 而较大的文件会被输出到指定目录，并且生成唯一的文件名以便于缓存管理
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false, // 这里设置为false
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
        chunks: 'initial',
        // webpack 中用于配置代码分割的一种方式，它允许你根据一定的规则将模块分割成不同的块，并控制这些块的打包方式。
        cacheGroups: {
            vendor: {
                // 配置将哪些第三方模块打包到单独的vendor.[contenthash].js 文件
                // 一般，vendor 包含了项目中所使用的第三方库和框架，如 Vue、React、lodash 等
                // 好处：第三方库往往不会频繁变动，将它们单独打包可以利用浏览器缓存，
                // 减小每次更新时的文件大小，提高页面加载速度。
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                // 表示这个块的优先级比其他块高，因此会被优先打包
                priority: -10,
                // 指定了哪些类型的块会被放入当前的 cache group 中
                // 只有入口模块（即应用的起始模块）会被放入当前的 cache group 中。
                // 这样做的目的是将第三方模块打包到一个单独的文件中，以减小每个入口文件的体积，加快页面加载速度。
                chunks: 'initial'
            },
            common: {
                // 将公共的 JavaScript 提取到一个单独的名为 common.[contenthash].js 的文件中
                // 这样可以避免重复加载相同的代码，减小打包后文件的体积，提高页面加载速度。
                name: 'common',
                // 表示在至少两个入口文件中被引用的模块才会被提取到这个块中。
                minChunks: 2,
                priority: -20,
                // 用于指定是否重用已经存在的块
                // 如果当前的 cache group 已经包含了某个模块，而且这个模块也符合其他 cache group 的规则，
                // 那么就会重用这个已存在的块，而不会重复打包。这样可以避免代码重复，提高打包的效率。
                reuseExistingChunk: true
            }
        }
    }
},
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(), // 确保添加插件实例
    new HtmlWebpackPlugin({
      template: './examples/index.tpl',
      filename: 'index.html'
    }),
    new ProgressBarPlugin(),
    // 去除了HotModuleReplacementPlugin，为什么？
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^.*LICENSE.txt|^.*README.md$/,
    })
  ],
  devServer: {
    // 作用：指定静态文件所在的目录，开发服务器会从 dist 目录提供静态文件。可以访问 dist 目录中的文件，例如通过 http://nightwish.com:9000/index.html 访问 dist/index.html 文件。
    // 如果不添加：Webpack DevServer 会默认提供打包后的文件作为静态文件服务，即使用打包输出目录（通常是 output.path）作为静态文件服务的目录。
    // 如果没有显式配置 output.path，Webpack 会使用默认的输出目录（通常是当前工作目录下的 dist 目录）。
    // output配置了，这里不用再配了
    // static: {
    //     directory: path.join(__dirname, 'dist')
    // },
    host: 'nn.pan.baidu.com',
    port: 8091
  },
};
//  将 CSS 提取到单独文件中，而不是将其嵌入到 JS 文件中。
// 作用：减小JS文件的大小，并提高浏览器缓存效率，因为 CSS 和 JS 文件可以分别缓存。
// 同时，CSS 不再通过 JS 注入到 <style> 标签中，而是直接通过 <link> 标签加载，从而减少了运行时内存占用。
if (isProd) {
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
      chunkFilename: '[name].[contenthash:7].css'
    })
  );
}

module.exports = webpackConfig;
