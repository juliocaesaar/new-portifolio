import { writeFileSync } from "fs";

const KEYS = ["MP_ACCESS_TOKEN", "MP_PUBLIC_KEY", "RESEND_API_KEY", "SITE_URL"];

const entries = KEYS
  .filter(k => process.env[k])
  .map(k => `  ${JSON.stringify(k)}: ${JSON.stringify(process.env[k])},`);

const content = `// Auto-generated at build time by scripts/write-env.mjs
export const ENV: Record<string, string> = {
${entries.join("\n")}
};
`;

writeFileSync("api/_build-env.ts", content);
console.log("[write-env] Wrote " + entries.length + "/" + KEYS.length + " vars");
