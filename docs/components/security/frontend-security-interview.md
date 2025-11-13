# 前端安全面试题（21题）

本文汇总前端安全常见问题，包含：XSS 类型与演示、DOM 型 XSS、上下文编码、净化方案、CSP、Cookie/会话安全、CSRF、权限认证、跨域、HTTPS、WebSocket 安全等。

## 1. 说说你对 XSS 的理解

### 一、初探 XSS

跨站脚本攻击，英文全称是 Cross Site Script，本来缩写是 CSS，但是为了和层叠样式表（Cascading Style Sheet，CSS）有所区别，所以在安全领域叫做"XSS"。

XSS 攻击，通常指黑客通过 HTML 注入篡改网页，插入恶意脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击行为。

### 二、XSS 攻击类型分类

XSS 攻击可以分为 3 类：反射型（非持久型）、存储型（持久型）、基于 DOM 的 XSS。

#### 反射型

反射型 XSS 只是简单地把用户输入的数据"反射"给浏览器。也就是说，黑客往往需要诱使用户"点击"一个恶意链接，才能攻击成功。反射型 XSS 也叫做"非持久型 XSS"（Non-persistent XSS）。

通常反射型 XSS 的恶意代码存在 URL 里，通过 URL 传递参数的功能，如网站搜索、跳转等。

#### 存储型

存储型 XSS 会把用户输入的数据"存储"在服务器端。这种 XSS 具有很强的稳定性。

比较常见的一个场景就是，黑客写下一篇包含有恶意 JavaScript 代码的博客文章，文章发表后，所有访问该博客文章的用户，都会在他们的浏览器中执行这段恶意的 JavaScript 代码。

#### DOM 型 XSS

DOM 型 XSS 是一种比较特殊的 XSS，需要满足几种条件才能发生，不太通用，但很隐蔽，危害较大。

本质上是 DOM 节点的文本内容不可控，作为代码被执行了。

会触发 XSS 的地方有很多，以下几个地方需要格外注意：

- `document.write()`
- `document.writeln()`
- `xxx.innerHTML`
- `xxx.outerHTML`
- `document.attachEvent()`
- `window.attachEvent()`
- `window.location()`

## 2. XSS 中的编码

### HTML 实体编码

对用户输入的内容进行 HTML 实体编码，将特殊字符转义：

```js
function encodeForHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
```

### JavaScript 编码

```js
function encodeForJavaScript(str) {
    return str.replace(/[^\w,\. ]/g, (c) => {
        return '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0');
    });
}
```

## 3. CSRF 攻击及防护

### 什么是 CSRF

CSRF 攻击（Cross-Site Request Forgery，跨站请求伪造）是针对用户身份进行攻击的行为。

攻击者诱导用户打开第三方网站，利用用户已经获取的登录凭证，冒充用户执行操作。

### CSRF 攻击流程

1. 攻击者构造出特定的第三方网页，含有请求目标网站接口的请求
2. 用户打开该网页时，浏览器带上登录凭证，发起请求到目标网站
3. 目标网站执行请求（带着用户的登录状态）

### CSRF 防护

- **同源检测**：验证请求来源
- **SameSite Cookie**：设置 Cookie 的 SameSite 属性
- **CSRF Token**：在表单中添加随机 Token
- **验证 Referer**：检查请求来源

#### CSRF Token 验证流程

1. 用户打开页面时，服务器生成 Token
2. 对于 GET 请求，Token 附在请求地址之后；对于 POST 请求，需要在表单中增加隐藏域
3. 用户提交请求后，服务端验证 Token 是否正确

## 4. 说说你对前端权限的理解

### Session-Cookie

利用服务器的 Session（会话）和浏览器的 Cookie 来实现前后端的认证。

由于 HTTP 协议是无状态的，服务器需要创建会话，并通过浏览器的请求携带 Cookie 中的 sessionId 来识别用户。

### Token

Token 是一串字符串，包含用户的相关信息。

**流程：**
1. 用户登录，输入用户名和密码
2. 服务器验证成功后，生成 Token
3. 服务器将 Token 返回给客户端
4. 客户端存储 Token（Cookie 或 Local Storage）
5. 客户端每次请求都携带 Token
6. 服务器验证 Token 有效性

### JWT（JSON Web Token）

JWT 是一个开放标准，定义了一种用于简洁、自包含的用于通信双方之间以 JSON 对象的形式安全传输信息的方法。

**JWT 格式分为三部分：**
- Header（头部）：描述 JWT 的元数据
- Payload（负载）：用来存放实际需要传递的数据
- Signature（签名）：对前两部分的签名，防止数据篡改

### OAuth2.0

