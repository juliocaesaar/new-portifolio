import type { VercelRequest, VercelResponse } from "@vercel/node";
import { existsSync, readFileSync, readdirSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const cwd = process.cwd();
  const checks = [
    "/var/task/api/_lib/env.json",
    "api/_lib/env.json",
    "/var/task/_lib/env.json",
    "_lib/env.json",
  ];

  const pathResults: Record<string, boolean> = {};
  for (const p of checks) {
    pathResults[p] = existsSync(p);
  }

  let taskApiLibFiles: string[] = [];
  try { taskApiLibFiles = readdirSync("/var/task/api/_lib"); } catch {}

  // Try to load env manually
  let envContent = "not found";
  for (const p of checks) {
    if (existsSync(p)) {
      envContent = readFileSync(p, "utf-8").slice(0, 100);
      break;
    }
  }

  return res.status(200).json({
    cwd,
    path_checks: pathResults,
    task_api_lib_files: taskApiLibFiles,
    env_content_preview: envContent,
  });
}
