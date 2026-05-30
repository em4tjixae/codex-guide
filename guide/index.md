# 📦 安装总览

在开始安装 Claude Code / Codex 之前，先了解一下整体流程和准备工作。

---

## 🎯 安装流程概览

```mermaid
graph LR
    A[检查系统环境] --> B[安装 Node.js]
    B --> C[配置 npm 镜像源]
    C --> D[安装 Claude Code]
    D --> E[配置 API 端点]
    E --> F[验证安装]
    F --> G[✅ 开始使用]
```

---

## ✅ 前置条件

开始之前，请确认：

| 条件 | 要求 |
|------|------|
| **操作系统** | Windows 10/11、macOS 11+、Linux（主流发行版） |
| **网络** | 可正常访问互联网（不需要翻墙） |
| **权限** | 电脑管理员权限（安装软件需要） |
| **磁盘空间** | 至少 1GB 可用空间 |

---

## 🗺️ 选择你的操作系统

<div class="steps">
  <div class="step">
    <h4>🪟 <a href="/guide/windows">Windows 安装</a></h4>
    <p>适用于 Windows 10 / 11，含 WSL 方案</p>
  </div>
  <div class="step">
    <h4>🍎 <a href="/guide/mac">macOS 安装</a></h4>
    <p>适用于 macOS 11+，含 Homebrew 方案</p>
  </div>
  <div class="step">
    <h4>🐧 <a href="/guide/linux">Linux 安装</a></h4>
    <p>适用于 Ubuntu / Debian / CentOS 等</p>
  </div>
  <div class="step">
    <h4>🌐 <a href="/guide/network">网络配置专题</a></h4>
    <p>镜像源、代理、API 端点等网络相关配置</p>
  </div>
</div>

---

## 🛠️ 核心概念速览

### Claude Code 是什么？

Claude Code 是 Anthropic 推出的**终端 AI 编程助手**，它可以直接在你的项目目录中：
- 🏗️ 自动搭建项目结构
- 🐛 理解、定位和修复 Bug
- 🔄 大规模重构代码
- 📝 生成测试用例
- 📖 解释代码逻辑

### Codex 是什么？

OpenAI Codex CLI 是 OpenAI 推出的终端编程助手，功能和 Claude Code 类似，基于 GPT 模型。

### 为什么国内安装容易出问题？

Claude Code 和 Codex 默认从 **npm 官方源** 下载，npm 又需要访问 **registry.npmjs.org**，以及 GitHub 等境外服务。在国内直接访问这些服务时：

- ❌ npm 下载速度慢甚至超时
- ❌ GitHub raw 资源无法访问
- ❌ API 请求被阻断或限速

💡 **解决方法**：配置国内 npm 镜像源 + 设置 API 代理端点，我们会在各平台教程中详细说明。

---

## 🚨 如果自己搞不定？

别浪费时间，直接[联系我们](/services/)，15 分钟远程帮你搞定。
