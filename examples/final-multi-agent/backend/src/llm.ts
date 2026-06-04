import type { LLM } from "./types.js";

export class MockLLM implements LLM {
  async complete(prompt: string): Promise<string> {
    const topic = matchSection(prompt, "用户输入") || "未命名主题";
    const role = matchLine(prompt, "角色") || "Agent";
    const task = matchSection(prompt, "任务描述") || "完成任务";

    if (role.includes("研究")) {
      return [
        `## 调研结果：${topic}`,
        "",
        `- 关键事实 1：${topic} 需要先拆分目标、角色和可验收任务。`,
        "- 关键事实 2：multi Agent 的价值来自职责边界，而不是 Agent 数量。",
        "- 关键事实 3：工具、上下文和流程控制决定系统是否能工程化落地。",
        "",
        `本轮任务：${task}`
      ].join("\n");
    }

    if (role.includes("分析")) {
      return [
        `## 分析结论：${topic}`,
        "",
        "- 机会：把复杂目标拆成研究、判断、表达三个阶段，便于调试。",
        "- 风险：如果任务边界不清，Agent 会互相覆盖职责。",
        "- 建议：先用 sequential process 跑通链路，再增加 Flow、Tool 和 Memory。",
        "",
        "判断标准：每个阶段都必须产出可被下一阶段消费的结构化结果。"
      ].join("\n");
    }

    return [
      `# ${topic} 多 Agent 实战报告`,
      "",
      "## 结论",
      "一个可靠的 multi Agent 系统，应该先用 Flow 管住业务状态，再把需要智能协作的步骤交给 Crew。",
      "",
      "## 推荐实现路径",
      "1. 定义 Agent 角色：研究员、分析师、写作者。",
      "2. 定义 Task 交付物：资料、判断、报告。",
      "3. 用 sequential process 串起上下文。",
      "4. 用前端展示每个 Agent 的执行日志，方便调试。",
      "",
      "## 下一步",
      "接入真实搜索工具、向量知识库和人工审核节点，把教学 Demo 扩展成生产原型。"
    ].join("\n");
  }
}

export class OpenAICompatibleLLM implements LLM {
  constructor(
    private options: {
      apiKey: string;
      baseUrl: string;
      model: string;
    }
  ) {}

  async complete(prompt: string): Promise<string> {
    const response = await fetch(`${this.options.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.options.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: this.options.model,
        messages: [
          {
            role: "system",
            content: "你是一个严谨的中文工程教学助手，回答要结构化、可执行、避免空话。"
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`LLM request failed: ${response.status} ${text}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return data.choices?.[0]?.message?.content ?? "";
  }
}

export function createLLM(): LLM {
  if (process.env.LLM_PROVIDER === "openai" && process.env.LLM_API_KEY) {
    return new OpenAICompatibleLLM({
      apiKey: process.env.LLM_API_KEY,
      baseUrl: process.env.LLM_BASE_URL ?? "https://api.openai.com/v1",
      model: process.env.LLM_MODEL ?? "gpt-4.1-mini"
    });
  }

  return new MockLLM();
}

function matchLine(text: string, label: string): string | undefined {
  const match = text.match(new RegExp(`${label}：(.+)`));
  return match?.[1]?.trim();
}

function matchSection(text: string, label: string): string | undefined {
  const marker = `${label}：`;
  const start = text.indexOf(marker);
  if (start === -1) return undefined;
  const rest = text.slice(start + marker.length).trim();
  return rest.split("\n\n")[0]?.trim();
}
