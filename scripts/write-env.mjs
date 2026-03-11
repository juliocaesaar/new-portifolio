/**
 * Writes selected environment variables to a JSON file that serverless
 * functions can read at runtime. This runs during the Vercel build step
 * where env vars ARE available, solving the issue of encrypted env vars
 * not being injected into the Vite/generic function runtime.
 */
import { writeFileSync, mkdirSync } from "fs";

const KEYS = [
  "MP_ACCESS_TOKEN",
  "MP_PUBLIC_KEY",
  "RESEND_API_KEY",
  "SITE_URL",
];

const env = {};
for (const key of KEYS) {
  if (process.env[key]) {
    env[key] = process.env[key];
  }
}

mkdirSync("api/_lib", { recursive: true });
writeFileSync("api/_lib/env.json", JSON.stringify(env));

console.log(`[write-env] Wrote ${Object.keys(env).length}/${KEYS.length} env vars to api/_lib/env.json`);