OAuth 2.0 是一个开放授权标准，允许用户授权第三方应用访问他们存储在另外服务提供者上的信息。

**流程：**
1. 客户端向认证服务器请求授权
2. 用户同意授权
3. 认证服务器返回 Access Token
4. 客户端通过 Access Token 向资源服务器请求资源
5. 资源服务器验证 Access Token，有效则返回资源

### SSO（单点登录）

SSO 的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。

## 5. CSP（Content Security Policy）可以解决什么问题？

CSP 是为限制网页上可以加载和执行的资源。

**主要防护方式：**
- 限制资源加载
- 限制内联脚本执行
- 禁止 eval() 等函数
- 设置 HTTP 响应头

**作用：**
- 防止 XSS 攻击
- 防止内容注入
- 报告违规行为

## 6. 跨域

### 什么是跨域

跨域是指浏览器出于安全考虑，禁止向不同源的服务器发送请求。

### 同源策略

当协议、域名、端口号中任意一个不相同时，都会判断为不同源。

### CORS（跨域资源共享）

服务器设置响应头，允许跨域访问。

#### 简单请求

同时满足以下两个条件，就属于简单请求：
1. 请求方法是：HEAD、GET、POST 三者之一
2. HTTP 头信息不超过几个字段：Accept、Accept-Language、Content-Language、Content-Type

#### 非简单请求

不满足简单请求条件的，就属于非简单请求。

非简单请求会先发送一次 OPTIONS 的预检请求。

### 跨域解决方案

#### Nginx 代理跨域

通过 Nginx 代理服务器来转发请求。

```nginx
location /api {
    proxy_pass http://api.example.com;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods *;
    add_header Access-Control-Allow-Headers *;
}
```

#### JSONP

利用 `<script>` 标签没有跨域限制的特点。

```html
<script>
function callback(data) {
    console.log(data);
}
</script>
<script src="http://example.com/api?callback=callback"></script>
```

#### PostMessage

HTML5 新增的跨文档通信 API。

```js
window.postMessage(message, targetOrigin);
```

### SameSite Cookie

SameSite 是 Cookie 的一个属性，用来限制第三方 Cookie。

- **Strict**：严格模式，完全禁止第三方 Cookie
- **Lax**：宽松模式，允许部分情况携带 Cookie
- **None**：任何情况下都会携带 Cookie

## 7. HTTPS 有哪些优点？

- 使用 HTTPS 协议可认证用户和服务器，确保数据发送到正确的客户机和服务器
- 数据通过加密传输，防止被窃取
- 数据不会被篡改，防止中间人攻击
- 是目前架构下最安全的解决方案

## 8. WebSocket 安全

### 概述

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。

协议标识符是 `ws`（如果加密，则为 `wss`）。

### 安全问题

#### 认证授权

建议通过 Token 进行认证，在连接时验证 Token，以及建立连接后每次消息交互都应验证权限。

#### 输入验证

验证输入，包括类型检查、长度限制等，避免恶意代码注入。

#### CSRF 攻击

验证 Origin 头部的来源，确定请求来源是否合法。

#### DOS 攻击

- 使用 `wss://` 加密连接
- 限制单个 IP 可建立连接的最大连接数
- 实现超时机制
- 限制消息大小和频率

## 9. 什么是点击劫持？如何防止点击劫持？

点击劫持（Clickjacking）是一种视觉欺骗的攻击手段，攻击者将目标网站嵌入到自己的网站中，并设置为透明，诱导用户点击。

### 防护方法

- 使用 X-Frame-Options 响应头
- 使用 CSP 的 frame-ancestors 指令
- 使用 JavaScript 检测是否被嵌套

## 10. 什么是 SameSite Cookie 属性？

SameSite 是 HTTP 响应头 Set-Cookie 的一个属性。

- **Strict**：严格模式，完全禁止第三方 Cookie
- **Lax**：宽松模式，部分情况下允许携带 Cookie
- **None**：不限制，Cookie 在任何情况下都会发送

## 11. Cookie 的 SameSite 属性有什么作用？

用来防止 CSRF 攻击和用户追踪。

### 第一方 Cookie 和第三方 Cookie

- **第一方 Cookie**：由当前网页的域名设置的 Cookie
- **第三方 Cookie**：如果网站嵌入其他域名，第三方网站设置的 Cookie

### Lax 规则

| 请求类型 | 示例 | 正常情况 | Lax |
|---------|------|---------|-----|
| 链接 | `<a href="..."></a>` | 发送 Cookie | 发送 Cookie |
| 预加载 | `<link rel="prerender" href="..."/>` | 发送 Cookie | 发送 Cookie |
| GET 表单 | `<form method="GET" action="...">` | 发送 Cookie | 发送 Cookie |
| POST 表单 | `<form method="POST" action="...">` | 发送 Cookie | 不发送 |
| iframe | `<iframe src="..."></iframe>` | 发送 Cookie | 不发送 Cookie |
| AJAX | `$.get("...")` | 发送 Cookie | 不发送 |
| Image | `<img src="...">` | 发送 Cookie | 不发送 Cookie |

