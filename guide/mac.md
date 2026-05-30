# 🍎 macOS 安装 Claude Code

> 适用系统：macOS 11（Big Sur）或更新版本
> 预计时间：15 分钟

---

## 📋 前置条件

1. **macOS 11+**
2. **管理员权限**（安装软件需要）
3. **终端（Terminal）** — 系统自带，路径：`/Applications/Utilities/Terminal.app`
4. **稳定的网络连接**

---

## 步骤 1：安装 Homebrew（如已安装可跳过）

Homebrew 是 macOS 的包管理器，用来安装 Node.js 等工具。

打开终端（Terminal），粘贴以下命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> ⚠️ 如果下载慢或失败，使用国内镜像安装：
> ```bash
> /bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
> ```

安装完成后，按提示运行以下命令（路径可能因 Mac 芯片不同而异）：

```bash
# Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"

# Apple Silicon (M1/M2/M3/M4)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

验证安装：

```bash
brew --version
```

---

## 步骤 2：安装 Node.js

### 方式一：使用 Homebrew（推荐）

```bash
# 安装 Node.js LTS 版本
brew install node@20

# 添加到 PATH
echo 'export PATH="/usr/local/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 方式二：使用 nvm（多版本管理）

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 如果上述命令下载失败，用 Gitee 镜像：
# curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash

# 重启终端或执行
source ~/.zshrc

# 安装 Node.js LTS
nvm install 20
nvm use 20
```

验证安装：

```bash
node --version
npm --version
```

---

## 步骤 3：配置 npm 国内镜像源 ⭐

```bash
# 设置为淘宝镜像源
npm config set registry https://registry.npmmirror.com

# 验证
npm config get registry
```

同样为 Homebrew 配置国内镜像（可选但推荐）：

```bash
# 设置 Homebrew 镜像
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
```

---

## 步骤 4：安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

等待下载完成。如果报 `EACCES` 权限错误，使用以下方式：

```bash
sudo npm install -g @anthropic-ai/claude-code
```

---

## 步骤 5：配置 API 端点 ⭐

编辑 shell 配置文件（`~/.zshrc`），添加以下内容：

```bash
# 编辑配置文件
nano ~/.zshrc

# 添加以下两行（替换 your-api-key）
export ANTHROPIC_BASE_URL="https://api.anthropic.com"
export ANTHROPIC_AUTH_TOKEN="your-api-key"

# 保存后使其生效
source ~/.zshrc
```

> ⚠️ 请将 `your-api-key` 替换为你的真实 API Key

---

## 步骤 6：验证安装

```bash
# 确认环境变量
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN

# 验证 Claude Code
claude --version

# 进入项目目录测试
cd ~/your-project
claude
```

看到欢迎界面即安装成功！🎉

---

## 🔧 macOS 特别注意事项

### 系统权限
首次运行时，macOS 可能弹出「无法验证开发者」的提示：
1. 打开「系统设置」→「隐私与安全性」
2. 找到相关提示，点击「仍要打开」

### 终端推荐
建议使用 [iTerm2](https://iterm2.com/) 替代系统自带终端，体验更好。

### 如果使用代理
如果你有代理软件（Clash/V2Ray）：

```bash
# 在 ~/.zshrc 中添加
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"
```

---

## ❌ 如果卡住了？

1. 先查 [常见报错速查表](/advanced/common-errors)
2. 再查 [网络配置专题](/guide/network)
3. 还是不行？[加微信远程协助](/services/)

---

> **💡 节省时间的建议**：与其自己折腾半天，不如直接联系我们远程安装，15 分钟搞定。
