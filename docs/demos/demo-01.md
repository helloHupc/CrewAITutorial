# Demo 01：最小 Agent

第一个 Demo 不做 Crew，也不做 Tool，只实现一个“带角色的模型调用”。目的很简单：让你看到 Agent 和普通 LLM 调用的区别。

## 目标

输入：

```txt
主题：为什么 multi Agent 需要任务拆分？
```

输出：

```txt
作为“教学助理”，用本科生能懂的方式解释这个主题。
```

## 最小代码

```ts
type LLM = {
  complete(prompt: string): Promise<string>;
};

class MockLLM implements LLM {
  async complete(prompt: string) {
    return `Mock 输出：我收到了 prompt，长度 ${prompt.length}。`;
  }
}

class Agent {
  constructor(
    private options: {
      role: string;
      goal: string;
      backstory: string;
      llm: LLM;
    }
  ) {}

  async run(input: string) {
    const prompt = `
你是：${this.options.role}
目标：${this.options.goal}
背景：${this.options.backstory}

任务：
${input}
`;

    return this.options.llm.complete(prompt);
  }
}

const agent = new Agent({
  role: "耐心的计算机教学助理",
  goal: "把复杂工程概念解释成本科毕业生能理解的步骤",
  backstory: "你喜欢用类比，但会落回到代码结构。",
  llm: new MockLLM()
});

console.log(await agent.run("解释为什么 multi Agent 需要任务拆分。"));
```

## 这一步解决什么问题

普通 LLM 调用只有“问题”。Agent 调用多了三层约束：

| 约束 | 作用 |
| --- | --- |
| role | 让模型知道自己是谁。 |
| goal | 让模型知道优化方向。 |
| backstory | 让输出风格更稳定。 |

这就是 Agent 的最低成本定义：它不是一个神秘实体，而是“带稳定行为约束的模型调用单元”。

## 小练习

把 `role` 改成“严厉的代码审查员”，同样输入解释任务。预测输出会怎么变？

