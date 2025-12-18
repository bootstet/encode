<!--
 * @Author: bootstet@163.com bootstet@163.com
 * @Date: 2025-12-17 15:06:52
 * @LastEditors: bootstet bootstet@163.com
 * @LastEditTime: 2025-12-18 22:57:03
 * @FilePath: /encode/docs/components/qAa/PROXY.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 本项目代理（Proxy）配置说明

## 背景
我的机器上为了访问个人 GitHub 项目，配置了全局代理（例如 `127.0.0.1:7890`）。
但公司项目（本仓库）访问公司内网 GitLab/接口时不需要代理，甚至会因为走代理导致访问失败。

目标：
- 个人 GitHub 项目继续使用全局代理
- **公司项目（本仓库）不走代理**（仅对本项目生效）

## 影响范围说明
这里的“代理”分两类：

1. **开发服务器反向代理（devServer proxy）**
   - 例如 `src/manifest.json` 里的 `h5.devServer.proxy`
   - 作用：本地开发时把 `/api` 等请求转发到后端
   - 特点：仅影响本地 dev server 的请求转发，不影响 `git` / `npm install` 的网络访问

2. **系统/工具网络代理（影响 git、npm）**
   - 例如 `git config --global http.proxy`、`npm config set proxy ...`
   - 作用：影响 `git clone/pull`、`npm install` 下载依赖的网络路径
   - 本次要解决的就是这类代理：**全局保留，但对本仓库禁用**

## 本仓库已采用的解决方案（推荐）
### 1) 对本仓库禁用 git 代理（覆盖全局）
在本仓库目录执行：

```sh
git config --local http.proxy ""
git config --local https.proxy ""
```

验证：

```sh
git config --local --get http.proxy
git config --local --get https.proxy
```

说明：
- `--local` 只会写入本仓库的 `.git/config`
- 不会影响其他仓库（例如你的 GitHub 仓库仍可继续走全局代理）

### 2) 对本项目禁用 npm 代理（项目级覆盖全局）
在项目根目录创建/维护 `.npmrc`（本仓库已创建）：

```ini
# Project-level npm config (overrides global ~/.npmrc)
proxy=null
https-proxy=null
# Add internal domains that should always bypass proxies
noproxy=localhost,127.0.0.1,*.glzhealth.com,*.glzhealth.tech
```

验证（查看 project 级配置是否生效）：

```sh
npm config get proxy --location=project
npm config get https-proxy --location=project
npm config get noproxy --location=project
```

预期：
- `proxy` / `https-proxy` 输出 `null`
- `noproxy` 输出内网域名列表

## 常用排查命令
### 查看全局 git 代理（不要在公司项目里改全局）

```sh
git config --global --get http.proxy
git config --global --get https.proxy
```

### 查看当前 npm 的代理（可能来自 global/user/project 多个层级）

```sh
npm config get proxy
npm config get https-proxy
npm config get noproxy
```

## 回滚/恢复方式
如果未来不再需要对本仓库禁用代理：

1) 删除本仓库的 git local 覆盖：

```sh
git config --local --unset http.proxy
git config --local --unset https.proxy
```

2) 删除本仓库的项目级 npm 配置文件：
- 删除根目录 `.npmrc` 即可（或把相关项删掉）

## 备注
- 本项目依赖中包含 `git+https://...` 形式的 git 依赖，下载时会受 **git 代理** 影响，因此对本仓库禁用 git 代理是关键步骤之一。
