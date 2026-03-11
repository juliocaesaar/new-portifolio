import type { VercelRequest, VercelResponse } from "@vercel/node";
import { existsSync, readdirSync } from "fs";
import { loadEnv } from "./_lib/load-env";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const cwd = process.cwd();
  const checks = [
    "/var/task/api/_lib/env.json",
    "api/_lib/env.json",
    "./api/_lib/env.json",
    "/var/task/_lib/env.json",
    "_lib/env.json",
    "./_lib/env.json",
  ];

  const pathResults: Record<string, boolean> = {};
  for (const p of checks) {
    pathResults[p] = existsSync(p);
  }

  let cwdFiles: string[] = [];
  try { cwdFiles = readdirSync(cwd).slice(0, 15); } catch {}

  let taskFiles: string[] = [];
  try { taskFiles = readdirSync("/var/task").slice(0, 15); } catch {}

  let taskApiFiles: string[] = [];
  try { taskApiFiles = readdirSync("/var/task/api").slice(0, 15); } catch {}

  let taskApiLibFiles: string[] = [];
  try { taskApiLibFiles = readdirSync("/var/task/api/_lib").slice(0, 15); } catch {}

  loadEnv();

  return res.status(200).json({
    cwd,
    has_mp_token: !!process.env.MP_ACCESS_TOKEN,
    path_checks: pathResults,
    cwd_files: cwdFiles,
    task_files: taskFiles,
    task_api_files: taskApiFiles,
    task_api_lib_files: taskApiLibFiles,
  });
}
