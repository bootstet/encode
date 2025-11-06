# 前端错误监控与 SourceMap（Sentry）

> 30秒提纲：以“版本”为核心串起上报→定位→回滚。构建时生成并上传 SourceMap，运行时初始化 SDK（环境/版本/用户），设置采样与分级，接入面包屑与自定义标签，错误到来后能够1分钟内定位到具体文件与行号，并量化影响面。

## 1. 初始化与关键配置
```ts
import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn: 'https://<key>@sentry.io/<project>',
  environment: process.env.NODE_ENV,
  release: `${APP_NAME}@${APP_VERSION}`,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.1, // 性能追踪采样
  replaysSessionSampleRate: 0.0,
  beforeSend(event){
    // 脱敏/过滤
    return event
  }
})
Sentry.setUser({ id: uid, ip_address: '{{auto}}' })
Sentry.setTags({ app: APP_NAME })
```

## 2. SourceMap 生成与上传（CI）
- 构建：生成 `hidden-source-map` 或独立 `.sourcemap` 目录
- 上传：与 release 绑定，上传后页面禁止公开映射
```yaml
- name: Build
  run: npm run build
- name: Upload sourcemaps
  run: |
    export VERSION=$(node -p "require('./package.json').version")
    npx sentry-cli releases new $VERSION
    npx sentry-cli releases files $VERSION upload-sourcemaps ./.sourcemap --rewrite --url-prefix '~/'
    npx sentry-cli releases finalize $VERSION
```

## 3. 错误分级与采样
- 采样：`sampleRate`/`tracesSampleRate`；区分生产与灰度
- 分级：致命/高/中/低，结合影响范围（用户量/错误率）
- 面包屑：路由/接口/资源加载/自定义操作

## 4. 快速定位流程
1) 查看 Issue → 版本/环境/平台维度
2) 打开堆栈：确认是否已反混淆（需要 SourceMap）
3) 关联最近变更 PR/部署
4) 评估影响 → 决策回滚/修复

## 5. 最佳实践 Checklist
- [ ] 生产环境禁用 inline SourceMap，仅上传到 Sentry
- [ ] 为每次部署生成唯一 release，并写入页面（window.__APP_VERSION__）
- [ ] 统一错误上报入口，添加用户/会话/路由标签
- [ ] 采样与脱敏策略按环境区分
- [ ] 搭建“错误趋势/Top 崩溃/版本对比”看板
