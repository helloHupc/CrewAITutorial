# 参考资料

本教程参考了以下资料，调研时间为 2026-06-03。

## 官方资料

- crewAI 官方仓库：[https://github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
- crewAI 官方文档：[https://docs.crewai.com](https://docs.crewai.com)
- crewAI README：[https://github.com/crewAIInc/crewAI/blob/main/README.md](https://github.com/crewAIInc/crewAI/blob/main/README.md)

## 本教程采用的核心理解

- Crews 偏向自主协作：用角色化 Agent 和 Task 完成复杂目标。
- Flows 偏向生产控制：用状态、事件、条件和分支控制应用执行。
- Crew 与 Flow 可以组合：Flow 管整体业务链路，Crew 处理需要智能协作的步骤。
- `kickoff` 是 Crew 执行入口：负责校验、执行任务、收集中间输出并返回结果。
- Tool、Memory、Knowledge 是让 Agent 从“会说话”走向“能做事、能利用上下文”的关键模块。

## 延伸学习建议

1. 先跑通本教程的 TypeScript Demo。
2. 再用 Python 安装 crewAI，完成官方 quickstart。
3. 对照官方源码，看 `Crew`、`Agent`、`Task`、`Flow` 如何处理更多生产细节。
4. 最后尝试把本教程 Demo 的 Tool 换成真实搜索或文档检索。

