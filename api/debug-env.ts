import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync, readdirSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const results: Record<string, unknown> = {};

  // Check /proc/self/environ
  try {
    const environ = readFileSync("/proc/self/environ", "utf-8");
    const keys = environ.split("\0").filter(Boolean).map(e => e.split("=")[0]);
    results.proc_env_keys = keys;
    results.has_mp_in_proc = keys.some(k => k === "MP_ACCESS_TOKEN");
  } catch (e: any) {
    results.proc_error = e.message;
  }

  // Check for additional env files
  try {
    const vcFiles = readdirSync("___vc");
    results.vc_files = vcFiles;
  } catch { results.vc_files = []; }

  // Check /var/task for env files
  try {
    const taskFiles = readdirSync("/var/task").filter(f => f.includes("env") || f.startsWith("."));
    results.task_env_files = taskFiles;
  } catch { results.task_env_files = []; }

  // Total process.env keys count
  results.process_env_count = Object.keys(process.env).length;
  results.process_env_keys = Object.keys(process.env).filter(k => !k.startsWith("VERCEL") && !k.startsWith("NX") && !k.startsWith("TURBO") && !k.startsWith("AWS") && !k.startsWith("_") && !k.startsWith("NODE") && !k.startsWith("PATH"));

  return res.status(200).json(results);
}
