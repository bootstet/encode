(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{401:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"模块化开发与规范化标准"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模块化开发与规范化标准"}},[t._v("#")]),t._v(" 模块化开发与规范化标准")]),t._v(" "),s("blockquote",[s("p",[t._v("node commonjs\n浏览器 ES modules")])]),t._v(" "),s("h3",{attrs:{id:"es-module-基本特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es-module-基本特性"}},[t._v("#")]),t._v(" ES-module 基本特性")]),t._v(" "),s("ul",[s("li",[t._v("ESM 自动采用严格模式，忽略'use strict'")]),t._v(" "),s("li",[t._v("每个ESM模块都是单独的私有作用域")]),t._v(" "),s("li",[t._v("ESM是通过CORS去请求外部JS模块的")]),t._v(" "),s("li",[t._v("ESM的script标签会延迟执行脚本")])]),t._v(" "),s("h3",{attrs:{id:"es-module-导入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es-module-导入"}},[t._v("#")]),t._v(" ES-module 导入")]),t._v(" "),s("p",[t._v("导出 export\n导入 import")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    name "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重命名，导入的时候需导入重命名之后的变量名")]),t._v("\n    foo "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" fooo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    Person\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导出的时候 {} 是固定的用法，并不是导出一个对象")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" name\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" name "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// from后必须是完整路径名，不能简写 import 项目路径 ./也不能省略  如果省略它会以为这是第三方的的模块  ")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  / 根目录文件下去找文件领")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// import {} from './module.js' 是指执行，不引用")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// import './mudile.js'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// import * as mod from './module.js' // 模块内人成员很多时，一次性全部导入，并用mod.xx 方式与引用")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  import('./modules.js')返回一个promise")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// export {foo, bar} from './module.js' 直接导出导入的成员 ")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./module.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("module")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" defult "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" rename"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./module.js'")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" rename"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./module.js'")]),t._v("\n")])])]),s("p",[t._v("导入注意事项；")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("rom后必须是完整路径名，不能简写 import 项目路径 ./也不能省略  如果省略它会以为这是第三方的的模块")]),t._v(" "),s("li",[t._v("import './module.js' 是指执行，不引用")]),t._v(" "),s("li",[t._v("import * as mod from './module.js' // 模块内人成员很多时，一次性全部导入，并用mod.xx 方式与引用")]),t._v(" "),s("li",[t._v("导入路径是一个变量时，不能用import，需动态导入")])])]),t._v(" "),s("h3",{attrs:{id:"es-module-in-node"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es-module-in-node"}},[t._v("#")]),t._v(" ES Module in node")]),t._v(" "),s("p",[t._v("处于过度状态")]),t._v(" "),s("ul",[s("li",[t._v("ES Modules中可以导入CommonJS 模块")]),t._v(" "),s("li",[t._v("CommonJs 中不能导入ES Modules模块")]),t._v(" "),s("li",[t._v("CommonJS 始终只会导出一个默认成员")]),t._v(" "),s("li",[t._v("注意import不是解构导出对象")])]),t._v(" "),s("blockquote",[s("p",[t._v("node --experimental-modules [file]")])])])}),[],!1,null,null,null);s.default=e.exports}}]);