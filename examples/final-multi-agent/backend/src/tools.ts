import type { Tool } from "./types.js";

const knowledgeBase: Record<string, string> = {
  crew: "Crew 是一组 Agent 和 Task 的组织单元，适合自主协作。",
  flow: "Flow 用状态、事件和分支控制应用流程，适合生产级编排。",
  tool: "Tool 把搜索、数据库、文件读取等外部能力接入 Agent。",
  memory: "Memory 保存短期或长期上下文，让 Agent 能利用历史信息。"
};

export const localKnowledgeTool: Tool = {
  name: "local_knowledge",
  description: "查询内置 crewAI 概念资料。输入关键词 crew、flow、tool 或 memory。",
  async run(input: string): Promise<string> {
    const normalized = input.toLowerCase();
    const key = Object.keys(knowledgeBase).find((item) => normalized.includes(item));
    return key ? knowledgeBase[key] : "没有命中内置资料，请基于通用工程经验回答。";
  }
};

export const outlineTool: Tool = {
  name: "outline_builder",
  description: "把一个主题拆成报告大纲。输入为用户主题。",
  async run(input: string): Promise<string> {
    return [
      `主题：${input}`,
      "1. 背景与问题",
      "2. 核心概念",
      "3. 实现步骤",
      "4. 风险与扩展"
    ].join("\n");
  }
};
