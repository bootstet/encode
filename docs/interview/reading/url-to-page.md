# 从输入 URL 到页面加载：系统复习笔记

> 一页纸（30 秒）
- 浏览器多进程，渲染进程多线程（GUI、JS、网络、定时器、事件）。输入 URL → 解析协议与地址 → 启动网络线程。
- DNS 解析（缓存 → 递归/迭代，可能经 CDN 调度）。TCP 三次握手（HTTP/1.x）；TLS 握手（HTTPS）。
- 发送 HTTP 请求（方法/URL/Headers/Body）→ 服务端（负载均衡/网关/应用）处理 → 返回响应（状态码/Headers/Body）。
- 缓存判定：强缓存（Cache-Control/Expires）优先；否则协商缓存（ETag/If-None-Match 或 Last-Modified/If-Modified-Since）。
- 解析与渲染：HTML→DOM，CSS→CSSOM，合并为 Render Tree → Layout（回流）→ Paint（重绘）→ Composite（合成，GPU 参与）。
- 资源加载：CSS 异步加载但会阻塞首次渲染；JS 默认阻塞解析（async/await、defer 区别）；图片异步不阻塞解析。
- 关键事件：DOMContentLoaded（DOM 构建完成，不含样式/图片）与 load（所有资源加载完成）。
- JS 引擎：解析（词法/语法→AST→字节码/机器码）、预处理（变量/函数提升；ASI 分号补全）、执行（执行上下文/作用域链/this/GC）。

---

## 主干流程（骨架）
```text path=null start=null
URL → 解析协议/主机/端口/路径/查询/Fragment
  → 启动网络线程
  → DNS 解析（多级缓存 → 递归/迭代，可能 CDN 调度）
  → TCP 三次握手（HTTP/1.x），或 QUIC/TCP 复用（HTTP/3/2）
  → （HTTPS）TLS 握手（证书校验、对称密钥协商）
  → 发送 HTTP 请求 → 网关/负载（Nginx）→ 应用 → 数据/缓存
  → 返回响应（状态码/头/体）
  → 缓存规则判定（强缓存→命中即用；否则发起协商缓存）
  → 解析与渲染：HTML→DOM，CSS→CSSOM，合并 Render Tree
  → Layout（回流）→ Paint（重绘）→ Composite（合成）→ 显示
  → 事件：DOMContentLoaded / load
```

## 网络与协议
- DNS：多级缓存（浏览器/系统/Host/ISP 递归）；耗时可用 dns-prefetch 预解析（谨慎使用）。
- TCP：三次握手/四次挥手；同域并发连接数受限（2–10+）。HTTP/2 多路复用同一 TCP，HTTP/3 使用 QUIC（基于 UDP）。
- GET vs POST（规范层）：GET 通常一个包（头+体合并）；POST 常为两个阶段（Expect: 100-continue）。
- HTTPS（TLS）：证书校验（CA→链），ClientRandom/ServerRandom/Premaster 协商对称密钥，后续对称加密传输。

## HTTP 交互与常用头
- 通用：Method、URL、Status、Content-Type、Content-Encoding（gzip/br）、Connection、Keep-Alive。
- CORS：Origin ↔ Access-Control-Allow-Origin/Methods/Headers，预检 OPTIONS。
- Cookie/Set-Cookie：作用域/过期/SameSite/HttpOnly/Secure；静态资源建议使用无 Cookie 域名以减负。

## 缓存（强/协商）
- 强缓存：Cache-Control: max-age / immutable / s-maxage；（HTTP/1.0）Expires。
- 协商缓存：ETag ↔ If-None-Match（更精确）；Last-Modified ↔ If-Modified-Since（秒级）。
- 规则：强缓存命中直接 200(from cache)；否则发起请求，协商命中 304。
- 生产建议：优先 Cache-Control + ETag；存在同时配置时 Cache-Control 优先于 Expires。

## 资源加载与阻塞
- CSS：异步下载；首次渲染前阻塞（避免闪烁/错样）。media 属性不阻塞。
- JS：默认阻塞解析；async（下载并行，下载完即执行，顺序不保证）、defer（解析后、DOMContentLoaded 前后执行，按顺序）。
- IMG：异步下载，不阻塞解析，完成后替换占位。
- 事件：DOMContentLoaded（仅 DOM 就绪）；load（所有资源就绪）。

