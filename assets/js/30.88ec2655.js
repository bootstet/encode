(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{350:function(t,a,s){t.exports=s.p+"assets/img/assign1.52200e30.png"},351:function(t,a,s){t.exports=s.p+"assets/img/assign2.0b1ac8a1.png"},439:function(t,a,s){"use strict";s.r(a);var n=s(25),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"面试题-深入理解赋值表达式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#面试题-深入理解赋值表达式"}},[t._v("#")]),t._v(" 面试题 深入理解赋值表达式")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("n")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a\n  a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("n")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { n: 2 }")]),t._v("\n")])])]),a("p",[t._v("分析步骤：")]),t._v(" "),a("ul",[a("li",[t._v("var a = { n: 1 } 系统开了个内存空间 { n: 1 } a指过来了")]),t._v(" "),a("li",[t._v("var b = a // b也指向这个内存空间")]),t._v(" "),a("li",[t._v("a.x = a = { n: 2 }\n"),a("blockquote",[a("ul",[a("li",[t._v("先看左边 a.x ,在a上开了个x 先给个undefined, 此时 a 为 { n: 1, x: undefined } b 为 { n: 1, x: undefined }")]),t._v(" "),a("li",[t._v("右边的=是个运算,所以 a = { n: 2 },此时系统开辟了一个新的内存空间，此时a的指针发生改变，指向这个新的内存空间，这此时 a 为 { n: 2 }, b 为 { n: 1, x: undefined}")]),t._v(" "),a("li",[t._v("此时第三行代码其实就变成了 a.x = { n: 2 }，此时的a的指针还是之前的a所指向的指针，所以此时的b就变成了 { n: 1, x: { n: 2 }}")]),t._v(" "),a("li",[t._v("此时运算执行完毕，最终 a 是 { n: 2 }   b是 { n: 1, x: { n: 2 } }")])])])])]),t._v(" "),a("p",[t._v("分析图\n"),a("img",{attrs:{src:s(350),alt:"堆栈分析图"}})]),t._v(" "),a("p",[a("img",{attrs:{src:s(351),alt:"console分析图"}})]),t._v(" "),a("hr"),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.yuque.com/docs/share/3a596a0f-a130-4fae-8898-b32e217d3789",target:"_blank",rel:"noopener noreferrer"}},[t._v("网上分析链接"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);