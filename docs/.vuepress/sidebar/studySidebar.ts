const studySidebar = [


  {
    title: 'JavaScript深度剖析',   // 必要的
    // path: '/components/page/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
        ['/components/page/funPro.md', '函数式编程'],
        ['/components/page/asyncPro.md', 'JavaScript异步编程'],
        ['/components/page/myPromise.md', 'JavaScript异步 - 手写promise'],
        ['/components/page/ES6.md', 'ES新特性'],
        ['/components/page/optimization.md', 'js性能优化'],
        ['/components/page/prototype.md', 'Js之原型和原型链'],
        // ['/components/page/callBindApply.md', 'Js之call apply new'],
        ['/components/page/datatype.md', 'Js之数据类型'],
        ['/components/jsBase/bind.md', 'Js之bind的模拟实现'],
        ['/components/jsBase/callOrApply.md', 'Js之call和apply的模拟实现'],
        ['/components/jsBase/new.md', 'Js之new的模拟实现'],
        ['/components/jsBase/this.md', 'Js之从ECMAScript规范解读this'],
        ['/components/jsBase/scopeChain.md', 'Js之作用域链'],
        ['/components/jsBase/objectMethods.md', 'Js之创建对象的多种方式及优缺点'],
        ['/components/jsBase/arguments.md', 'Js之参数按值传递'],
        ['/components/jsBase/executableContext.md', 'Js之执行上下文'],
        ['/components/jsBase/executableContextStack.md', 'Js之执行上下文栈'],
        ['/components/jsBase/argumentsObject.md', 'Js之类数组对象与arguments'],
        ['/components/jsBase/jicheng.md', 'Js之继承的多种方式和优缺点'],
        ['/components/jsBase/scope.md', 'Js之词法作用域和动态作用域'],
        ['/components/jsBase/closure.md', 'Js之闭包'],
      ]
  },
  {
    title: 'typeScript',   // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 5,    // 可选的, 默认值是 1
    children: [
      ['/components/ts/typescript.md', 'typeScript基础'],
      ['/components/ts/jinjie.md', 'typeScript进阶'],
      ['/components/ts/easy/实现pick', '实现Pick'],
      ['/components/ts/easy/实现readonly', '实现readonly'],
      ['/components/ts/easy/元组转换为对象', '元组转换为对象'],
      ['/components/ts/easy/第一个元素', '第一个元素'],
      ['/components/ts/easy/获取元组长度', '获取元组长度'],
      ['/components/ts/easy/实现Exclude', '实现Exclude'],
      ['/components/ts/easy/实现Awaited', '实现Awaited'],
      ['/components/ts/easy/实现If', '实现If'],
      ['/components/ts/easy/实现Concat', '实现Concat'],
      ['/components/ts/easy/实现Includes', '实现Includes'],
      ['/components/ts/easy/实现Push', '实现Push'],
      ['/components/ts/easy/实现Unshift', '实现Unshift'],
      ['/components/ts/easy/实现Parameters', '实现Parameters'],
      ['/components/ts/medium/获取函数返回类型', '中等 获取函数返回类型'],
      ['/components/ts/medium/实现Omit', '中等 实现Omit'],
      ['/components/ts/medium/实现DeepReadonly', '中等 实现DeepReadonly'],
      ['/components/ts/medium/元组转联合', '中等 元组转联合'],
      ['/components/ts/medium/可串联构造器', '中等 可串联构造器'],
      ['/components/ts/medium/最后一个元素', '中等 最后一个元素'],
      ['/components/ts/medium/实现Pop', '中等 实现Pop'],
      ['/components/ts/medium/实现Promise.all', '中等 实现Promise.all'],
      ['/components/ts/medium/实现按类型查找', '中等 实现按类型查找'],
      ['/components/ts/medium/实现TrimLeft', '中等 实现TrimLeft'],
      ['/components/ts/medium/实现Trim', '中等 实现Trim'],
      ['/components/ts/medium/实现Capitalize', '中等 实现Capitalize'],
      ['/components/ts/medium/实现ReplaceAll', '中等 实现ReplaceAll'],
      ['/components/ts/medium/追加参数', '中等 追加参数'],
      ['/components/ts/medium/实现全排列', '中等 实现全排列'],
      ['/components/ts/medium/计算字符的长度', '中等 计算字符的长度'],
      ['/components/ts/medium/实现Flatten', '中等 实现Flatten'],
      ['/components/ts/medium/AppendToObject', '中等 AppendToObject'],
      ['/components/ts/medium/实现Absolute', '中等 实现Absolute'],
      ['/components/ts/medium/字符转联合', '中等 字符转联合'],
      ['/components/ts/medium/实现Merge', '中等 实现Merge'],
      ['/components/ts/medium/实现KebabCase', '中等 实现KebabCase'],
      ['/components/ts/medium/实现Diff', '中等 实现Diff'],
      ['/components/ts/medium/AnyOf', '中等 AnyOf'],
      ['/components/ts/medium/isNever', '中等 isNever'],
      ['/components/ts/medium/isUnion', '中等 isUnion'],
      ['/components/ts/medium/实现ReplaceKeys', '中等 实现ReplaceKeys'],
      ['/components/ts/medium/移除索引签名', '中等 移除索引签名'],
      ['/components/ts/medium/百分比解析器', '中等 百分比解析器'],
      ['/components/ts/hard/SimpleVue', '困难 SimpleVue'],
      ['/components/ts/hard/柯里化', '困难 柯里化'],
      ['/components/ts/hard/UnionToIntersection', '困难 UnionToIntersection'],
      ['/components/ts/hard/获取必填属性', '困难 获取必填属性'],
      ['/components/ts/hard/获取可选属性', '困难 获取可选属性'],
      ['/components/ts/hard/获取必填属性键值', '困难 获取必填属性键值'],
      ['/components/ts/hard/获取可选属性键值', '困难 获取可选属性键值'],
      ['/components/ts/hard/大写首字母', '困难 大写首字母'],
      ['/components/ts/hard/CamelCase', '困难 CamelCase'],
      ['/components/ts/hard/cPrintfParser', '困难 cPrintfParser'],
      ['/components/ts/hard/isAny', '困难 isAny'],
      ['/components/ts/hard/get', '困难 get'],
      ['/components/ts/hard/stringToNumber', '困难 stringToNumber'],
      ['/components/ts/hard/元组转EnumObject', '困难 元组转EnumObject'],
      ['/components/ts/hard/printf', '困难 printf'],
      ['/components/ts/hard/StringJoin', '困难 StringJoin'],
      ['/components/ts/hard/DeepPick', '困难 DeepPick'],
      ['/components/ts/hard/Camelize', '困难 Camelize'],
      ['/components/ts/hard/DropString', '困难 DropString'],
      ['/components/ts/hard/两数之和', '困难 两数之和'],
      ['/components/ts/common/判断两个类型相等', '通用 判断两个类型相等'],
      ['/components/ts/common/递归深度', '通用 递归深度'],
      ['/components/ts/common/箭头函数重载', '通用 箭头函数重载'],
      ['/components/ts/common/类型推断的边界条件', '通用 类型推断的边界条件'],
     
    ]
  },
  {
    title: '设计模式',   // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/question/design.md', 'JavaScript设计模式'],
    ]
  },
  {
    title: '前端工程化',   // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/engineering/', '前端工程化'],
      ['/components/engineering/scaffold.md', '脚手架工具'],
      ['/components/engineering/yeoman.md', 'yeoman使用'],
      ['/components/engineering/gulp.md', 'gulp'],
      ['/components/engineering/esModules.md', 'esModules'],
      ['/components/engineering/webpack.md', 'webpack'],
    ]
  },
  {
    title: 'vue',
    collapsable: true, 
    sidebarDepth: 3,
    children: [
      ['/components/vue/vueBase', 'vue基础'],
      ['/components/vue/virtualDom', '虚拟dom'],
      // ['./components/vue/notes/Vue基础回顾.pdf', '老师笔记'],
      ['/components/vue/vuex.md', 'vuex'],
      ['/components/vue/nuxt基础.md', 'nuxt基础'],
      ['/components/vue/nuxt综合案例.md', 'nuxt综合案例'],
    ]
  },
  {
    title: 'react',
    collapsable: true,
    idebarDepth: 5,
    children: [
      ['/components/react/basics1.md', 'react基础回顾'],
      ['/components/react/virtualDOM.md', 'Virtual DOM 及 Diff算法'],
      ['/components/react/fiber1.md', 'fiber'],
      ['/components/react/React-code.md', 'react 源码解析'],
      ['/components/react/redux.md', 'redux'],
      ['/components/react/hooks.md', 'hooks'],
    ]
  },
  {
    title: 'node',
    collapsable: true,
    idebarDepth: 5,
    children: [
      ['/components/node/basic.md', 'node核心'],
      ['/components/node/communication.md', '网络通信'],
      ['/components/node/module.md', 'node模块化（未完）'],
    ]
  },
  {
    title: '面试题',   // 必要的
    path: '/components/question/', 
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/question/proAndAsync.md', '异步|函数编程'],
      ['/components/question/tsAndEs6.md', 'Es6|ts'],
      ['/components/question/assign.md', '理解赋值表达式'],
      ['/components/question/engineering.md', '工程化及gulp创建项目'],
      ['/components/question/webpack.md', 'webpack'],
      ['/components/question/vueVirtualdom.md', 'vue虚拟dom'],
      ['/components/question/node.md', 'nodejs高级编程'],
      ['/components/browser/reviewQuestion.md', '2021面试题'],
    ]
  },
  {
    title: '面试题整理',   
    sidebarDepth: 3,    
    children: [
      ['/components/question/html.md', 'html'],
      ['/components/question/css.md', 'css'],
      ['/components/question/javascript.md', 'javascript'],
      ['/components/question/vue.md', 'vue'],
      ['/components/question/react.md', 'react'],
      ['/components/question/network.md', '计算机网络'],
      ['/components/browser/browser.md', '浏览器原理'],
      ['/components/question/xingnengyouhua.md', '性能优化'],
      ['/components/question/gongchenghua.md', '前端工程化'],
      ['/components/question/shouxiedaima.md', '手写代码'],
      ['/components/question/daimashuchu.md', '代码输出'],
    ]
  },
  {
    title: '常见问题记录',
    // path: '/components/article/',
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/article/bokeinit.md', '个人博客搭建步骤记录'],
      ['/components/article/npmTool.md', 'cyzserver静态服务npm工具包'],
    ]
  },
  {
    title: '感悟',
    // path: '/components/gnosis/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, 
    children: [
      ['/components/gnosis/', '巴拉巴拉']
    ]
  },
  {
    title: '待定...',
    // path: '/components/page2/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, 
    children: [ 
      // ['/components/page2/', '占位目录的']
    ]
  }
]
 
  
export default studySidebar
