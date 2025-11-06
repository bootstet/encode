# 从 Vue2 迁移到 Vue3

## 迁移路径
- API 变更与替代：生命周期、slot、v-model
- 全局 API 调整：Vue.use → app.use、全局注册 → app.component

## 代码组织
- Options → Composition：分离逻辑到 hooks

## 常见兼容
- 第三方库适配、defineComponent、宏 tsconfig

## 工具
- @vue/compat、迁移构建警告、逐步切换