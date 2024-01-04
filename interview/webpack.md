工具链

webpack
webpack的热更新
基础概念
1.webpack compiler : 将js代码编译成bundle
2. bundle server： 提供文件在浏览器的访问
3.HMR server：将热更新的文件输出到HMR runtime
4.HMR runtime：会被注入到bundle中，与HMR server 通过websocket链接，接收文件变化并且更新对应文件
5.bundle.js: 构建输出的文件
原理
1.启动阶段
a.webpack compiler 将对应文件打包成bundle.js 。发送给 bundler server
b.浏览器可以通过访问服务器的方式获得bundle.js
2.更新阶段
a.webpack compiler 重新编译，发送结果给 HMR server
b.HMR server 计算得出哪些模块变化了，通过websocket发送给HMR runtime
c.HMR runtime 更新代码
详细过程
1.使用express启动本地服务，当浏览器访问资源时对此做响应。
2.服务端和客户端使用websocket实现长连接
3.webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。
a.每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
b.编译完成后通过socket向客户端推送当前编译的hash戳
4.客户端的websocket监听到有文件改动推送过来的hash戳，会和上一次对比。
a.一致则走缓存
b.不一致则通过ajax和jsonp向服务端获取最新资源
5.使用内存文件系统去替换有修改的内容实现局部刷新

loader 和 plugin
 loader是什么
Webpack默认只认识JS，对于非JS的文件，比方说样式，图片，文件，json等等，就需要一些工具来帮忙翻译。而loader，就是那个翻译官，可以解析非原生JS的代码或文件。
loader是文件加载器，能够加载资源文件，并对文件进行一些处理。处理一个文件可以使用到多个loader，执行的顺序是从下到上。
第一个loader最后执行，第一个执行的loader接收源文件内容作为参数，其它loader接收前一个执行的loader的返回值作为参数，最后执行的loader会返回此模块的JavaScript源码。

plugin是什么
Webpack插件是对Webpack功能的扩展和增强，可以帮助我们在打包过程中自动执行一些额外的操作，例如生成HTML文件、压缩代码、提取CSS等
plugin让webpack的机制更加灵活，它在编译过程中留下的一系列生命周期的钩子，通过调用这些钩子来实现在不同编译结果时对源模块进行处理gin 的实现可以是一个类，使用时传入相关配置来创建一个实例，然后放到配置的 plugins 字段中，而 plugin 实例中最重要的方法是 apply，该方法在 webpack compiler 安装插件时会被调用一次，apply 接收 webpack compiler 对象实例的引用，你可以在 compiler 对象实例上注册各种事件钩子函数，来影响 webpack 的所有构建流程，以便完成更多其他的构建任务。


Tree-shaking
通过静态分析消除js模块中未使用的代码，减小项目体积。
Tree-Shaking依赖于es6的模块机制，因为es6模块是静态的，编译时就能确定模块的依赖关系，对于非es6模块的代码或者动态引入的代码，无法被消除掉。
配置
需要配置webpack.config 中的optimization.useExport 为true, 同时在babel配置中使用babel-preset-env, 开启module为true，避免在构建过程中，es模块被转化成cjs模块。

webpack打包流程
1.解析配置文件，根据配置文件初始化webpack实例，构建打包流程
2.解析模块依赖，webpack会从entry配置中指定入口文件开始，递归解析模块之间的依赖关系，并构建模块依赖图谱
3.加载模块：webpack会根据模块依赖图谱，加载所有需要打包的模块，通过配置的loader将文件转换成webpack可以识别的模块。
4.执行插件：webpack在打包流程中根据钩子触发事件，通知插件完成各种任务，比如生成html 和 压缩代码等
5.输出打包结果：webpack将打包后的代码和资源输出到指定的输出目录
6.监听变化：在开发模式下，webpack-dev-server 会执行HMR流程

