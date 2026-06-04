import "dotenv/config";
import cors from "cors";
import express from "express";
import { ReportFlow } from "./flow.js";

const app = express();
const port = Number(process.env.PORT ?? 8787);
const host = process.env.HOST ?? "127.0.0.1";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    provider: process.env.LLM_PROVIDER ?? "mock"
  });
});

app.post("/api/runs", async (request, response) => {
  const topic = typeof request.body?.topic === "string" ? request.body.topic : "";
  const flow = new ReportFlow();
  const result = await flow.run(topic);
  response.status(result.status === "completed" ? 200 : 400).json(result);
});

app.listen(port, host, () => {
  console.log(`mini crewAI backend listening on http://${host}:${port}`);
});
