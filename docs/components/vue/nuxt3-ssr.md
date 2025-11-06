# Nuxt3 与 SSR/SSG/ISR 实战

## 渲染模式
- SSR：每次请求服务端渲染
- SSG：构建时静态化
- ISR：按需再生（定时/触发）

## 数据获取
- useAsyncData / useFetch，server routes（Nitro）
- 缓存策略：etag、swr、CDN 边缘缓存

## 性能与 SEO
- 关键路径裁剪、图片优化、预取

## 部署
- Node 服务器、Edge（Vercel/Cloudflare）

## 常见问题
- 跨端环境变量、服务端仅模块（node:fs）

## 最小示例与目录结构
- pages、server/api、plugins、nitro preset
