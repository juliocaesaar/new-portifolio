import { readFileSync, existsSync } from "fs";
import { createDecipheriv } from "crypto";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  const envFile = process.env.VERCEL_ENV_FILE;
  const encKey = process.env.VERCEL_ENV_ENC_KEY;

  if (!envFile || !encKey || !existsSync(envFile)) return;

  try {
    const encrypted = readFileSync(envFile);
    // Vercel uses AES-256-GCM: first 12 bytes = IV, last 16 bytes = auth tag, middle = ciphertext
    const iv = encrypted.subarray(0, 12);
    const authTag = encrypted.subarray(encrypted.length - 16);
    const ciphertext = encrypted.subarray(12, encrypted.length - 16);

    const keyBuffer = Buffer.from(encKey, "hex");
    const decipher = createDecipheriv("aes-256-gcm", keyBuffer, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    const envContent = decrypted.toString("utf-8");

    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex);
      let value = trimmed.slice(eqIndex + 1);
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (err) {
    console.error("Failed to load encrypted env:", err);
  }
}
