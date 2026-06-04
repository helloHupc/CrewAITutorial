import React from "react";
import { createRoot } from "react-dom/client";
import { Activity, Bot, CheckCircle2, FileText, Loader2, Play, ServerCrash } from "lucide-react";
import "./styles.css";

type CrewEvent = {
  timestamp: string;
  type: "flow" | "crew" | "task" | "agent" | "tool" | "error";
  message: string;
  taskId?: string;
  agentRole?: string;
};

type TaskOutput = {
  taskId: string;
  description: string;
  expectedOutput: string;
  agentRole: string;
  raw: string;
  startedAt: string;
  finishedAt: string;
};

type RunResponse = {
  runId: string;
  status: "completed" | "failed";
  output?: {
    id: string;
    final: string;
    tasks: TaskOutput[];
    events: CrewEvent[];
  };
  error?: string;
};

function App() {
  const [topic, setTopic] = React.useState("从零实现一个 multi Agent 学习助手");
  const [result, setResult] = React.useState<RunResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function startRun() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8787/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
      });
      const data = (await response.json()) as RunResponse;
      setResult(data);
      if (!response.ok) {
        setError(data.error ?? "请求失败");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "无法连接后端");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <section className="header">
        <div>
          <p className="eyebrow">mini crewAI TypeScript Demo</p>
          <h1>多 Agent 报告生成工作台</h1>
        </div>
        <div className="status">
          {loading ? <Loader2 className="spin" size={18} /> : <Activity size={18} />}
          <span>{loading ? "Crew 执行中" : "等待输入"}</span>
        </div>
      </section>

      <section className="workspace">
        <aside className="panel control">
          <label htmlFor="topic">研究主题</label>
          <textarea id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} />
          <button onClick={startRun} disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <Play size={18} />}
            <span>{loading ? "执行中" : "启动 Crew"}</span>
          </button>

          <div className="hint">
            <Bot size={18} />
            <span>后端会创建资料研究员、系统分析师、技术写作者三个 Agent，并按 sequential process 执行。</span>
          </div>

          {error ? (
            <div className="error">
              <ServerCrash size={18} />
              <span>{error}</span>
            </div>
          ) : null}
        </aside>

        <section className="panel">
          <div className="panelTitle">
            <CheckCircle2 size={18} />
            <h2>执行事件</h2>
          </div>
          <div className="timeline">
            {(result?.output?.events ?? []).map((event, index) => (
              <article className={`event event-${event.type}`} key={`${event.timestamp}-${index}`}>
                <time>{new Date(event.timestamp).toLocaleTimeString()}</time>
                <strong>{event.type}</strong>
                <span>{event.message}</span>
              </article>
            ))}
            {!result?.output?.events?.length ? <p className="empty">启动后会在这里看到 Flow、Crew、Task、Agent 和 Tool 的日志。</p> : null}
          </div>
        </section>
      </section>

      <section className="grid">
        <section className="panel">
          <div className="panelTitle">
            <Bot size={18} />
            <h2>任务输出</h2>
          </div>
          <div className="tasks">
            {(result?.output?.tasks ?? []).map((task) => (
              <article className="task" key={task.taskId}>
                <div>
                  <strong>{task.taskId}</strong>
                  <span>{task.agentRole}</span>
                </div>
                <p>{task.description}</p>
                <pre>{task.raw}</pre>
              </article>
            ))}
            {!result?.output?.tasks?.length ? <p className="empty">每个 Task 的中间结果会保留下来，便于定位是哪一步出了问题。</p> : null}
          </div>
        </section>

        <section className="panel report">
          <div className="panelTitle">
            <FileText size={18} />
            <h2>最终报告</h2>
          </div>
          <pre>{result?.output?.final ?? "Crew 完成后，最终 Task 的输出会显示在这里。"}</pre>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
