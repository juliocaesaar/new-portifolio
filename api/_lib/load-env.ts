import { readFileSync } from "fs";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  const paths = [
    "/var/task/api/_lib/env.json",
    "api/_lib/env.json",
    "./api/_lib/env.json",
  ];

  let content: string | null = null;
  for (const p of paths) {
    try {
      content = readFileSync(p, "utf-8");
      break;
    } catch {
      continue;
    }
  }

  if (!content) return;

  try {
    const env = JSON.parse(content) as Record<string, string>;
    for (const [key, value] of Object.entries(env)) {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (err) {
    console.error("loadEnv: failed to parse env.json:", err);
  }
}
