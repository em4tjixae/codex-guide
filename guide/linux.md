# 🐧 Linux 安装 Claude Code

> 适用系统：Ubuntu 20.04+ / Debian 11+ / CentOS 7+ / Fedora 36+
> 预计时间：15 分钟

---

## 📋 前置条件

1. **Linux 主流发行版**
2. **sudo 权限**
3. **终端（任何 terminal emulator）**
4. **稳定的网络连接**

---

## 步骤 1：更新系统包管理器

```bash
# Ubuntu / Debian
sudo apt update && sudo apt upgrade -y

# CentOS / RHEL
sudo yum update -y

# Fedora
sudo dnf update -y
```

---

## 步骤 2：安装 Node.js

### 方式一：NodeSource 官方源（推荐）

**Ubuntu / Debian：**

```bash
# 安装 Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

> ⚠️ 如果 `deb.nodesource.com` 访问慢或超时，使用 nvm 方式（见下方）。

**CentOS / RHEL / Fedora：**

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs  # CentOS/RHEL
# 或
sudo dnf install -y nodejs  # Fedora
```

### 方式二：nvm（国内用户推荐）⭐

nvm 方式不依赖境外的 nodesource 服务器，更稳定：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# ⚠️ 如果上述命令下载失败，使用 Gitee 镜像：
# curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash

# 重启终端或执行
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 安装 Node.js LTS
nvm install 20
nvm use 20
nvm alias default 20
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

---

## 步骤 4：安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

如果报 `EACCES` 权限错误：

```bash
# 方法 1：使用 nvm（推荐，一劳永逸）
# nvm 安装的 Node.js 在用户目录，不需要 sudo

# 方法 2：修改 npm 全局安装路径
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @anthropic-ai/claude-code
```

---

## 步骤 5：配置 API 端点 ⭐

编辑 shell 配置文件：

```bash
# 根据你使用的 shell 选择对应文件
# Bash 用户：~/.bashrc
# Zsh 用户：~/.zshrc

# 使用 nano 编辑
nano ~/.bashrc

# 添加以下内容（替换 your-api-key）
export ANTHROPIC_BASE_URL="https://api.anthropic.com"
export ANTHROPIC_AUTH_TOKEN="your-api-key"
```

保存后使其生效：

```bash
source ~/.bashrc
```

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

## 🔧 Linux 特别注意事项

### 缺少依赖库

某些最小化安装的 Linux 系统可能缺少必要的库：

```bash
# Ubuntu/Debian
sudo apt install -y build-essential python3 git curl

# CentOS/RHEL
sudo yum groupinstall -y "Development Tools"
sudo yum install -y python3 git curl

# Fedora
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y python3 git curl
```

### WSL 用户

如果你在 Windows 上使用 WSL（Windows Subsystem for Linux），本教程同样适用。推荐使用 **WSL2 + Ubuntu** 组合。

### 使用代理

如果你有代理：

```bash
# 在 ~/.bashrc 中添加
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
