import { writeFileSync, mkdirSync } from "fs";

const KEYS = ["MP_ACCESS_TOKEN", "MP_PUBLIC_KEY", "RESEND_API_KEY", "SITE_URL"];

const lines = KEYS
  .filter(k => process.env[k])
  .map(k => `  ${k}: ${JSON.stringify(process.env[k])},`);

const content = `// Auto-generated at build time — do not edit
const ENV: Record<string, string> = {
${lines.join("\n")}
};
export default ENV;
`;

mkdirSync("api/_lib", { recursive: true });
writeFileSync("api/_lib/build-env.ts", content);
console.log(`[write-env] Wrote ${lines.length}/${KEYS.length} vars`);
