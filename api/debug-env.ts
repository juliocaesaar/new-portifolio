import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const allKeys = Object.keys(process.env).filter(
    (k) => k.startsWith("MP_") || k.startsWith("RESEND") || k.startsWith("SITE") || k.startsWith("VERCEL")
  );
  return res.status(200).json({
    env_keys: allKeys,
    vercel_env: process.env.VERCEL_ENV,
    node_env: process.env.NODE_ENV,
  });
}
