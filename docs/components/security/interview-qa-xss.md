# 11. 前端安全（21题）

本文汇总前端安全常见问题，包含：XSS 类型与演示、DOM 型 XSS、上下文编码、净化方案、CSP、Cookie/会话安全、落地自测清单等。

## 1. 说说你对 XSS 的理解

- 定义
  - XSS（Cross-Site Scripting，避免与 CSS 混淆）是指攻击者将恶意脚本注入页面，在受害者浏览器侧执行，从而窃取敏感信息或发起未授权操作。
- 形成背景
  - 早期主要是“跨站回显”，如今更多是“跨上下文执行”。是否跨站已非关键，“XSS”名称沿用至今。
- 危害
  - 盗取 Cookie/Token、会话接管、钓鱼跳转、键盘记录、蠕虫传播、发起 CSRF/越权等。

### XSS 的三种类型

- 反射型（非持久）
  - 载荷随请求进入，服务端原样“反射”到响应并立即执行。常见于搜索、提示页。
- 存储型（持久）
  - 载荷被存储在 DB/缓存/日志，后续访问者都会触发。常见于评论、昵称、公告等字段。
- DOM 型
  - 纯前端注入，使用不安全的 DOM API/危险函数在本地拼接和执行；不依赖服务端渲染。

### 常见注入/执行上下文

- 文本节点：插入标签/脚本
- 属性上下文：如 img/src、a/href、事件 onerror/onload
- URL 上下文：javascript:、data:
- JS 字面量上下文：把不可信数据拼进 `<script>`/内联事件中执行
- 样式上下文：现代浏览器已限制高危用法（老 IE 有 expression）

---

## 2. 典型 Payload（演示）

```html path=null start=null
<!-- 基础弹窗 -->
<script>alert(1)</script>

<!-- 属性触发 -->
<img src="x" onerror="alert(1)">

<!-- URL 方案 -->
<a href="javascript:alert(1)">click</a>

<!-- DOM 型：hash 注入 -->
<!-- URL: http://example.com/#" onmouseover="alert(1) -->
<div id="app"></div>
<script>
  // 不安全：直接拼接用户可控的 location.hash
  app.innerHTML = location.hash.slice(1)
</script>
```

---

## 3. 漏洞到修复（搜索页示例）

```html path=null start=null
<!-- 漏洞页 search.html -->
<input id="q" placeholder="keyword" />
<div id="result"></div>
<script>
  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  // 漏洞：把不可信输入直接拼到 HTML
  result.innerHTML = `您搜索了：<b>${q}</b>`
</script>
```

修复（按上下文编码/使用文本 API）：

```html path=null start=null
<script>
  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  const b = document.createElement('b')
  b.textContent = q                 // 文本写入用 textContent
  result.textContent = '您搜索了：'  // 不拼 HTML 结构
  result.appendChild(b)
</script>
```

---

## 4. DOM 型 XSS 高频“危险点/安全替代”

- 危险 sink
  - innerHTML、outerHTML、document.write、insertAdjacentHTML
  - eval、new Function、setTimeout/setInterval(字符串)
  - jQuery.html()
- 安全替代
  - textContent/innerText、createTextNode/append
  - setAttribute（值需按上下文编码）
  - 模板引擎/框架“默认转义”输出
- 建议
  - URL 参数、Hash、表单、富文本数据，在“渲染前”进行净化/编码

---

## 5. 编码与过滤误区

- 仅做字符替换（如 `<` → `&lt;`）但忽略属性/URL/JS 上下文，仍可被绕过
- encodeURI/escape ≠ 安全，必须“按输出上下文编码”
  - 文本节点：HTML 实体编码 `< > & " '`
  - 属性值：属性必须加引号，并对值进行 HTML 编码；禁止拼接 on* 事件
  - URL：对参数使用 encodeURIComponent，再拼进安全的 href/src（限制协议白名单）
  - JS 字面量：JSON.stringify 生成安全字符串，不拼接可执行代码

---

## 6. 富文本场景（仅允许少量标签）

- 使用专用净化库（JS：DOMPurify/xss；Python：Bleach 等）
- DOMPurify 示例：

```html path=null start=null
<script src="https://unpkg.com/dompurify@3.0.6/dist/purify.min.js"></script>
<script>
  const dirty = '<p onclick="alert(1)">Hi <img src=x onerror=alert(2) /></p>'
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p','b','i','strong','em','a','img'],
    ALLOWED_ATTR: ['href','src','alt','title'],
    ALLOW_DATA_ATTR: false
  })
  container.innerHTML = clean
</script>
```

---

## 7. CSP（Content-Security-Policy）

- 目标：限制脚本来源与执行方式，显著压缩注入的执行面
- 推荐策略（可先 Report-Only 观察）：

```http path=null start=null
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-r4nd0m' https://cdn.example.com;
  object-src 'none'; base-uri 'self'; frame-ancestors 'self';
  upgrade-insecure-requests; report-to csp-endpoint;
```

```http path=null start=null
Content-Security-Policy-Report-Only: script-src 'self' 'nonce-r4nd0m'
```

- 要点
  - 默认禁用内联脚本；通过 nonce/hash 放行受信脚本
  - 严格脚本域名白名单；对跨域框架使用 frame-ancestors
  - 配置 report-to/uri 观察违规并治理

---

## 8. Cookie / 会话安全

| 属性      | 作用                         | 备注                                  |
|-----------|------------------------------|---------------------------------------|
| HttpOnly  | 禁止 JS 读取 Cookie          | 降低 XSS 后的 Cookie 被盗风险        |
| Secure    | 仅 HTTPS 传输                | 避免明文窃听                          |
| SameSite  | Lax/Strict/None(+Secure)    | 缓解 CSRF；带跨站场景需 None+Secure  |

- 结合：会话签名/轮换/过期、CSRF Token、防重放等

---

## 9. 框架与模板

- Vue：默认转义；谨慎 v-html，需净化后使用
- React：默认转义；dangerouslySetInnerHTML 仅在净化后使用
- SSR/模板引擎：保持默认转义，区分“文本输出”与“原样输出”

---

## 10. 自测 Payload 清单（回归必测）

```text path=null start=null
<script>alert(1)</script>
<svg onload=alert(1)></svg>
<img src=x onerror=alert(1)>
<a href=javascript:alert(1)>x</a>
" autofocus onfocus=alert(1) "
<iframe srcdoc="<script>alert(1)</script>"></iframe>
"><img src=x onerror=alert(1)>
```

- 注入覆盖：文本/属性/URL/富文本/模板插值/Hash/存储字段
- 验证：编码是否正确、CSP 是否拦截、是否有告警与上报

---

## 11. 最小落地清单（工程化）

- [ ] 统一按上下文输出编码：文本/属性/URL/JS
- [ ] 禁用危险 sink（innerHTML/document.write/eval 等），或集中封装并审计
- [ ] 富文本净化：DOMPurify/xss + 明确白名单
- [ ] CSP：script-src 使用 nonce/hash + 域名白名单；frame-ancestors 防点击劫持；object-src none
- [ ] Cookie：HttpOnly/Secure/SameSite；关键接口配合 CSRF Token
- [ ] 依赖与第三方：SRI 校验/锁版本/域名白名单；必要时沙箱隔离
- [ ] 监控：开启 CSP Report、前端错误上报与告警（含采样/聚合）
