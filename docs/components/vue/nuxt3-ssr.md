# Nuxt3 与 SSR/SSG/ISR 实战

> 30秒提纲：Nuxt3 基于 Nitro 实现通用渲染，数据获取统一在 `useAsyncData/useFetch`，结合 `routeRules` 与 `isr`/`swr` 做缓存与再生；部署到 Node 或 Edge（Vercel/Cloudflare）都开箱即用。

## 1. 渲染模式与选择
- SSR：实时数据、良好 SEO；成本较高
- SSG：构建时静态生成，极致性能，但数据需再验证
- ISR：增量再生，适合大规模内容站点

## 2. 数据获取与缓存
```ts
// pages/index.vue
const { data, pending, error } = await useAsyncData('home', () => $fetch('/api/home'), {
  server: true, // 首次 SSR 获取
  lazy: false,  // 等待数据再渲染
})
```
```ts
// server/api/home.get.ts
export default defineEventHandler(async (event) => {
  // 读缓存或请求后端
  return { msg: 'hello nuxt3' }
})
```
- `useFetch` 是 `useAsyncData + $fetch` 语法糖
- 缓存：在 server route 使用 `cachedEventHandler`/`defineCachedFunction`，或利用 `routeRules` 的 `isr/swr`

## 3. 路由规则与再生
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { swr: 60 },          // 60s 内命中缓存
    '/blog/**': { isr: 300 },  // 静态再生
    '/admin/**': { ssr: true },
  },
})
```

## 4. 资源与性能
- 图片：`@nuxt/image` 自适应/懒加载
- 关键脚本懒加载、组件按需；服务器端仅模块放到 `server/` 目录
- 预取与预加载：`useHead` 注入 `<link rel="preload|prefetch">`

## 5. 环境变量与安全
- 私密变量放 `.env`，通过 `NITRO_*`/`runtimeConfig` 注入；区分 `public` 与 `private`

## 6. 部署
- Node 服务器：`pnpm build && node .output/server/index.mjs`
- Vercel/Cloudflare：`pnpm build` 后直接部署 `.output`（Nitro 适配）

## 7. SSR 与 Pinia（状态注水）
```ts
// server-entry 中创建 pinia 并注水
const pinia = createPinia()
app.use(pinia)
// 服务端：pinia.state.value 赋初值
// 客户端：从 window.__PINIA__ 取回并 replace
```

## 8. 常见坑
- 仅服务端可用模块（fs、path）不要在客户端引用
- `process.env` 需改为 `runtimeConfig`
- 跨域：优先通过 server routes 代理

## 9. Checklist
- [ ] 为页面设置 `routeRules` 的 `swr/isr`
- [ ] 服务端 API 使用 `cachedEventHandler`
- [ ] 图片组件与懒加载
- [ ] SSR 注水/脱水完整链路
