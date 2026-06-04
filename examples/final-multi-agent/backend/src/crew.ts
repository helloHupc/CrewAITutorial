import crypto from "node:crypto";
import type { CrewEvent, CrewOutput, Inputs, TaskOutput } from "./types.js";
import { Task } from "./task.js";

export class Crew {
  private readonly events: CrewEvent[] = [];

  constructor(
    readonly options: {
      name: string;
      tasks: Task[];
      process: "sequential";
    }
  ) {}

  async kickoff(inputs: Inputs): Promise<CrewOutput> {
    this.events.length = 0;
    this.emit("crew", `Crew ${this.options.name} 启动`);
    this.validate();

    const outputs = new Map<string, TaskOutput>();

    for (const task of this.options.tasks) {
      this.emit("task", `准备执行任务 ${task.id}`, task);
      const context = this.resolveContext(task, outputs);
      const output = await task.agent.execute({
        task,
        inputs,
        context,
        emit: (event) => this.events.push(event)
      });
      outputs.set(task.id, output);
      this.emit("task", `任务 ${task.id} 已写入上下文`, task);
    }

    const tasks = [...outputs.values()];
    const final = tasks.at(-1)?.raw ?? "";
    this.emit("crew", `Crew ${this.options.name} 完成`);

    return {
      id: crypto.randomUUID(),
      final,
      tasks,
      events: [...this.events]
    };
  }

  private validate(): void {
    if (!this.options.tasks.length) {
      throw new Error("Crew 至少需要一个 Task");
    }

    const seen = new Set<string>();
    for (const task of this.options.tasks) {
      if (!task.agent) {
        throw new Error(`Task ${task.id} 缺少 Agent`);
      }

      for (const dependency of task.context) {
        if (!seen.has(dependency.id)) {
          throw new Error(`Task ${task.id} 依赖 ${dependency.id}，但该任务尚未执行`);
        }
      }

      seen.add(task.id);
    }
  }

  private resolveContext(task: Task, outputs: Map<string, TaskOutput>): TaskOutput[] {
    return task.context.map((dependency) => {
      const output = outputs.get(dependency.id);
      if (!output) {
        throw new Error(`无法解析 Task ${task.id} 的上下文 ${dependency.id}`);
      }
      return output;
    });
  }

  private emit(type: CrewEvent["type"], message: string, task?: Task): void {
    this.events.push({
      timestamp: new Date().toISOString(),
      type,
      taskId: task?.id,
      agentRole: task?.agent.role,
      message
    });
  }
}
