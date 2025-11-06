# Pinia 实战与最佳实践

> 30秒提纲：Pinia 是 Vue 官方推荐的状态库，类型友好、无命名空间负担；支持 Options/Setup 两种写法、插件体系与持久化；在 SSR 中需要“每次请求创建独立 pinia 实例”。

## 1. 安装与初始化
```bash
pnpm add pinia
```
```ts
// main.ts
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

## 2. 定义 Store（Options 写法）
```ts
import { defineStore } from 'pinia'
export const useUser = defineStore('user', {
  state: () => ({ token: '', info: null as { id?: number; name?: string } | null }),
  getters: {
    isLogin: (s) => !!s.token,
  },
  actions: {
    setToken(t: string){ this.token = t },
    async fetchInfo(){ /* await api */ this.info = { id: 1, name: 'tom' } }
  }
})
```

## 3. 定义 Store（Setup 写法）
```ts
export const useCart = defineStore('cart', () => {
  const items = ref<{ id:number; count:number }[]>([])
  const total = computed(()=> items.value.reduce((s,i)=> s + i.count, 0))
  function add(id:number){ items.value.push({ id, count:1 }) }
  return { items, total, add }
})
```

## 4. 在组件中使用与解构
```ts
const user = useUser()
const { token, info, isLogin } = storeToRefs(user) // 避免解构丢响应性
user.setToken('abc')
```

## 5. 持久化与订阅
```ts
// 安装
pnpm add pinia-plugin-persistedstate
// main.ts
import persist from 'pinia-plugin-persistedstate'
createPinia().use(persist)
// store
export const useUser = defineStore('user', { /* ... */ , persist: { paths: ['token'] } })

// 订阅变化
const unsub = useUser().$subscribe((mutation, state)=>{ console.log(mutation.type, state) })
```

## 6. Patch、重置与 HMR
```ts
const user = useUser()
user.$patch({ token: 'xxx' })
user.$reset()
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
```

## 7. SSR 注意事项（Nuxt/Vite-SSR）
- 每次请求必须创建独立 pinia 实例，避免跨请求污染：
```ts
export function createApp(){
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  return { app, pinia }
}
```
- 在服务端读取 store 后，需要通过 `pinia.state.value` 注水到客户端再 hydrate。

## 8. 迁移指引（Vuex → Pinia）
- 命名空间 → 多 store；`mapState/Actions` → 组合式调用/`storeToRefs`
- mutation 合并到 actions；严格模式→devtools/订阅

## 9. Checklist
- [ ] 统一使用 Setup 写法 + `storeToRefs`
- [ ] 敏感字段仅短期持久化（或不持久化）
- [ ] SSR 中每请求实例化 pinia，并完成“注水/脱水”
- [ ] 重要状态变化接入埋点 `$subscribe`
