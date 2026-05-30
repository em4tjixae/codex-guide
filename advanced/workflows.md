# 🤖 实用工作流配置

> 工作流是 Claude Code 的自动化能力：你定义好流程，Claude 按部就班执行。一次配置，反复使用。

---

## 📌 什么是工作流？

工作流（Workflow）允许你用脚本定义多步骤任务，Claude Code 会调用多个子 Agent 并行或串行执行。适合：

- 🔍 **代码审查**：自动 review 所有变更
- 🐛 **Bug 排查**：多角度搜索和分析
- 📋 **项目审计**：全面检查代码质量

---

## 🚀 快速上手：创建工作流

### 1. 创建工作流文件

在 `.claude/workflows/` 目录下创建 `.js` 文件：

```bash
mkdir -p .claude/workflows
```

### 2. 编写工作流

以下是一个代码审查工作流模板（复制粘贴即可使用）：

```js
// .claude/workflows/review.js
export const meta = {
  name: 'review-changes',
  description: '审查代码变更：找 Bug、性能问题、安全漏洞',
  phases: [
    { title: '审查', detail: '多维度审查代码' },
    { title: '验证', detail: '确认发现的问题' }
  ],
}

phase('审查')

const DIMENSIONS = [
  {
    key: 'bugs',
    prompt: '在这段代码中寻找潜在的 Bug：逻辑错误、空值处理、边界条件。列出所有发现。'
  },
  {
    key: 'perf',
    prompt: '检查这段代码的性能问题：不必要的重渲染、内存泄漏、低效算法。列出所有发现。'
  },
  {
    key: 'security',
    prompt: '检查这段代码的安全问题：注入风险、敏感信息泄露、权限问题。列出所有发现。'
  },
]

const results = await pipeline(
  DIMENSIONS,
  d => agent(d.prompt, { label: `review:${d.key}` }),
  review => {
    if (!review?.findings?.length) return []
    return parallel(
      review.findings.map((f, i) => () =>
        agent(
          `请严格验证以下发现是否真实存在。如果确认是误报，请说明原因。
          
发现内容：${f.title}
文件：${f.file}
描述：${f.description}`,
          { label: `verify:${f.title?.slice(0, 20)}` }
        ).then(v => ({ ...f, verified: !v?.includes?.('误报') }))
      )
    )
  }
)

const confirmed = results
  .flat()
  .filter(Boolean)
  .filter(f => f.verified)

log(`审查完成：发现 ${results.flat().filter(Boolean).length} 个问题，确认 ${confirmed.length} 个`)
return { confirmed }
```

### 3. 运行工作流

在 Claude Code 中输入：

```
/workflows review
```

---

## 📋 实用工作流模板

### 模板 1：Git 提交前的自动检查

```js
// .claude/workflows/pre-commit-check.js
export const meta = {
  name: 'pre-commit',
  description: '提交前自动检查代码质量',
}

const checks = await parallel([
  () => agent('检查暂存区代码是否有 console.log 等调试代码，有则列出', { label: '检查调试代码' }),
  () => agent('检查暂存区代码是否有未处理的 TODO/FIXME 注释', { label: '检查待办标记' }),
  () => agent('检查暂存区代码的类型安全，是否有 any 类型滥用', { label: '检查类型安全' }),
])

const issues = checks.filter(Boolean).flat()
if (issues.length > 0) {
  log(`⚠️ 发现 ${issues.length} 个问题，建议修复后再提交`)
} else {
  log('✅ 所有检查通过')
}
```

### 模板 2：项目结构分析

```js
// .claude/workflows/analyze-project.js
export const meta = {
  name: 'analyze',
  description: '分析项目结构和依赖',
}

const [structure, deps, patterns] = await parallel([
  () => agent('分析这个项目的目录结构，指出组织是否合理', { label: '结构分析' }),
  () => agent('检查 package.json 的依赖，标出过时的库和安全漏洞', { label: '依赖分析' }),
  () => agent('分析代码中是否有重复的模式可以抽取为公共组件或工具函数', { label: '模式分析' }),
])

log('📊 项目分析报告：')
log(structure)
log(deps)
log(patterns)
```

---

## 🎯 最佳实践

| 原则 | 说明 |
|------|------|
| **单一职责** | 每个工作流只做一件事 |
| **先小后大** | 先在单个文件上验证，再扩大到整个项目 |
| **验证结果** | 不要盲目信任 Agent 的输出，重要操作前人工确认 |
| **命名清晰** | 给 Agent 取有意义的 label，方便跟踪进度 |

---

## ❓ 常见问题

### Q: 工作流运行时间多长？
简单的（如 pre-commit check）约 30 秒，复杂的（如全项目审计）可能需要几分钟。

### Q: 会不会消耗很多 Token？
会的。工作流本质是调用多次 Agent，每次 Agent 调用都会消耗 Token。建议在重要操作前使用，不要无差别运行。

### Q: 不懂 JS 怎么办？
上面的模板直接复制粘贴到对应文件即可使用，不需要自己写代码。如果需要定制，可以加微信沟通。

---

> 💡 更多工作流模板持续更新中，加微信获取最新资源。
