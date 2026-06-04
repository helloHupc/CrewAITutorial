# crewAI 中文教程

一个完整可运行的 VitePress 中文教学项目，主题是“从零到一实现一个 multi Agent”。教程参考 crewAI 官方仓库与官方文档，围绕 Agent、Task、Crew、Process、Flow、Tool、Memory、Knowledge 等核心概念展开，并提供一个 Node.js + TypeScript + React 的最终 Demo。

站点源码地址：

[https://github.com/helloHupc/CrewAITutorial](https://github.com/helloHupc/CrewAITutorial)

## Demo 截图

> 截图位置预留。项目推送后，可手动将截图放入 `docs/public/screenshots/`，再替换下面的图片路径。

![教程站点首页](docs/public/screenshots/home.png)

![multi Agent Demo 工作台](docs/public/screenshots/demo-workbench.png)

## 项目内容

- crewAI 核心概念：Agent、Task、Crew、Process、Flow、Tool、Memory、Knowledge。
- 官方仓库和文档导向的源码阅读路线。
- 5 个由浅入深的 TypeScript 小 Demo。
- 一个可运行的最终项目：Node.js 后端 + React 前端。
- Mermaid 架构图、流程图、时序图、目录树、表格、练习题和扩展建议。

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

## 安装依赖

```bash
npm install
npm install --prefix examples/final-multi-agent/backend
npm install --prefix examples/final-multi-agent/frontend
```

## 启动教程站点

```bash
npm run docs:dev
```

访问：

```txt
http://127.0.0.1:5173/
```

## 启动最终 Demo

开两个终端。

终端 1：启动后端。

```bash
npm run demo:backend
```

终端 2：启动前端。

```bash
npm run demo:frontend
```

访问：

```txt
http://127.0.0.1:5174/
```

后端健康检查：

```txt
http://127.0.0.1:8787/api/health
```

默认使用 Mock LLM，不需要 API Key。

## 接入真实 LLM

复制环境变量模板：

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

只要供应商兼容 OpenAI Chat Completions 格式，通常都可以接入。

## 构建验证

```bash
npm run docs:build
npm --prefix examples/final-multi-agent/backend run build
npm --prefix examples/final-multi-agent/frontend run build
```

## 参与讨论与修正

如果发现教程概念解释不准确、代码无法运行、页面展示异常、或 crewAI 官方版本变化导致内容过期，欢迎提交 Issue 或 Pull Request。

也欢迎补充新的 Demo、练习题、截图和扩展章节。

## License

MIT
