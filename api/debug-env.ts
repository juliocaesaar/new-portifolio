import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readdirSync, existsSync, readFileSync } from "fs";
import { execSync } from "child_process";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const results: Record<string, unknown> = {};

  // Check /opt for available scripts
  try {
    results.opt_rust = readdirSync("/opt/rust");
  } catch { results.opt_rust = "not found"; }

  // Check for env bootstrap scripts
  try {
    results.opt_files = readdirSync("/opt").slice(0, 20);
  } catch { results.opt_files = "not found"; }

  // Try running the bootstrap env loader if it exists
  const envLoaderPaths = [
    "/opt/rust/env.js",
    "/opt/rust/load-env.js",
    "/opt/rust/bootstrap.js",
    "/opt/bootstrap",
    "/var/task/.env",
  ];
  results.env_loader_exists = envLoaderPaths.filter(p => existsSync(p));

  // Check ___vc directory
  try {
    results.vc_dir = readdirSync("___vc");
  } catch { results.vc_dir = "not found"; }

  // Try to see if there's a decrypt binary
  try {
    results.decrypt_bin = execSync("which decrypt 2>/dev/null || which vercel-env 2>/dev/null || echo 'none'").toString().trim();
  } catch { results.decrypt_bin = "error"; }

  return res.status(200).json(results);
}
