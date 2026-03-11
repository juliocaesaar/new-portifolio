import { ENV } from "./build-env";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  for (const [key, value] of Object.entries(ENV)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
