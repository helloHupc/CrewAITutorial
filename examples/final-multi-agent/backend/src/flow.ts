import crypto from "node:crypto";
import type { CrewOutput, RunResponse } from "./types.js";
import { Agent } from "./agent.js";
import { Crew } from "./crew.js";
import { createLLM } from "./llm.js";
import { Task } from "./task.js";
import { localKnowledgeTool, outlineTool } from "./tools.js";

export class ReportFlow {
  async run(topic: string): Promise<RunResponse> {
    const runId = crypto.randomUUID();

    if (!topic.trim()) {
      return {
        runId,
        status: "failed",
        error: "topic 不能为空"
      };
    }

    try {
      const output = await this.createCrew().kickoff({ topic });
      return {
        runId,
        status: "completed",
        output: this.withFlowEvents(output, topic)
      };
    } catch (error) {
      return {
        runId,
        status: "failed",
        error: error instanceof Error ? error.message : "unknown error"
      };
    }
  }

  private createCrew(): Crew {
    const llm = createLLM();

    const researcher = new Agent({
      role: "资料研究员",
      goal: "围绕主题收集可信事实，给后续分析提供可靠依据。",
      backstory: "你习惯先找定义、再找机制、最后指出工程落点。",
      tools: [localKnowledgeTool],
      llm
    });

    const analyst = new Agent({
      role: "系统分析师",
      goal: "把资料转成架构判断、风险和实现建议。",
      backstory: "你关注模块边界、数据流和失败模式。",
      tools: [localKnowledgeTool],
      llm
    });

    const writer = new Agent({
      role: "技术写作者",
      goal: "把分析结果写成适合本科毕业生学习的结构化报告。",
      backstory: "你写作时会解释为什么这么做，以及下一步如何运行起来。",
      tools: [outlineTool],
      llm
    });

    const researchTask = new Task({
      id: "research",
      description: "围绕用户主题收集关键事实，说明它与 crewAI / multi Agent 的关系。",
      expectedOutput: "Markdown 列表，包含事实、解释和工程意义。",
      agent: researcher
    });

    const analysisTask = new Task({
      id: "analysis",
      description: "基于调研结果，分析系统应该如何拆分 Agent、Task、Tool 和 Flow。",
      expectedOutput: "包含机会、风险、实现建议的结构化分析。",
      agent: analyst,
      context: [researchTask]
    });

    const writingTask = new Task({
      id: "writing",
      description: "把调研和分析整理成一份可阅读的中文技术报告。",
      expectedOutput: "Markdown 报告，包含结论、实现路径和扩展方向。",
      agent: writer,
      context: [researchTask, analysisTask]
    });

    return new Crew({
      name: "learning-report-crew",
      process: "sequential",
      tasks: [researchTask, analysisTask, writingTask]
    });
  }

  private withFlowEvents(output: CrewOutput, topic: string): CrewOutput {
    return {
      ...output,
      events: [
        {
          timestamp: new Date().toISOString(),
          type: "flow",
          message: `Flow 接收到主题：${topic}`
        },
        ...output.events,
        {
          timestamp: new Date().toISOString(),
          type: "flow",
          message: "Flow 返回执行结果"
        }
      ]
    };
  }
}
