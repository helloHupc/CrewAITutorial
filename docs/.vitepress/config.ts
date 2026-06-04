import { defineConfig } from "vitepress";

const siteDescription = "从零学习 crewAI，多智能体原理、源码拆解与 TypeScript 实战教程";

export default defineConfig({
  title: "crewAI 中文教程",
  description: siteDescription,
  lang: "zh-CN",
  head: [
    ["meta", { property: "og:title", content: "crewAI 中文教程" }],
    ["meta", { property: "og:description", content: siteDescription }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://crewai-tutorial-plum.vercel.app" }],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "crewAI 中文教程" }],
    ["meta", { name: "twitter:description", content: siteDescription }]
  ],
  cleanUrls: true,
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark"
    },
    lineNumbers: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence!;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const language = token.info.trim().split(/\s+/)[0];

        if (language === "mermaid") {
          return `<pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre>`;
        }

        return defaultFence(tokens, idx, options, env, self);
      };
    }
  },
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "路线图", link: "/guide" },
      { text: "核心原理", link: "/core/overview" },
      { text: "渐进式 Demo", link: "/demos/demo-01" },
      { text: "最终项目", link: "/final/project" },
      { text: "项目源码", link: "/source-code" }
    ],
    sidebar: [
      {
        text: "开始",
        items: [
          { text: "教程路线图", link: "/guide" },
          { text: "环境准备", link: "/setup" }
        ]
      },
      {
        text: "crewAI 核心原理",
        items: [
          { text: "整体架构", link: "/core/overview" },
          { text: "Agent / Task / Crew", link: "/core/agent-task-crew" },
          { text: "Process 与 Flow", link: "/core/process-flow" },
          { text: "Tools / Memory / Knowledge", link: "/core/tools-memory-knowledge" }
        ]
      },
      {
        text: "源码拆解",
        items: [
          { text: "仓库结构与阅读路线", link: "/source/repo-map" },
          { text: "执行链路", link: "/source/execution-chain" }
        ]
      },
      {
        text: "渐进式 Demo",
        items: [
          { text: "Demo 01：最小 Agent", link: "/demos/demo-01" },
          { text: "Demo 02：Task 与上下文", link: "/demos/demo-02" },
          { text: "Demo 03：Tools", link: "/demos/demo-03" },
          { text: "Demo 04：顺序 Crew", link: "/demos/demo-04" },
          { text: "Demo 05：Flow 状态机", link: "/demos/demo-05" }
        ]
      },
      {
        text: "最终项目",
        items: [
          { text: "项目总览", link: "/final/project" },
          { text: "后端实现", link: "/final/backend" },
          { text: "前端实现", link: "/final/frontend" },
          { text: "运行与扩展", link: "/final/run-and-extend" }
        ]
      },
      {
        text: "附录",
        items: [
          { text: "项目源码", link: "/source-code" },
          { text: "练习答案", link: "/appendix/exercises" },
          { text: "参考资料", link: "/appendix/references" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/helloHupc/CrewAITutorial" }
    ],
    search: {
      provider: "local"
    },
    footer: {
      message: "用工程视角理解 multi Agent，而不是背概念。",
      copyright: "MIT Licensed"
    }
  }
});
