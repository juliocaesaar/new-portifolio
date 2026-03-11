import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  let content = "";
  try {
    content = readFileSync("/opt/rust/nodejs.js", "utf-8");
  } catch (e) {
    return res.status(200).json({ error: String(e) });
  }

  // Search for env-related code
  const matches: string[] = [];
  const keywords = ["VERCEL_ENV_FILE", "VERCEL_ENV_ENC", "decrypt", "env.encrypted", "__env", "loadEnv", "dotenv"];

  for (const kw of keywords) {
    const idx = content.indexOf(kw);
    if (idx !== -1) {
      matches.push(`${kw} at ${idx}: ...${content.slice(Math.max(0, idx - 30), idx + 80)}...`);
    }
  }

  // Also check source-map-support.js
  let sms = "";
  try {
    sms = readFileSync("/opt/rust/source-map-support.js", "utf-8").slice(0, 500);
  } catch { sms = "not found"; }

  return res.status(200).json({
    matches,
    source_map_support_preview: sms,
    nodejs_js_length: content.length
  });
}
