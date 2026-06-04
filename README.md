# crewAI 中文教程

一个面向中文读者的 crewAI 入门与实战教程。项目把 crewAI 的核心概念、架构设计和执行链路拆成循序渐进的学习路径，并提供一个可运行的 TypeScript multi Agent Demo，帮助读者从零开始理解并实现一个简化版多智能体系统。


## 项目截图

### 教程站点首页

<img width="2930" height="1596" alt="image" src="https://github.com/user-attachments/assets/0d81169c-3bc6-4f0a-bb5e-4ff28503ab07" />


### multi Agent Demo 工作台

<img width="2612" height="1724" alt="image" src="https://github.com/user-attachments/assets/e3b1f967-541e-4113-979f-49bc472b30d0" />


## 适合谁阅读

本教程适合已经具备基础编程能力，并希望系统理解 multi Agent 工程实现的读者：

- 想学习 crewAI 但不想只停留在概念介绍。
- 想理解 Agent、Task、Crew、Flow、Tool、Memory 等模块如何协作。
- 想通过小 Demo 逐步掌握多智能体系统的执行链路。
- 想用 Node.js、TypeScript、React 实现一个可运行的教学版 multi Agent 项目。

## 可以学到什么

- crewAI 的核心抽象：Agent、Task、Crew、Process、Flow、Tool、Memory、Knowledge。
- Crew 与 Flow 的职责边界：自主协作与流程控制如何配合。
- 从 `kickoff` 入口理解任务校验、上下文传递、Agent 执行和结果汇总。
- 如何设计渐进式 Demo，让复杂系统从最小 Agent 一步步演化到完整 Crew。
- 如何实现一个前后端可运行的 multi Agent 报告生成工作台。

## 项目内容

| 模块 | 内容 |
| --- | --- |
| 教程站点 | 基于 VitePress，包含原理讲解、源码拆解、流程图、时序图、表格和练习。 |
| 渐进式 Demo | 5 个 TypeScript 小 Demo，从最小 Agent 到 Flow 状态机。 |
| 最终项目后端 | Express + TypeScript，实现 Agent、Task、Crew、Tool、Flow 和 LLM 适配。 |
| 最终项目前端 | React + Vite，实现主题输入、执行事件、任务输出和最终报告展示。 |
| Mock LLM | 默认无需 API Key，即可离线跑通完整 Demo。 |

## 项目结构

```txt
.
├── docs
│   ├── .vitepress
│   ├── appendix
│   ├── core
│   ├── demos
│   ├── final
│   ├── public
│   └── source
├── examples
│   └── final-multi-agent
│       ├── backend
│       └── frontend
├── package.json
└── README.md
```

## 快速开始

安装依赖：

```bash
npm install
npm install --prefix examples/final-multi-agent/backend
npm install --prefix examples/final-multi-agent/frontend
```

启动教程站点：

```bash
npm run docs:dev
```

访问：

```txt
http://127.0.0.1:5173/
```

## 运行最终 Demo

终端 1：启动后端。

```bash
npm run demo:backend
```

终端 2：启动前端。

```bash
npm run demo:frontend
```

访问前端工作台：

```txt
http://127.0.0.1:5174/
```

后端健康检查：

```txt
http://127.0.0.1:8787/api/health
```

默认使用 Mock LLM，不需要 API Key。页面提交主题后，后端会创建资料研究员、系统分析师、技术写作者三个 Agent，并按顺序执行调研、分析和成稿任务。

## 接入真实 LLM

复制后端环境变量模板：

```bash
cp examples/final-multi-agent/backend/.env.example examples/final-multi-agent/backend/.env
```

编辑 `.env`：

```txt
LLM_PROVIDER=openai
LLM_API_KEY=your_api_key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

只要模型服务兼容 OpenAI Chat Completions 格式，通常都可以接入。

## 构建验证

```bash
npm run docs:build
npm --prefix examples/final-multi-agent/backend run build
npm --prefix examples/final-multi-agent/frontend run build
```

## 学习路线

推荐按下面顺序阅读：

1. `docs/guide.md`：了解教程路线和最终目标。
2. `docs/core/`：建立 crewAI 核心概念和架构心智模型。
3. `docs/source/`：理解官方仓库阅读路线和执行链路。
4. `docs/demos/`：从最小 Agent 开始完成 5 个渐进式 Demo。
5. `docs/final/`：阅读最终项目的后端、前端、运行和扩展方式。

## 参与讨论与修正

欢迎通过 Issue 或 Pull Request 参与改进：

- 修正教程中的概念错误或过期内容。
- 补充更清晰的示例、图表和练习。
- 修复代码运行问题或页面展示问题。
- 扩展最终 Demo，例如接入真实搜索、记忆系统、Reviewer Agent 或实时事件推送。

## 参考资料

- crewAI 官方仓库：[https://github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
- crewAI 官方文档：[https://docs.crewai.com](https://docs.crewai.com)

## License

MIT
