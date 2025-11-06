# Monorepo 实践（pnpm + Turbo + changesets）

## 价值
- 复用、依赖收敛、统一发布

## 目录结构
- packages/*、apps/*、shared/*

## 核心配置
- pnpm-workspace.yaml、turbo.json、.changeset/

## 流程
- 开发（本地联调）→ PR CI（lint/test/build）→ release（语义化版本）

## 风险与治理
- 包间耦合、权限、版本膨胀 → 通过 ownership 与 release 计划控制
