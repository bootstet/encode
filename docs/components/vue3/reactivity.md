# Vue3 响应式原理（Proxy/Effect/依赖收集）

> 30秒提纲：响应式基于 Proxy 拦截 get/set，`effect` 在 get 时通过 `track` 收集依赖，在 set 时通过 `trigger` 触发副作用；依赖桶数据结构为 `WeakMap -> Map -> Set`。`scheduler` 支持去抖/合并更新；`ref` 负责原始值，`reactive` 负责对象，`computed` 基于惰性 `effect` 与脏标记。

## 1. 核心概念
- reactive/ref/shallowReactive/shallowRef
- effect/track/trigger，依赖桶（WeakMap → Map → Set）
- scheduler、stop、onStop
- computed 的惰性求值与脏标记

## 2. 依赖桶数据结构
```ts
interface DepMap extends Map<PropertyKey, Set<ReactiveEffect>> {}
const bucket: WeakMap<object, DepMap> = new WeakMap()
```
- WeakMap 按 target 分桶，避免内存泄漏
- 每个 key 对应一个 Set /effect>，去重触发

## 3. track / trigger 伪代码
```ts
let activeEffect: ReactiveEffect | null = null
export function effect(fn: Function, options: { scheduler?: Function } = {}) {
  const runner: any = () => {
    try { activeEffect = runner; cleanup(runner); return fn() } finally { activeEffect = null }
  }
  runner.deps = []
  runner.scheduler = options.scheduler
  runner()
  return runner
}

function track(target: object, key: PropertyKey) {
  if (!activeEffect) return
  let depMap = bucket.get(target)
  if (!depMap) bucket.set(target, (depMap = new Map()))
  let dep = depMap.get(key)
  if (!dep) depMap.set(key, (dep = new Set()))
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

function trigger(target: object, key: PropertyKey) {
  const depMap = bucket.get(target); if (!depMap) return
  const effects = depMap.get(key); if (!effects) return
  effects.forEach((e: any) => (e.scheduler ? e.scheduler(e) : e()))
}

function cleanup(runner: any) { runner.deps.forEach((dep: Set<any>) => dep.delete(runner)); runner.deps.length = 0 }
```

## 4. reactive 与 ref 的实现要点
- reactive：对象 Proxy，拦截 get/set → track/trigger
- ref：包装原始值 `{ value }`，对 `.value` 做 track/trigger；在模板中会被“自动解包”

## 5. computed 实现（惰性 + 脏标记）
```ts
function computed(getter: () => any){
  let dirty = true, value: any
  const runner = effect(getter, { scheduler(){ dirty = true } })
  return {
    get value(){ if (dirty){ value = runner(); dirty = false } return value }
  }
}
```

## 6. scheduler 与批量更新
- 利用 `scheduler` 将多次触发合并到微任务队列，避免重复执行
```ts
const queue = new Set<Function>()
const flush = Promise.resolve()
function queueJob(job: Function){ queue.add(job); flush.then(()=>{ queue.forEach(j=>j()); queue.clear() }) }
```

## 7. 边界与常见坑
- 解构导致丢失响应性：使用 `toRefs/storeToRefs`
- `markRaw/toRaw`：避免/获取代理
- `shallowReactive/shallowRef`：仅一层
- Map/Set 的触发类型：`set`/`add`/`delete` 需要自定义依赖键
- 数组 length/索引写入的特殊触发

## 8. watch 与 watchEffect 的关系
- `watchEffect` 立即收集依赖；`watch` 基于 getter 对比新旧值
- 清理函数、flush(post/pre/sync) 与竞态取消

## 9. 性能建议 Checklist
- 合理切分响应式对象，避免大对象深层响应化
- 使用 `shallowRef` + 手动 `.value = {...}` 合并替换，降低深层依赖
- 频繁变更使用 `scheduler` 合并
- 稳定 key，避免重复挂载

## 10. 高频问法（提纲）
1) Vue3 如何进行依赖收集？为什么用 WeakMap？
2) computed 为何是惰性的？如何基于 effect 实现？
3) 为什么解构会丢响应性？如何修复？
4) watch 与 watchEffect 区别与清理时机？
5) ref 与 reactive 在模板中的自动解包规则？
