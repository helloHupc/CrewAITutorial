import type { CrewEvent, Inputs, LLM, TaskOutput, Tool } from "./types.js";
import type { Task } from "./task.js";

export class Agent {
  constructor(
    readonly options: {
      role: string;
      goal: string;
      backstory: string;
      tools?: Tool[];
      llm: LLM;
    }
  ) {}

  get role(): string {
    return this.options.role;
  }

  async execute(params: {
    task: Task;
    inputs: Inputs;
    context: TaskOutput[];
    emit: (event: CrewEvent) => void;
  }): Promise<TaskOutput> {
    const startedAt = new Date().toISOString();

    params.emit({
      timestamp: startedAt,
      type: "agent",
      taskId: params.task.id,
      agentRole: this.role,
      message: `${this.role} 开始处理任务 ${params.task.id}`
    });

    const toolEvidence = await this.collectToolEvidence(params.inputs.topic ?? "", params.emit);
    const prompt = this.buildPrompt(params.task, params.inputs, params.context, toolEvidence);
    const raw = await this.options.llm.complete(prompt);
    const finishedAt = new Date().toISOString();

    params.emit({
      timestamp: finishedAt,
      type: "agent",
      taskId: params.task.id,
      agentRole: this.role,
      message: `${this.role} 完成任务 ${params.task.id}`
    });

    return {
      taskId: params.task.id,
      description: params.task.description,
      expectedOutput: params.task.expectedOutput,
      agentRole: this.role,
      raw,
      startedAt,
      finishedAt
    };
  }

  private async collectToolEvidence(topic: string, emit: (event: CrewEvent) => void): Promise<string> {
    if (!this.options.tools?.length) {
      return "无可用工具。";
    }

    const results: string[] = [];

    for (const tool of this.options.tools) {
      emit({
        timestamp: new Date().toISOString(),
        type: "tool",
        agentRole: this.role,
        message: `${this.role} 调用工具 ${tool.name}`
      });
      const result = await tool.run(topic);
      results.push(`工具 ${tool.name}：${result}`);
    }

    return results.join("\n");
  }

  private buildPrompt(task: Task, inputs: Inputs, context: TaskOutput[], toolEvidence: string): string {
    const contextText = context
      .map((item) => `### ${item.taskId} by ${item.agentRole}\n${item.raw}`)
      .join("\n\n");

    return [
      `角色：${this.options.role}`,
      `目标：${this.options.goal}`,
      `背景：${this.options.backstory}`,
      "",
      `用户输入：${inputs.topic ?? ""}`,
      "",
      `任务描述：${task.description}`,
      `期望输出：${task.expectedOutput}`,
      "",
      "可用工具证据：",
      toolEvidence,
      "",
      "前置任务上下文：",
      contextText || "无",
      "",
      "请用中文输出，结构清晰，避免泛泛而谈。"
    ].join("\n");
  }
}
