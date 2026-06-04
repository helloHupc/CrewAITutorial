# 项目源码

本教程的完整源码托管在 GitHub：

[https://github.com/helloHupc/CrewAITutorial](https://github.com/helloHupc/CrewAITutorial)

仓库中包含两部分：

| 目录 | 内容 |
| --- | --- |
| `docs/` | VitePress 中文教程站点，包含原理讲解、源码拆解、渐进式 Demo 和最终项目说明。 |
| `examples/final-multi-agent/` | 可运行的 TypeScript multi Agent 示例，包含 Node.js 后端和 React 前端。 |

## 欢迎讨论与修正

这是一份面向学习者的教程项目，内容会持续迭代。如果在阅读或运行过程中发现问题，欢迎通过 GitHub 参与讨论：

- 教程概念解释不准确。
- 代码示例无法运行。
- Mermaid 图表或页面展示异常。
- crewAI 官方版本变化导致内容过期。
- 有更好的 Demo 设计、练习题或扩展方向。

可以直接提交 Issue，也可以 Fork 仓库后提交 Pull Request。

## 本地运行

```bash
npm install
npm install --prefix examples/final-multi-agent/backend
npm install --prefix examples/final-multi-agent/frontend
```

启动教程站点：

```bash
npm run docs:dev
```

启动最终 Demo：

```bash
npm run demo:backend
npm run demo:frontend
```

默认使用 Mock LLM，不需要 API Key。接入真实模型的方式见 [运行与扩展](/final/run-and-extend)。