webpack常见事件
1.before-run: 在开始构建前触发，一般用于清理上一次构建的临时文件或者状态
2.run: 开始构建时
3.before-compile: 开始编译代码之前触发，用于添加一些额外的编译配置或者预处理
4.compile：在webpack开始编译代码时触发，用于监听编译过程或者处理编译错误
5.emit：在webpack生成输出文件之前触发，用于修改输出文件或生成一些附加文件
6.after-emit:  在生成输出文件之后触发，用于清理中间文件或执行一些其他草走
7.done：完成构建时触发，用于生成构建报告或者通知开发者构建结果。

webpack5
1.更快的构建速度，特别是开发者模式下
2.tree-shaking 优化： 改进了tree-shaking算法
3.内置的持久化缓存：可以缓存每一个模块的编译结果，加速后续的构建
4.原生支持webAssembly
5.构建umd产物默认是target：es6
6.模块联邦

模块联邦

webpack开发环境优化
1.使用cache-loader等实现缓存，将模块打包结果缓存避免重复构建
2.使用dllplugin，将一些不常用的三方库，预先打包好，避免重复打包
3.开发环境下权衡后是否需要sourcemap
4.多线程打包，thread-loader开启多线程需要额外的开销，并不一定会更快
5.配置模块解析，webpack在模块解析时会搜索node_module目录，这个耗时大。可以使用alias指定特定路径，或者exclude不解析node_module
6.使用webpack5、vite 、rspack等

打包结果优化
1.打包体积分析，webpack-analyzer
2.代码压缩， css、js压缩
3.使用懒加载拆分bundle
4.开启gzip：使用compression-webpack-plugin插件，生成额外的gzip静态文件，然后部署时再开启Nginx的gzip即可。
5.使用splitChunks提取公共代码
6.分类第三方库，单独打包，提高缓存命中率



vite
为什么选择vite
webpack-dev-server启动缓慢，他会从入口开始，递归检索需要的模块，经过loader 和  plugin等处理。webpack的HMR随着模块数量变大而变慢。
vite 是bundless，编写的模块是按文件加载，HMR是在原生ESM上执行的，同时利用HTTP的协商缓存源码模块，依赖模块则会使用强缓存。
vite在启动时不需要打包，而是请求模块的时候实时编译，在HMR方面，也是让浏览器重新请求该模块即可，不像webpack那样需要把该模块关联的依赖全部编译一次，效率更高。

原理
1.模块解析
a.启动服务器
b.解析依赖
2.预构建
a.判断本地缓存是否存在
b.收集依赖的模块路径
c.esbuild 将三方依赖构建缓存到.vite文件夹，而且将一些cjs的文件替换成esm


pnpm
在分析了CI过程后，发现CI耗时主要在构建镜像、依赖解析、依赖安装和构建产物这几部分上
1.构建镜像：尽量使用相同的node版本，然后预先安装特定的工具，并且保持轻量，能减少导入镜像的耗时
2.依赖分析：将依赖包的版本区间解析为某个具体的版本号
a.npm是单线程
b.yarn多线程解析依赖resolving，在解析完成后下载fetching，最后将下载好的依赖写入node_modules文件夹linking
c.pnpm也是多线程解析依赖，如果存在lockfile就不需要这一步了。边解析边下载依赖，多个不同的依赖的解析和下载是并行的，可以节省依赖解析 + 依赖安装的整体耗时
3.依赖安装：
a.部分项目每次CI都重复安装依赖，没有利用好缓存，导致每次CI都需要重新执行依赖安装
4.构建产物：
a.项目有多条构建命令的时候，要注意指令是否可以并行执行。

不同项目pnpm提速波动原因
1.安装依赖
a.yarn 和 pnpm 在存在lockfile的情况下，不需要resolving，这一个很耗时的步骤被省略掉了
b.在本地缓存存在的情况下，yarn 和 pnpm 都能避免从网络下载资源。但是pnpm是硬链接，会比yarn快。当依赖不复杂的情况下，io不够多，提升不明显
c.在docker上没命中缓存时，pnpm的并行解析和下载，优势比较明显
d.本地，pnpm会越来越快，因为会不断命中缓存，相同版本的依赖，reuse本地，硬链接很快。





