# 前端工程化问答：pre-commit 钩子、bootstet-fe-lint 与 workspace 协议

本文记录本仓库在 pre-commit 钩子、前端代码扫描 CLI（bootstet-fe-lint）以及 monorepo 依赖管理（workspace 协议）方面的排查与优化结论，便于后续复用与维护。

## 背景
- 项目使用 Husky 管理 Git 钩子，包含 pre-commit 与 commit-msg。
- 本地有自研 CLI：bootstet-fe-lint，含子命令：scan、commit-file-scan、commit-msg-scan。
- monorepo 结构（packages/*），需要在根包依赖本地子包。

## 问题表现
- 早期 pre-commit 使用 `scan` 子命令，出现“有错误也提示通过”的现象（未阻止提交）。
- 更换为 `commit-file-scan` 后，曾出现钩子未运行或绕过检查；手动模拟时出现 126 错误（cannot execute binary file）。
- 使用 `pnpm exec` 调用 CLI 时，受本地 Node.js 版本与 pnpm 版本约束影响，命令失败并导致钩子逻辑被跳过。

## 根因分析
1. scan 子命令
   - `scan` 用于全量项目反馈，虽然内部有错误统计，但默认不显式 `process.exit(1)`，因此 pre-commit 钩子不会因错误而失败。
2. commit-file-scan 子命令
   - 专为 pre-commit 设计，基于“已暂存文件（staged files）”扫描。
   - 若存在错误，或在 `--strict` 启用时出现警告，会设置非零退出码，阻止提交。
3. Husky 执行环境与脚本
   - Husky 的 `_ /husky.sh` 以 `sh` 运行，错误调用或不当模拟可能出现 126（不能执行二进制文件）。
4. pnpm/Node 版本不兼容
   - 本机 Node 较旧（如 v14），与当前 pnpm/依赖的 Node 要求（≥ v18）不一致，`pnpm exec` 调用失败，导致钩子被绕过。

## 解决方案与变更
1. 将 pre-commit 调用改为 `npx --no-install`
   - 避免受本地 pnpm/Node 不兼容影响。
   - 采用：`npx --no-install bootstet-fe-lint commit-file-scan --strict`。
2. 修正 `.husky/pre-commit` 脚本格式
   - 保持 shebang 在首行：`#!/bin/sh`。
   - `husky.sh` 初始化后再 `set -e`，确保出错即中断。
3. monorepo 依赖指向本地包
   - 将根包的 `bootstet-fe-lint` 依赖改为 `link:./packages/bootstet-fe-lint`（已完成）。
   - 或使用 workspace 协议：`workspace:*`（需工作区开启）。

## 目前行为
- pre-commit 钩子在有“已暂存文件”的情况下运行 `commit-file-scan`：
  - 有错误（或 strict 下有警告）时：返回非零退出码，阻止提交。
  - 无问题时：输出通过提示，允许提交。
- commit-msg 钩子继续使用 commitlint，若提交信息不符合规范仍会阻止提交。

## 使用与测试步骤
1. 制造一个 ESLint 错误（如未使用的变量）。
2. 暂存该文件：`git add <file>`。
3. 尝试提交：`git commit -m "feat: test pre-commit"`。
4. 预期：pre-commit 阻止提交并提示错误位置；修复后重新暂存再提交即可通过。

> 注意：commit-file-scan 只检查已暂存（staged）的文件，未暂存的更改不会被扫描。

## strict 模式说明
- `--strict` 开启后：警告也会导致非零退出码，阻止提交。
- 若希望仅阻止错误，不阻止警告，可移除 `--strict`。

## workspace 协议简述（与 link 的对比）
- workspace 协议用于在 monorepo 中引用工作区内的本地包。
  - `workspace:*`：始终指向本地包，不进行版本校验。
  - `workspace:^1.0.0`：要求本地包版本满足约束，不满足则安装失败。
- 与 `link:` 的区别：
  - `link:` 直接软链接到路径，不参与版本解析与工作区图谱；link:./packages/bootstet-fe-lint
  - `workspace:` 更适合 monorepo，参与依赖解析与版本一致性校验（更推荐）。

## 常见排查清单
- Git 钩子路径：`git config core.hooksPath` 应为 `.husky`。
- 文件权限：`.husky/pre-commit` 需可执行（例如 `-rwxr-xr-x`）。
- Husky 脚本：首行 `#!/bin/sh`，并正确引入 `./_ /husky.sh`。
- Node 版本：建议 ≥ v18，避免因包管理器/依赖要求导致执行失败。
- CLI 可用性：本地包需完成构建（bin 指向的入口文件存在）。
- 调用方式：优先使用 `npx --no-install bootstet-fe-lint commit-file-scan`，减少环境差异。
- 暂存范围：确保需要检查的文件已 `git add`。
- 命令选择：
  - pre-commit：`commit-file-scan`（针对 staged 文件，有退出码）。
  - 项目全量反馈：`scan`（不建议用在 pre-commit，默认不退出）。

## 可选后续优化
- 修改 `scan` 子命令：在 `errorCount > 0` 时显式 `process.exit(1)`，便于在 CI 中直接失败。
- 全面采用 workspace 协议，提升依赖一致性与安装语义。
- 升级 Node 版本，恢复使用 `pnpm exec` 调用方式，统一工具链。
- 在大型仓库启用缓存与并行，降低 pre-commit 执行耗时。

## 参考的 pre-commit 模板（当前建议）
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
set -e

npx --no-install bootstet-fe-lint commit-file-scan --strict
echo "pre-commit: commit-file-scan passed"
```

如需调整 strict 行为或扩展检查范围，可在此基础上增删参数。