import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync } from "fs";
import { createDecipheriv } from "crypto";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const envFile = process.env.VERCEL_ENV_FILE;
  const encKey = process.env.VERCEL_ENV_ENC_KEY;

  if (!envFile || !encKey || !existsSync(envFile)) {
    return res.status(200).json({ error: "no env file" });
  }

  try {
    const data = readFileSync(envFile);
    const key = Buffer.from(encKey, "base64");
    const iv = data.subarray(0, 16);
    const ct = data.subarray(16);
    const d = createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([d.update(ct), d.final()]).toString("utf-8");

    // Split by null byte
    const entries = decrypted.split("\0").filter(Boolean);
    const envMap: Record<string, string> = {};
    for (const entry of entries) {
      const eqIdx = entry.indexOf("=");
      if (eqIdx > 0) {
        envMap[entry.slice(0, eqIdx)] = entry.slice(eqIdx + 1);
      }
    }

    // Check for our vars
    const ourVars = ["MP_ACCESS_TOKEN", "RESEND_API_KEY", "SITE_URL", "MP_PUBLIC_KEY"];
    const found: Record<string, boolean> = {};
    for (const v of ourVars) {
      found[v] = v in envMap;
    }

    return res.status(200).json({
      total_vars: entries.length,
      our_vars_found: found,
      all_keys: Object.keys(envMap),
    });
  } catch (e: any) {
    return res.status(200).json({ error: e.message });
  }
}
