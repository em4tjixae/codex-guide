# 🔩 Hooks 与自定义配置

> Hooks 让你在 Claude Code 执行的特定节点插入自定义行为。比如：提交前自动格式化、输出时自动翻译等。

---

## 📌 什么是 Hooks？

Hooks 是 Claude Code 的事件回调机制。当特定事件发生时（如开始生成、结束响应、创建文件等），自动执行你预设的命令。

---

## ⚙️ Hooks 配置位置

Hooks 配置在 `.claude/settings.json` 中：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '文件已修改：$CLAUDE_PROJECT_DIR'"
          }
        ]
      }
    ]
  }
}
```

---

## 🪝 可用的事件

| 事件 | 触发时机 | 常见用途 |
|------|----------|----------|
| `PreToolUse` | 工具执行前 | 拦截危险操作、添加确认 |
| `PostToolUse` | 工具执行后 | 自动格式化、日志记录 |
| `Notification` | 特定通知时 | 桌面提醒、声音提示 |
| `Stop` | Claude Code 停止时 | 清理临时文件、提交 git |
| `PreCompact` | 上下文压缩前 | 保存关键信息 |
| `SessionStart` | 会话开始时 | 加载自定义环境 |

---

## 🎯 实用 Hooks 示例

### 示例 1：文件修改后自动格式化

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write ${CLAUDE_PROJECT_DIR}/$CLAUDE_FILE_PATH 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

### 示例 2：阻止删除重要文件

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/check-dangerous-command.py \"$CLAUDE_TOOL_INPUT\""
          }
        ]
      }
    ]
  }
}
```

### 示例 3：Claude 停止时自动提交 Git

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cd ${CLAUDE_PROJECT_DIR} && git add -A && git commit -m 'auto: Claude Code session snapshot'"
          }
        ]
      }
    ]
  }
}
```

### 示例 4：会话开始时自动设置代理

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "export HTTP_PROXY=http://127.0.0.1:7890 && export HTTPS_PROXY=http://127.0.0.1:7890"
          }
        ]
      }
    ]
  }
}
```

---

## 🔧 Claude Code 常用自定义配置

### settings.json 完整示例

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.anthropic.com",
    "ANTHROPIC_AUTH_TOKEN": "your-api-key",
    "ANTHROPIC_MODEL": "claude-sonnet-4-6"
  },
  "theme": "dark",
  "includeCoAuthoredBy": true,
  "autoCompact": true,
  "autoCompactTokenThreshold": 80000,
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "echo '✅ 文件已更新'"
        }]
      }
    ]
  }
}
```

### 配置项说明

| 配置项 | 说明 | 推荐值 |
|--------|------|--------|
| `theme` | 主题：`dark` 或 `light` | `dark` |
| `includeCoAuthoredBy` | 提交时是否包含 AI 署名 | `true` |
| `autoCompact` | 是否自动压缩上下文 | `true` |
| `autoCompactTokenThreshold` | 触发自动压缩的 token 阈值 | `80000` |

---

## 🔑 环境变量参考

Claude Code 提供以下环境变量可用在 Hooks 命令中：

| 变量 | 说明 |
|------|------|
| `$CLAUDE_PROJECT_DIR` | 当前项目根目录 |
| `$CLAUDE_FILE_PATH` | 当前操作的文件路径 |
| `$CLAUDE_TOOL_INPUT` | 当前工具调用的输入 |

---

## ⚠️ 注意事项

1. **Hooks 命令执行有超时限制**（通常 10s），复杂操作考虑异步执行
2. **路径包含空格时**需要用引号包裹
3. **Windows 用户**注意路径分隔符用 `\\` 而非 `/`
4. **测试 Hooks 时**建议先在无害场景验证，避免误操作

---

## ❓ 需要更复杂的配置？

Hooks 的灵活性很高，可以做到：
- 和 GitHub Actions 一样的 CI 流程
- 自动生成 CHANGELOG
- 与飞书/钉钉等国内工具集成

👉 加微信沟通定制需求。
