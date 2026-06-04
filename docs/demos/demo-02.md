# Demo 02：Task 与上下文

第二个 Demo 加入 Task。Agent 负责“谁来做”，Task 负责“做什么”和“做到什么程度”。

## 目标

实现两个任务：

1. 提炼主题的 3 个关键点。
2. 基于关键点写一段学习建议。

第二个任务需要消费第一个任务的输出。

## 代码

```ts
type TaskOutput = {
  taskId: string;
  agentRole: string;
  raw: string;
};

type Task = {
  id: string;
  description: string;
  expectedOutput: string;
  context?: Task[];
};

class Agent {
  constructor(private role: string) {}

  async execute(task: Task, context: TaskOutput[]): Promise<TaskOutput> {
    const contextText = context.map((item) => item.raw).join("\n\n");

    return {
      taskId: task.id,
      agentRole: this.role,
      raw: [
        `角色：${this.role}`,
        `任务：${task.description}`,
        `期望输出：${task.expectedOutput}`,
        `上下文：${contextText || "无"}`,
        "结果：这里是模拟结果。"
      ].join("\n")
    };
  }
}

const extractor = new Agent("概念提炼员");
const coach = new Agent("学习教练");

const task1: Task = {
  id: "extract",
  description: "提炼 multi Agent 的 3 个关键点。",
  expectedOutput: "3 条短句，每条不超过 30 字。"
};

const task2: Task = {
  id: "coach",
  description: "根据关键点给出学习建议。",
  expectedOutput: "一段 150 字以内的学习建议。",
  context: [task1]
};

const output1 = await extractor.execute(task1, []);
const output2 = await coach.execute(task2, [output1]);

console.log(output2.raw);
```

## 为什么要有 expectedOutput

没有 `expectedOutput` 时，Agent 只知道“要做什么”，不知道“怎样算完成”。真实项目中，这会导致输出格式飘、长度飘、粒度飘。

::: tip
Task 的描述负责方向，`expectedOutput` 负责验收。两者缺一不可。
:::

## 小练习

给 `task2` 加一个更严格的输出要求：必须包含“先做什么、再做什么、最后做什么”。想一想这会如何影响下游前端展示。