## 渲染流水线
- DOM 构建（字节→字符→token→节点→树），CSSOM 构建（同理）。
- Render Tree = DOM（可见节点） + CSSOM（计算样式）。
- Layout（回流）：计算几何信息；Paint（重绘）：绘制像素；Composite：合成图层（GPU）。
- 触发回流的常见操作：更改几何（width/height/padding/margin/position）、读取布局信息（offset*/client*/scroll*、getComputedStyle）。
- 优化要点：
  - 合批 DOM 读写（如使用请求帧/微任务队列、FastDom），避免读写交错。
  - 使用 class 切换代替逐条 style 写入；脱离文档流/开启合成层（will-change/transform）优化动画。
  - 长列表虚拟化、图片/字体策略（WebP/AVIF、子集化、preload/prefetch）。

## CSS 可视化格式模型（速览）
- 盒模型：content/padding/border/margin。
- 包含块 Containing Block：定位/尺寸的参照系。
- BFC：块格式化上下文（float 不重叠、margin 折叠规则、内部自洽；触发：float≠none、position:absolute/fixed、display:inline-block/table-cell 等、overflow≠visible）。
- IFC：行内格式化上下文（行框、基线、对齐规则）。

## JS 引擎与运行机制
- 解析：词法/语法→AST→（字节码）→JIT 机器码。
- 预处理：声明提升（var/函数）、ASI 分号插入（return 换行陷阱）。
- 执行：执行上下文（全局/函数）、执行栈、VO/AO、作用域链、this 绑定（调用位置决定），事件循环（宏/微任务）。
- GC：标记清除为主，分代回收（new space/old space）。避免无意闭包/全局引用导致泄漏。

## 安全与跨域（要点）
- XSS（反射/存储/DOM）：转义、CSP、HttpOnly、模板安全。
- CSRF：SameSite Cookie、双重 Cookie + Token、Referer/Origin 校验。
- CORS：服务端显式允许；预检缓存；凭证传递。

---

## 实战 Checklist
- DNS：关键域名预解析（dns-prefetch / preconnect）。
- 协议：全站 HTTPS；优先 HTTP/2/3；开启 gzip/br 压缩。
- 缓存：静态资源强缓存 + 内容哈希；ETag/Last-Modified 兜底；HTML 设短缓存或 no-store。
- 资源：关键 CSS 内联；JS 合理 async/defer；图片自适应与懒加载；字体子集与 font-display。
- 渲染：动画用 transform/opacity；合批 DOM 变更；虚拟列表；避免同步布局抖动。
- 监控：采集 LCP/CLS/INP/TTI；错误上报（Sentry）+ SourceMap；关键链路埋点。

## 高频问法（30 秒口径）
- 输入 URL 发生了什么？按“网络 → 缓存 → 解析/渲染 → JS 运行”的顺序回答，并在每步点名关键点（DNS/TLS/缓存头/阻塞点/事件/回流重绘/async vs defer）。
- 强缓存 vs 协商缓存？命中条件与头部对；改动路径/版本哈希刷新强缓存；304 的生效条件。
- CSS/JS 对首屏的影响？CSS 阻塞首次渲染、JS 阻塞解析；async/defer 区别与使用场景。
- 回流与重绘？触发操作、如何合批读写、动画优化手段。
- TLS 如何握手？证书校验与对称密钥协商的核心步骤与开销点。

## 速记卡片（Anki 导入示例 TSV）
```text path=null start=null
输入 URL 的完整链路？	DNS→TCP/TLS→HTTP 请求/响应→缓存判定→HTML/CSS 解析→Render Tree→Layout/Paint/Composite→DOMContentLoaded/load
强缓存与协商缓存如何区分？	强缓存：Cache-Control/Expires 命中直接用；协商缓存：ETag/Last-Modified 对比命中返回 304
async 与 defer 区别？	async 下载后立即执行，顺序不保证；defer 按顺序、文档解析完成后执行（一般在 DOMContentLoaded 前后）
回流与重绘的触发？	回流：几何变更/读取布局属性；重绘：颜色/阴影等外观变化；回流必然重绘
HTTPS 核心价值与代价？	提供机密性/完整性/身份认证；握手开销、证书管理；配合 HTTP/2/3 可抵消延迟
```

## 参考
- How browsers work（HTML5Rocks）
- FEX: What happen when you…
- 文章原文：从输入 URL 到页面加载的过程（戴力春）
