# 运行时与编译器：VNode/Diff 与编译优化

## 渲染管线
- template → 编译器（AST→IR→代码）→ render 函数 → VNode → patch

## Diff 策略
- 同层对比、key 的作用、双端 Diff

## 编译优化
- 静态提升、Patch Flag、Block Tree

## 性能建议
- 稳定 key、避免大量动态结构、利用 v-memo/v-once