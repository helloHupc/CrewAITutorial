export type Inputs = Record<string, string>;

export type Tool = {
  name: string;
  description: string;
  run(input: string): Promise<string>;
};

export type LLM = {
  complete(prompt: string): Promise<string>;
};

export type CrewEvent = {
  timestamp: string;
  type: "flow" | "crew" | "task" | "agent" | "tool" | "error";
  message: string;
  taskId?: string;
  agentRole?: string;
};

export type TaskOutput = {
  taskId: string;
  description: string;
  expectedOutput: string;
  agentRole: string;
  raw: string;
  startedAt: string;
  finishedAt: string;
};

export type CrewOutput = {
  id: string;
  final: string;
  tasks: TaskOutput[];
  events: CrewEvent[];
};

export type RunResponse = {
  runId: string;
  status: "completed" | "failed";
  output?: CrewOutput;
  error?: string;
};
