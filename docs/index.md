---
layout: home

hero:
  name: crewAI 中文教程
  text: 实现一个 multi Agent
  tagline: 先理解 Crew / Flow 的设计，再用 TypeScript 亲手做一个可运行的多智能体系统。
  image:
    src: /crewai-tutorial-hero.svg
    alt: crewAI tutorial icon
  actions:
    - theme: brand
      text: 开始学习
      link: /guide
    - theme: alt
      text: 运行最终项目
      link: /final/project

features:
  - title: 先建立心智模型
    details: 用 Agent、Task、Crew、Process、Flow、Tool、Memory 解释 crewAI 的核心结构。
  - title: 再拆执行链路
    details: 从 kickoff 开始看任务如何被校验、调度、执行、汇总和回传。
  - title: 最后做工程实现
    details: 用 Node.js + TypeScript + React 实现一个简化但保留 crewAI 核心能力的多 Agent Demo。
---

## 你会做出什么

学完这套教程后，你会拥有一个可以运行的教学项目：

```mermaid
flowchart LR
  U["用户输入主题"] --> B["后端创建 Agent 团队"]
  B --> R["Researcher 调研"]
  R --> A["Analyst 分析"]
  A --> W["Writer 成稿"]
  W --> F["前端展示日志与最终报告"]
```

它不是 crewAI Python 源码的逐行翻译，而是一套“工程师手把手拆机制”的学习路径：你会知道为什么 multi Agent 需要角色、任务、工具、流程和状态，也会知道这些抽象落到代码里应该长什么样。

## 调研依据

本教程参考了 crewAI 官方仓库与官方文档。调研时间为 2026-06-03，官方文档页面显示版本为 `v1.14.6`。重点依据包括：

- crewAI 官方仓库：[https://github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
- crewAI 官方文档：[https://docs.crewai.com](https://docs.crewai.com)
- 官方 README 中对 Crews 与 Flows 的定位：Crews 偏自主协作，Flows 偏生产级、事件驱动和状态控制。
- `Crew` 核心源码中的 `tasks`、`agents`、`process`、`memory`、`cache`、`manager_agent`、`manager_llm`、`kickoff` 等执行入口与校验逻辑。
