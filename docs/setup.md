# 环境准备

本教程项目分成两部分：

- 文档站点：VitePress。
- 最终 Demo：`examples/final-multi-agent`，包含 Node.js 后端和 React 前端。

## 安装依赖

在项目根目录运行：

```bash
npm install
```

再安装最终 Demo 的前后端依赖：

```bash
npm install --prefix examples/final-multi-agent/backend
npm install --prefix examples/final-multi-agent/frontend
```

## 启动教程站点

```bash
npm run docs:dev
```

默认访问：

```txt
http://localhost:5173
```

## 启动最终 Demo

开两个终端：

```bash
npm run demo:backend
```

```bash
npm run demo:frontend
```

后端默认运行在 `http://localhost:8787`，前端默认运行在 `http://localhost:5174`。

## 可选：接入真实 LLM

最终 Demo 默认使用 `MockLLM`，不需要 API Key。你可以复制后端环境变量模板：

```bash
cp examples/final-multi-agent/backend/.env.example examples/final-multi-agent/backend/.env
```

然后填入兼容 OpenAI Chat Completions 的模型地址：

```txt
LLM_PROVIDER=openai
LLM_API_KEY=你的 key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

如果没有这些变量，项目会自动回退到 Mock 模式，适合课堂演示和离线学习。

