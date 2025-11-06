# Monorepo 实践（pnpm + Turbo + changesets）

> 30秒提纲：pnpm 管理工作区，Turbo 负责任务编排与缓存，changesets 做语义化发布。通过 workspace 协议和增量缓存，能在多包场景下显著提效并统一发布流程。

## 1. 目录结构
```
root
├─ apps/          # 应用
├─ packages/      # 组件/工具包
├─ shared/        # 共享代码
├─ turbo.json
├─ pnpm-workspace.yaml
└─ .changeset/
```

## 2. 核心配置
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'shared/*'
```
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "cache": true
    },
    "lint": { "outputs": [] },
    "test": { "dependsOn": ["^build"], "outputs": ["coverage/**"] }
  }
}
```

## 3. 本地开发与 workspace 协议
```json
// packages/ui/package.json
{
  "name": "@org/ui",
  "version": "0.1.0",
  "main": "dist/index.js"
}
// apps/web/package.json 中引用内部包
{
  "dependencies": { "@org/ui": "workspace:*" }
}
```
- `workspace:*` 保持本地联调；发布后可锁定到具体版本

## 4. 发布（changesets）
```bash
pnpm add -D @changesets/cli
pnpm changeset init
pnpm changeset        # 交互式选择包与变更类型
pnpm changeset version
pnpm -r publish --access public
```
- CI 中按 `changeset` 生成的版本与 changelog 发布

## 5. CI 示例（GitHub Actions 片段）
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with: { version: 8 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo run lint build --cache-dir=.turbo
```

## 6. 最佳实践
- 规范 task 名称：`lint/test/build/release`
- 约束跨包依赖方向与所有者（CODEOWNERS）
- 严格 PR 检查：变更范围仅触发相关包的 pipeline
- 生成型包忽略入仓：编译产物进 `.gitignore`

## 7. 风险与治理
- 包间耦合、权限、版本膨胀 → 通过 Ownership、Review 与 release 周期管理
- 大仓性能 → 启用 Turbo 远程缓存（团队共享构建结果）
