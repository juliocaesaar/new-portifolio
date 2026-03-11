import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const envFile = process.env.VERCEL_ENV_FILE;
  const encKey = process.env.VERCEL_ENV_ENC_KEY;

  let content = "no file";
  if (envFile && existsSync(envFile)) {
    content = readFileSync(envFile, "utf-8").slice(0, 200);
  }

  return res.status(200).json({
    enc_key_length: encKey?.length ?? 0,
    content_preview: content,
  });
}
