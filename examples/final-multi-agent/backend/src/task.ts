import type { Agent } from "./agent.js";

export class Task {
  constructor(
    readonly options: {
      id: string;
      description: string;
      expectedOutput: string;
      agent: Agent;
      context?: Task[];
    }
  ) {}

  get id(): string {
    return this.options.id;
  }

  get description(): string {
    return this.options.description;
  }

  get expectedOutput(): string {
    return this.options.expectedOutput;
  }

  get agent(): Agent {
    return this.options.agent;
  }

  get context(): Task[] {
    return this.options.context ?? [];
  }
}
