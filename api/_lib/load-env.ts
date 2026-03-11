import { readFileSync, existsSync } from "fs";
import { createDecipheriv } from "crypto";

let loaded = false;

function parseEnvContent(content: string): void {
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex);
    let value = trimmed.slice(eqIndex + 1);
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function tryDecryptGcm12(data: Buffer, key: Buffer): string | null {
  try {
    const iv = data.subarray(0, 12);
    const authTag = data.subarray(data.length - 16);
    const ciphertext = data.subarray(12, data.length - 16);
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf-8");
  } catch {
    return null;
  }
}

function tryDecryptGcm16(data: Buffer, key: Buffer): string | null {
  try {
    const iv = data.subarray(0, 16);
    const authTag = data.subarray(data.length - 16);
    const ciphertext = data.subarray(16, data.length - 16);
    const decipher = createDecipheriv("aes-256-gcm", key, iv.subarray(0, 12));
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf-8");
  } catch {
    return null;
  }
}

function tryDecryptCbc(data: Buffer, key: Buffer): string | null {
  try {
    const iv = data.subarray(0, 16);
    const ciphertext = data.subarray(16);
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf-8");
  } catch {
    return null;
  }
}

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  const envFile = process.env.VERCEL_ENV_FILE;
  const encKey = process.env.VERCEL_ENV_ENC_KEY;

  if (!envFile || !encKey || !existsSync(envFile)) return;

  try {
    const encrypted = readFileSync(envFile);
    const keyBuffer = Buffer.from(encKey, "base64");

    const decrypted =
      tryDecryptGcm12(encrypted, keyBuffer) ??
      tryDecryptGcm16(encrypted, keyBuffer) ??
      tryDecryptCbc(encrypted, keyBuffer);

    if (decrypted) {
      parseEnvContent(decrypted);
    } else {
      console.error("loadEnv: all decryption methods failed", {
        fileSize: encrypted.length,
        keySize: keyBuffer.length,
      });
    }
  } catch (err) {
    console.error("loadEnv error:", err);
  }
}
