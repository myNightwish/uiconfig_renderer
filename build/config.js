var path = require('path');
// 一个 Webpack 插件，用于在打包时排除 Node.js 模块
var nodeExternals = require('webpack-node-externals');
// salad.config.json 文件，用于 PostCSS 的配置
var saladConfig = require('./salad.config.json');

var externals = {};

// 将 vue 模块添加到 externals 对象中，并结合 nodeExternals 插件来排除 Node.js 模块。
externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

// 将外部依赖配置导出，以便在 Webpack 配置中使用
exports.externals = externals;

exports.alias = {
  Examples: path.resolve(__dirname, '../examples'),
  Common: path.resolve(__dirname, '../examples/common'),
  BaseStyle: path.resolve(__dirname, '../examples/baseStyle'),
  Components: path.resolve(__dirname, '../examples/components'),
};
// 定义 Vue 的模块系统配置，以便在不同模块系统中都可以正确引用 Vue
exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

//js忽略路径
exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\.js/;

// saladConfig的目的是为项目提供统一的样式处理和增强功能
/* 1、浏览器兼容性：
解决问题：现代 CSS 特性和语法在一些旧版本浏览器（如 IE 9）中可能不被支持。
通过指定目标浏览器，可以使用 PostCSS 和 Autoprefixer 等工具自动添加必要的前缀和降级处理，确保样式在所有目标浏览器中都能正常工作。
是否实际还需要canIuse：需要
    -1、浏览器支持的特性不断更新，即使配置了目标浏览器，某些新的或实验性的 CSS 特性可能仍然无法在所有目标浏览器中使用。
    -2、并不是所有的 CSS 特性都能通过这些工具来解决兼容性问题。某些特性在旧浏览器中可能完全不被支持

2、features里 配置 BEM（Block Element Modifier）命名规范的快捷方式和分隔符
解决问题：随着项目规模和复杂度增加，样式管理越来越困难。BEM 通过其命名规则和结构化方法，帮助开发者保持代码的一致性和可维护性。
    separators：定义了 BEM 规范中使用的分隔符：
    descendent 对应 __，表示块和子元素之间的分隔符。
    modifier 对应 --，表示块或子元素与修饰符之间的分隔符。
*/

/* postcss-salad 是一个基于 PostCSS 的工具，它的主要功能包括：
    自动添加浏览器前缀：确保生成的 CSS 能在目标浏览器中正常显示。
    支持 BEM 命名规范：生成符合 BEM 规范的类名。
    其他 CSS 处理功能：例如变量、嵌套规则等。
*/
exports.postcss = function(webapck) {
    // 动态地将 Webpack 添加为 postcss-salad 的依赖，使得 postcss-salad 能够识别并处理 Webpack 的模块依赖关系。
    saladConfig.features.partialImport = {
        addDependencyTo: webapck
    };
    return [
        // 将 saladConfig 配置传递给 postcss-salad 插件，确保在处理样式时应用了配置中的所有特性。
        require('postcss-salad')(saladConfig)
    ];
};
