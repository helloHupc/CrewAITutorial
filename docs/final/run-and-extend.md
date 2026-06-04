# 运行与扩展

## 安装依赖

在项目根目录：

```bash
npm install
npm install --prefix examples/final-multi-agent/backend
npm install --prefix examples/final-multi-agent/frontend
```

## 启动

终端 1：

```bash
npm run demo:backend
```

终端 2：

```bash
npm run demo:frontend
```

访问：

```txt
http://localhost:5174
```

## 使用真实 LLM

默认是 Mock 模式。要接真实模型：

```bash
cp examples/final-multi-agent/backend/.env.example examples/final-multi-agent/backend/.env
```

编辑 `.env`：

```txt
LLM_PROVIDER=openai
LLM_API_KEY=你的 key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4.1-mini
```

只要供应商兼容 Chat Completions 格式，通常都能接入。

## 扩展 1：增加一个 Reviewer Agent

当前链路是：

```txt
research -> analysis -> writing
```

可以扩展成：

```txt
research -> analysis -> writing -> review
```

Reviewer 的 Task 可以这样设计：

```ts
const reviewTask = new Task({
  id: "review",
  description: "检查报告是否有空泛表述、缺少步骤或逻辑跳跃。",
  expectedOutput: "列出问题清单，并给出改写后的最终版本。",
  agent: reviewer,
  context: [researchTask, analysisTask, writingTask]
});
```

## 扩展 2：把 Tool 接到真实搜索

现在 `localKnowledgeTool` 是内置资料。你可以替换成：

- 搜索 API。
- GitHub API。
- 本地 Markdown 文档读取。
- 数据库查询。

建议保持 Tool 输出结构稳定：

```ts
type SearchResult = {
  title: string;
  summary: string;
  url: string;
  confidence: "high" | "medium" | "low";
};
```

## 扩展 3：加入 Memory

最小 Memory 可以先用内存数组：

```ts
const memory: TaskOutput[] = [];
```

每次任务完成后写入，每次 Agent 执行前读取相关内容。再往后可以换成：

- SQLite 保存运行记录。
- 向量数据库做语义检索。
- 用户偏好表保存长期记忆。

## 扩展 4：从 sequential 到 hierarchical

hierarchical process 的核心变化是：任务不再完全由固定列表推进，而是由 manager 决定谁来做、是否重做、是否通过。

可以先实现一个简化 manager：

```ts
type ManagerDecision =
  | { type: "assign"; taskId: string; agentRole: string }
  | { type: "retry"; taskId: string; reason: string }
  | { type: "finish" };
```

这会让系统更灵活，也会增加调试难度。所以教程先从 sequential 开始。

## 扩展 5：生产化检查清单

| 项目 | 为什么需要 |
| --- | --- |
| 请求超时 | 防止模型或工具卡住。 |
| 重试策略 | 处理临时网络错误。 |
| 结构化输出校验 | 防止下游解析失败。 |
| 日志与追踪 ID | 方便定位一次运行。 |
| 成本统计 | LLM 调用需要预算控制。 |
| 权限边界 | Tool 不能暴露危险能力。 |

