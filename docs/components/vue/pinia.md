# Pinia 实战与最佳实践

## 为什么从 Vuex 迁移到 Pinia
- 组合式 API 友好、类型推导更好
- 模块更轻、无命名空间心智负担

## 快速上手
```bash
pnpm add pinia
```
```ts
import { createPinia } from 'pinia'
app.use(createPinia())
```

## 定义与使用
```ts
import { defineStore } from 'pinia'
export const useUser = defineStore('user', {
  state: () => ({ token: '', info: null as any }),
  getters: { isLogin: (s) => !!s.token },
  actions: { setToken(t: string){ this.token = t } }
})
```

## 持久化/插件
- 使用 pinia-plugin-persistedstate
- 自定义插件：埋点/调试/快照

## 与 Vuex 对比与迁移建议
- map helpers → 组合式 hooks
- namespace → 多 store 组合

## 常见坑
- SSR 中的 store 隔离
- 直接解构导致失去响应性：使用 storeToRefs()

## 参考
- 官方文档、社区最佳实践链接