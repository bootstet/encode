# Web Vitals 与前端性能治理

> 30秒提纲：用 PerformanceObserver 采集 LCP/CLS/INP/TTI，找出“最大内容元素、布局位移、交互延迟”的瓶颈；优化遵循“关键路径最小化 + 资源矩阵（图片/字体）+ 代码切割 + 渲染占位 + 缓存与预取”，上线后用阈值告警与对照实验验证。

## 1. 核心指标与阈值（良好/需改进/较差）
- LCP（最大内容绘制）：≤2.5s / 2.5–4s / >4s
- CLS（累计布局偏移）：≤0.1 / 0.1–0.25 / >0.25
- INP（交互反应）：≤200ms / 200–500ms / >500ms（取代 FID）
- TTI（可交互）：越小越好（辅助参考）

## 2. 采集与上报
```js
// LCP
new PerformanceObserver((po)=>{
  po.getEntries().forEach(e=>{ report('LCP', e.startTime) })
}).observe({ type:'largest-contentful-paint', buffered:true })

// CLS
let cls = 0
new PerformanceObserver((po)=>{
  po.getEntries().forEach(e=>{ if(!e.hadRecentInput) cls += e.value })
  report('CLS', cls)
}).observe({ type:'layout-shift', buffered:true })

// INP
new PerformanceObserver((po)=>{
  po.getEntries().forEach(e=>{ report('INP', e.interactionId ? e.duration : e.processingEnd - e.startTime) })
}).observe({ type:'event', buffered:true, durationThreshold: 16 })
```
- 上报策略：首包后空闲上报；采样率控制；携带版本/页面/设备标签

## 3. 优化策略矩阵
- 关键路径：移除/延后非关键脚本，分离同步阻塞；HTTP/2 多路复用
- 代码：路由/组件懒加载、动态 import 命名分块、Tree-shaking、SSR/SSG
- 图片：WebP/AVIF、自适应尺寸、Lazy/Decode async、占位图(LQIP)
- 字体：子集化、可变字体、font-display: swap、预加载
- 渲染：骨架屏、优先渲染最大内容元素、减少重排（稳定尺寸/避免 FOIT）
- 缓存：强/协商缓存、Service Worker 预缓存、Prefetch/Preconnect

## 4. 验证与回归
- 实验：前后对比/灰度 A/B；采样≥1% 用户
- 阈值告警：LCP>2.5s、CLS>0.1、INP>200ms 触发
- SourceMap 关联堆栈与版本，快速定位变更影响

## 5. 实战 Checklist（落地即用）
- [ ] 首页最大内容元素图片改 WebP + 固定尺寸 + Preload
- [ ] 路由级代码分割；非首屏组件 defineAsyncComponent
- [ ] 字体子集化（subset）并 preload；font-display: swap
- [ ] 图片懒加载 + decoding="async"
- [ ] 开启 SW 预缓存关键资源
- [ ] 监控平台新增 LCP/CLS/INP 趋势看板
