# 🪟 Windows 安装 Claude Code

> 适用系统：Windows 10 / Windows 11
> 预计时间：15 分钟

---

## 📋 前置条件

1. **Windows 10（版本 19044+）或 Windows 11**
2. **管理员权限**（安装软件需要）
3. **PowerShell 5.1+**（系统自带即可）
4. **稳定的网络连接**

---

## 步骤 1：检查 PowerShell 版本

打开 PowerShell（右键开始菜单 → Windows PowerShell）：

```powershell
$PSVersionTable.PSVersion
```

如果是 5.1 或更高版本，继续下一步。

---

## 步骤 2：安装 Node.js

### 方式一：官网安装包（推荐）

1. 打开 [Node.js 中文官网](https://nodejs.cn/) 或 [nodejs.org](https://nodejs.org/)
2. 下载 **LTS 版本**（长期支持版，如 20.x 或 22.x）
3. 运行安装程序，**全部默认选项下一步**
4. **关键步骤**：在 `Tools for Native Modules` 页面，勾选 ✅「Automatically install the necessary tools」

安装完成后，**重新打开 PowerShell**，验证：

```powershell
node --version
# 应显示：v20.x.x 或 v22.x.x

npm --version
# 应显示：10.x.x 或更新
```

### 方式二：nvm-windows（多版本管理）

如果你需要管理多个 Node.js 版本：

1. 下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. 安装后重启 PowerShell
3. 安装并使用 Node.js LTS：

```powershell
nvm install 20
nvm use 20
```

---

## 步骤 3：配置 npm 国内镜像源 ⭐

**这是最关键的一步！** 不配置的话 npm 下载大概率超时。

```powershell
# 设置为淘宝镜像源（国内速度快）
npm config set registry https://registry.npmmirror.com

# 验证设置
npm config get registry
# 应显示：https://registry.npmmirror.com/
```

> 💡 如果后续遇到 `certificate` 相关报错，执行：
> ```powershell
> npm config set strict-ssl false
> ```

---

## 步骤 4：安装 Claude Code

```powershell
npm install -g @anthropic-ai/claude-code
```

等待下载完成（一般 1-2 分钟）。

如果报错，检查：
- npm 镜像源是否正确配置（步骤 3）
- 网络是否正常
- 是否以**管理员身份**运行 PowerShell

---

## 步骤 5：配置 API 端点 ⭐

安装完成后，需要配置 API 访问。在 PowerShell 中执行：

```powershell
# 配置 API 端点（根据你使用的服务商调整）
[Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://api.anthropic.com', 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'your-api-key', 'User')

# 重新打开 PowerShell 使其生效
# 或使用以下命令立即生效（仅当前窗口）：
$env:ANTHROPIC_BASE_URL = 'https://api.anthropic.com'
$env:ANTHROPIC_AUTH_TOKEN = 'your-api-key'
```

> ⚠️ 请将 `your-api-key` 替换为你的真实 API Key

---

## 步骤 6：验证安装

```powershell
# 重新打开 PowerShell 后执行
claude --version

# 进入一个项目目录试试
cd your-project
claude
```

如果看到 Claude Code 的欢迎界面，说明安装成功！🎉

---

## 🔧 Windows 特别注意事项

### 编码问题
Windows 终端默认使用 GBK 编码，可能导致乱码。建议：

```powershell
# 在 PowerShell 配置文件中添加
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```

### 安全软件拦截
360、腾讯管家等可能拦截 Claude Code 的网络请求。如果遇到网络错误：
1. 临时关闭安全软件测试
2. 或将 Claude Code 添加到信任列表

### WSL 替代方案
如果你已安装 WSL（Windows Subsystem for Linux），建议参考 [Linux 安装教程](/guide/linux)，在 WSL 内安装。

---

## ❌ 如果卡住了？

1. 先查 [常见报错速查表](/advanced/common-errors)
2. 再查 [网络配置专题](/guide/network)
3. 还是不行？[加微信远程协助](/services/)

---

> **💡 节省时间的建议**：与其自己折腾半天，不如直接联系我们远程安装，15 分钟搞定。
