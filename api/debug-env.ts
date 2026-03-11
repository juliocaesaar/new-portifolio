import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadEnv } from "./_lib/load-env";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  loadEnv();

  const mpToken = process.env.MP_ACCESS_TOKEN;
  return res.status(200).json({
    has_mp_token: !!mpToken,
    mp_token_prefix: mpToken ? mpToken.slice(0, 10) + "..." : "undefined",
    has_resend: !!process.env.RESEND_API_KEY,
    has_site_url: !!process.env.SITE_URL,
  });
}