## 12. Cookie 中的 HttpOnly 属性有什么用途？

当 Cookie 设置了 HttpOnly 标记后，该 Cookie 无法通过客户端脚本访问。

这样即使网站存在 XSS 漏洞，也无法通过 JavaScript 读取 Cookie，避免 Cookie 被盗取。

## 13. 前端的常规安全策略

- 防御 XSS 攻击：转义 HTML + 净化 HTML + CSP
- 防御 CSRF 攻击：SameSite Cookie + CSRF Token + Referer 验证
- 对第三方包和组件进行检测：NSP、Snyk
- HTTPS 加密传输
- 敏感数据加密存储

## 14. 静态资源完整性校验

使用 Subresource Integrity（SRI）标准，可以验证引入的资源是否被篡改。

```html
<script 
  src="https://cdn.example.com/app.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

## 15. 前端防止抄袭

- 禁用右键
- 禁用 F12
- 禁用查看源代码
- 混淆和加密：对 JavaScript 代码进行混淆、压缩、加密
- 水印：在页面上添加水印，追踪来源

## 16. iframe 安全

### 安全问题

- 嵌入第三方内容会有不可控因素
- 攻击者可以将目标网站嵌入并设置为透明，诱导点击
- 跨域通信问题

### 防护方案

设置 X-Frame-Options 响应头：

- **DENY**：不允许被任何页面嵌入
- **SAMEORIGIN**：只允许在相同域名页面中被嵌入
- **ALLOW-FROM uri**：允许在指定来源的页面中被嵌入

## 17. SQL 注入

SQL 注入是一种常见的安全漏洞，攻击者通过在输入字段中插入恶意 SQL 代码，从而执行非法的数据库操作。

### 防护方式

- 后端进行严格的输入验证，对敏感字符过滤
- 使用参数化查询，避免拼接 SQL
- 限制数据库权限
- 使用 ORM 框架
- 记录日志

## 18. 中间人攻击

中间人攻击（MITM）是指攻击者与通信的两端分别建立连接，又能够完全控制通信内容的攻击方式。

### 常见的攻击方式

#### ARP 欺骗

通过伪造 IP 地址和 MAC 地址，进行 ARP 欺骗。

#### DNS 劫持

通过劫持 DNS 服务器，将域名解析到攻击者的服务器上。

#### 伪造证书

攻击者使用自己签发的伪造证书，欺骗客户端。

### 防护方式

- 使用 HTTPS
- 证书验证
- 不使用公共 WiFi

## 19. 如何防止别人调试自己的前端代码？

### 禁用调试

```js
// 禁用 F12
document.onkeydown = function(e) {
    if (e.key === 'F12') {
        return false;
    }
};

// 检测开发者工具
setInterval(function() {
    debugger;
}, 1000);
```

### 代码混淆

对 JavaScript 代码进行混淆、压缩、加密。

## 20. 如何应对流量劫持？

### HTTPS 加密

使用 HTTPS 协议加密传输，防止数据被窃取和篡改。

### SRI 子资源完整性

验证引入的资源是否被篡改。

### CSP 内容安全策略

限制资源加载来源。

## 21. 前端安全自测清单

### XSS 防护

- [ ] 对用户输入进行转义和过滤
- [ ] 使用 CSP 限制脚本执行
- [ ] 避免使用 innerHTML、eval 等危险函数
- [ ] 对第三方库进行安全检查

### CSRF 防护

- [ ] 使用 CSRF Token
- [ ] 设置 SameSite Cookie
- [ ] 验证 Referer 头
- [ ] 敏感操作需要二次验证

### Cookie 安全

- [ ] 设置 HttpOnly 属性
- [ ] 设置 Secure 属性（HTTPS）
- [ ] 设置 SameSite 属性
- [ ] 合理设置过期时间

### 数据传输

- [ ] 使用 HTTPS 加密传输
- [ ] 敏感数据加密存储
- [ ] API 接口进行鉴权

### 依赖安全

- [ ] 定期更新依赖包
- [ ] 使用 npm audit 检查漏洞
- [ ] 使用 SRI 验证 CDN 资源

### 其他

- [ ] 设置合适的 CORS 策略
- [ ] 防止点击劫持（X-Frame-Options）
- [ ] 输入验证和输出编码
- [ ] 错误信息不暴露敏感信息
