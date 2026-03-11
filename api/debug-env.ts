import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const envFile = process.env.VERCEL_ENV_FILE;
  const envFileExists = envFile ? existsSync(envFile) : false;

  return res.status(200).json({
    env_file_path: envFile ?? "not set",
    env_file_exists: envFileExists,
    env_file_size: envFileExists && envFile ? readFileSync(envFile).length : 0,
    preload_scripts: process.env.VERCEL_NODE_PRELOAD_SCRIPTS ?? "not set",
  });
}
