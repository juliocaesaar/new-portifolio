import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  let nodejsJs = "";
  try {
    nodejsJs = readFileSync("/opt/rust/nodejs.js", "utf-8").slice(0, 2000);
  } catch (e) {
    nodejsJs = String(e);
  }

  return res.status(200).json({ nodejs_js: nodejsJs });
}
