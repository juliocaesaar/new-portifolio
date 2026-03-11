import BUILD_ENV from "./build-env";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  for (const [key, value] of Object.entries(BUILD_ENV)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
