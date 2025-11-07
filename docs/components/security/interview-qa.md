# 前端安全面试题（解析）

> 依据你提供的截图信息“前端安全（21题）”整理，并补充了更完整的要点与防护清单。图片里文字可能不够清晰，这里给出可直接用于复习与面试的版本。

## 1. 说说你对 XSS 的理解

- 定义：跨站脚本攻击（Cross-Site Scripting, XSS），攻击者将恶意脚本注入到受害者浏览器执行，从而实现窃取 Cookie、伪造身份、劫持会话、钓鱼跳转、键盘记录等。
- 常见场景：评论区/富文本、搜索框、URL 参数、拼接的 HTML 片段、历史/最近浏览记录、第三方 SDK 注入不当等。
- 分类
  - 反射型（非持久）：恶意载荷随请求进入，响应中立即“反射”回页面（多见于搜索、提示页）。
  - 存储型（持久）：恶意脚本被存入服务端（DB/缓存），后续所有访问者都会中招（评论区、昵称、公告）。
  - DOM 型：前端在浏览器内进行 DOM 解析和插值时拼接/执行了恶意内容（如 innerHTML、document.write、eval、Function）。
- 危害：盗取敏感数据、账号接管、伪造支付/转账、蠕虫传播、内网横向移动。

### XSS 防护（分层）
- 输入处理
  - 白名单优先：仅允许预期格式（正则/类型/长度）。
  - 富文本：使用可信清洗库（DOMPurify、xss），配置允许的标签与属性白名单，禁用 on* 事件与 javascript: 协议。
- 输出编码（最关键）
  - HTML 文本节点：escape（< > & " '），避免插入为标签/属性/事件。
  - HTML 属性上下文：属性值需再做引号包裹与编码。
  - URL 上下文：encodeURIComponent。
  - JS 字面量上下文：JSON.stringify 生成字符串常量，不拼接可执行代码。
- CSP（内容安全策略）
  - 默认禁用内联脚本（script-src 'self'），必要时用 nonce/hash 放行受信脚本；限制域名白名单；升级 mixed content；报告上报（report-to）。
- Cookie 保护
  - 设置 HttpOnly/Secure/SameSite，配合服务端会话管理与 CSRF 防护，降低被窃取后可利用性。
- 框架与模板
  - 使用默认“自动转义”的模板（Vue/React/SSR 模板）；避免 v-html / dangerouslySetInnerHTML，确需使用时先清洗。
- 供应链与第三方
  - 锁版本、完整性校验（SRI）、域名白名单；对第三方 SDK 做隔离与权限控制。

## 2. CSRF 基本原理与防护
- 原理：借助受害者已登录态，诱导其在不知情情况下向可信站点发起“跨站请求”。
- 防护
  - SameSite Cookie（Lax/Strict/None+Secure）
  - 双重提交 Cookie + Token 校验；Referer/Origin 校验
  - 关键操作使用一次性 Token/验证码/二次确认；对跨域接口使用 CORS 严格白名单

## 3. 点击劫持（Clickjacking）
- 原理：将目标页面以透明 iframe 嵌入，诱导用户在覆盖层点击。
- 防护：X-Frame-Options: DENY/SAMEORIGIN；或 CSP frame-ancestors；关键页面添加 frame busting。

## 4. 依赖/供应链安全
- 锁定依赖版本（lockfile），使用 npm audit / pnpm audit；对外链脚本使用 SRI + Subresource Integrity。
- 构建产物完整性与发布流程（CI/CD）隔离；最小权限原则（Least Privilege）。

## 5. CORS 与跨域
- 预检请求（OPTIONS）与简单请求；Access-Control-Allow-Origin/Methods/Headers；带凭证需精准 Origin 且允许 Credentials。
- 切勿对 * 开放带凭证请求；服务端务必做鉴权与幂等控制。

## 6. HTTPS / TLS 要点
- 证书链、SNI、HSTS；握手建立后才进入加密通道，配合 HTTP/2/3 提升性能。
- 禁止明文传输敏感信息；前后端一致的证书校验与过期管理。

## 7. 常见“易忽视”的前端风险
- 本地存储泄露：LocalStorage/IndexedDB 存放敏感信息（建议仅存非敏感/短期、必要加密，并设计过期与撤销）。
- 重定向漏洞：前端与服务端对 redirect 参数做白名单；避免 open redirect。
- JSONP 与 postMessage：校验来源与数据格式；明确 targetOrigin，避免 '*'
- 文件上传：MIME/扩展名/魔术数字校验，存储隔离、防脚本执行；大文件分片与鉴权。

---

## 速查清单（Checklist）
- [ ] 模板默认转义，禁止拼接 HTML；富文本使用 DOMPurify/xss 清洗
- [ ] CSP 最小放行策略，启用 nonce/hash；SRI 校验第三方脚本
- [ ] Cookie: HttpOnly/Secure/SameSite；后端签名与过期
- [ ] CSRF：SameSite + Token/Origin 校验；高危操作二次确认
- [ ] CORS：精准白名单与凭证控制；严格服务端鉴权
- [ ] X-Frame-Options / frame-ancestors 防点击劫持
- [ ] 依赖与构建链安全：lockfile、audit、SCA、最小权限
- [ ] 日志脱敏，错误上报（Sentry）与告警；SourceMap 上报到私有存储

## 面试常见问法（30 秒版）
- XSS 是什么？三类的区别？如何在“输出上下文”做安全编码？CSP 怎么落地？
- CSRF 原理？如何利用 SameSite + Token + Origin/Referer 综合防护？
- 点击劫持如何阻止？X-Frame-Options 与 CSP frame-ancestors 区别？
- CORS 如何安全配置？带凭证的限制是什么？
- HTTPS 与 HSTS 的价值？如何避免降级与中间人？

> 如需把原截图里其它问题也系统化（例如 SSRF、SQL 注入、子域名接管、开放重定向、依赖安全等），告诉我目录，我继续补齐。