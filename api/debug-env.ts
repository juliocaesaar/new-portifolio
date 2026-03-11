import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync } from "fs";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const envFile = process.env.VERCEL_ENV_FILE;
  const encKey = process.env.VERCEL_ENV_ENC_KEY;

  let fileInfo = "no file";
  if (envFile && existsSync(envFile)) {
    const buf = readFileSync(envFile);
    fileInfo = `size=${buf.length}, first16hex=${buf.subarray(0, 16).toString("hex")}, isUtf8=${!buf.subarray(0, 50).some((b: number) => b === 0)}`;
  }

  return res.status(200).json({
    env_file: envFile,
    enc_key_length: encKey?.length ?? 0,
    file_info: fileInfo,
  });
}
