import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Claude Code 国内安装指南',
  description: '零基础一站式安装配置 Claude Code / Codex — 远程协助 · 包教包会 · 终身售后',
  base: '/codex-guide/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    logo: '🚀',
    nav: [
      { text: '首页', link: '/' },
      { text: '安装教程', link: '/guide/' },
      { text: '进阶使用', link: '/advanced/' },
      { text: '服务定价', link: '/services/' },
      { text: 'FAQ', link: '/faq' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '📦 安装教程',
          items: [
            { text: '安装总览', link: '/guide/' },
            { text: 'Windows 安装', link: '/guide/windows' },
            { text: 'macOS 安装', link: '/guide/mac' },
            { text: 'Linux 安装', link: '/guide/linux' },
            { text: '网络配置专题', link: '/guide/network' },
          ],
        },
      ],
      '/advanced/': [
        {
          text: '🔧 进阶使用',
          items: [
            { text: '进阶总览', link: '/advanced/' },
            { text: '常见报错速查', link: '/advanced/common-errors' },
            { text: '实用工作流配置', link: '/advanced/workflows' },
            { text: 'Hooks 与自定义配置', link: '/advanced/hooks-custom' },
            { text: '效率提升技巧', link: '/advanced/tips' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],

    footer: {
      message: '让每一个开发者都能用上 Claude Code',
      copyright: 'Copyright © 2025 — 扫码加微信，15 分钟搞定安装',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    darkModeSwitchLabel: '暗色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
  },
})
