import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync, readdirSync } from "fs";
import { createDecipheriv } from "crypto";

function tryDecrypt(data: Buffer, key: Buffer, algo: string, ivLen: number, tagLen: number, label: string): string | null {
  try {
    const iv = data.subarray(0, ivLen);
    if (algo.includes("gcm")) {
      const authTag = data.subarray(data.length - tagLen);
      const ct = data.subarray(ivLen, data.length - tagLen);
      const d = createDecipheriv(algo as any, key, iv);
      d.setAuthTag(authTag);
      return `${label}: OK -> ${Buffer.concat([d.update(ct), d.final()]).toString("utf-8").slice(0, 80)}`;
    } else {
      const ct = data.subarray(ivLen);
      const d = createDecipheriv(algo as any, key, iv);
      return `${label}: OK -> ${Buffer.concat([d.update(ct), d.final()]).toString("utf-8").slice(0, 80)}`;
    }
  } catch (e: any) {
    return `${label}: FAIL -> ${e.message}`;
  }
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const envFile = process.env.VERCEL_ENV_FILE;
  const encKey = process.env.VERCEL_ENV_ENC_KEY;

  if (!envFile || !encKey || !existsSync(envFile)) {
    return res.status(200).json({ error: "no env file or key", envFile, hasKey: !!encKey });
  }

  const data = readFileSync(envFile);
  const key = Buffer.from(encKey, "base64");

  const results = [
    tryDecrypt(data, key, "aes-256-gcm", 12, 16, "gcm-12-b64"),
    tryDecrypt(data, key, "aes-256-gcm", 16, 16, "gcm-16-b64"),
    tryDecrypt(data, key, "aes-256-cbc", 16, 0, "cbc-16-b64"),
    tryDecrypt(data, key, "aes-256-ctr", 16, 0, "ctr-16-b64"),
  ];

  // Also try hex key
  const keyHex = Buffer.alloc(32);
  try { Buffer.from(encKey, "hex").copy(keyHex); } catch {}

  results.push(
    tryDecrypt(data, keyHex, "aes-256-gcm", 12, 16, "gcm-12-hex"),
    tryDecrypt(data, keyHex, "aes-256-cbc", 16, 0, "cbc-16-hex"),
  );

  // Try reversed format: [ct][iv][tag]
  const reversed12 = Buffer.concat([data.subarray(data.length - 12 - 16, data.length - 16), data.subarray(0, data.length - 12 - 16), data.subarray(data.length - 16)]);
  results.push(tryDecrypt(reversed12, key, "aes-256-gcm", 12, 16, "gcm-12-b64-reversed"));

  return res.status(200).json({
    file_size: data.length,
    key_size: key.length,
    results,
  });
}
