# 🌐 网络配置专题

> 国内安装 Claude Code / Codex 最大的障碍是网络。本文集中解决网络相关问题。

---

## 📌 为什么网络会有问题？

Claude Code / Codex 安装和使用过程中涉及多个境外服务：

| 环节 | 境外服务 | 国内问题 |
|------|----------|----------|
| npm 下载 | `registry.npmjs.org` | 速度慢、超时 |
| API 请求 | `api.anthropic.com` / `api.openai.com` | 被阻断或限速 |
| GitHub 资源 | `raw.githubusercontent.com` / `github.com` | 间歇性不可访问 |
| Node.js 下载 | `nodejs.org` / `nodesource.com` | 下载速度慢 |

---

## ✅ 解决方案 1：npm 镜像源配置

### 淘宝镜像（推荐）

```bash
# 所有平台通用
npm config set registry https://registry.npmmirror.com
```

### 验证镜像源是否生效

```bash
npm config get registry
# 应显示：https://registry.npmmirror.com/
```

### 仅对特定包使用镜像

```bash
# 使用 --registry 参数
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

---

## ✅ 解决方案 2：GitHub 资源加速

### 方法 A：修改 hosts 文件

如果 `raw.githubusercontent.com` 无法访问：

1. 打开 [IP 查询工具](https://www.ipaddress.com/) 搜索 `raw.githubusercontent.com`
2. 获取能 ping 通的 IP 地址
3. 编辑 hosts 文件：

```bash
# Windows：C:\Windows\System32\drivers\etc\hosts
# Mac/Linux：/etc/hosts

# 添加一行（替换为查询到的 IP）
185.199.108.133 raw.githubusercontent.com
```

### 方法 B：使用镜像站

常用的 GitHub 镜像站（可能随时间变化）：

- `https://ghproxy.com/` — GitHub 文件代理
- `https://mirror.ghproxy.com/` — 备用

使用方式：

```bash
# 原始链接
# https://raw.githubusercontent.com/user/repo/branch/file

# 替换为
# https://mirror.ghproxy.com/https://raw.githubusercontent.com/user/repo/branch/file
```

---

## ✅ 解决方案 3：API 端点配置

### 什么是 API 端点？

Claude Code 需要与 Anthropic 的 API 通信。在国内，以下方案可选：

#### 方案 A：直接使用官方 API（需代理）

```bash
export ANTHROPIC_BASE_URL="https://api.anthropic.com"
export ANTHROPIC_AUTH_TOKEN="sk-ant-xxx"
```

配合代理使用（见下方「代理配置」）。

#### 方案 B：使用中转 API（无代理可用）

市面上有第三方提供 API 中转服务，你只需要配置对应的 `BASE_URL` 即可。具体服务商和配置方式请加微信沟通。

---

## ✅ 解决方案 4：代理配置

如果你已有机场/代理服务（Clash、V2Ray、SSR 等）：

### Windows

```powershell
# 设置代理（替换端口号）
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"

# 持久化设置
[Environment]::SetEnvironmentVariable('HTTP_PROXY', 'http://127.0.0.1:7890', 'User')
[Environment]::SetEnvironmentVariable('HTTPS_PROXY', 'http://127.0.0.1:7890', 'User')
```

### macOS / Linux

```bash
# 在 ~/.zshrc 或 ~/.bashrc 中添加
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"

# 如果不需要代理时取消
unset HTTP_PROXY HTTPS_PROXY
```

> ⚠️ 端口号 `7890` 是 Clash 默认端口，请根据你的代理软件实际端口调整。

---

## ✅ 解决方案 5：完整环境变量配置模板

以下是一个完整的推荐环境变量配置：

### Windows（PowerShell）

```powershell
# 永久设置（替换 API Key）
[Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://api.anthropic.com', 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'your-api-key', 'User')
```

### macOS / Linux

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export ANTHROPIC_BASE_URL="https://api.anthropic.com"
export ANTHROPIC_AUTH_TOKEN="your-api-key"
export NVM_NODEJS_ORG_MIRROR="https://npmmirror.com/mirrors/node"
```

---

## 🧪 诊断：如何排查网络问题

### 1. 测试 npm 连接

```bash
npm ping
# 正常应返回：npm ping OK!
```

### 2. 测试 API 连接

```bash
# 使用 curl 测试（替换为你的 BASE_URL）
curl -v https://api.anthropic.com/
# 能返回内容说明连接正常
```

### 3. 测试 GitHub 连接

```bash
# Windows
ping raw.githubusercontent.com

# Mac/Linux
ping -c 4 raw.githubusercontent.com
```

---

## 📊 常见网络错误对照

| 错误关键词 | 原因 | 解决 |
|-----------|------|------|
| `ETIMEDOUT` | 连接超时 | 配置镜像源/代理 |
| `ECONNREFUSED` | 连接被拒绝 | 检查代理设置 |
| `certificate has expired` | SSL 证书问题 | `npm config set strict-ssl false` |
| `getaddrinfo EAI_AGAIN` | DNS 解析失败 | 检查网络/DNS 设置 |
| `403 Forbidden` | 被服务器拒绝 | 检查 API Key 是否有效 |

---

## ❌ 还是搞不定网络？

网络问题是最复杂的，因为每个人的网络环境不同。如果你按上述步骤操作后仍有问题：

👉 [加微信远程协助](/services/) — 我们帮你排查。

---

> 💡 **提示**：网络配置做完后，建议回头继续对应的操作系统安装教程。
