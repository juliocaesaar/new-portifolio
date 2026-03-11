import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadEnv } from "./_lib/load-env";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  loadEnv();
  return res.status(200).json({
    has_mp_token: !!process.env.MP_ACCESS_TOKEN,
    has_resend: !!process.env.RESEND_API_KEY,
    has_site_url: !!process.env.SITE_URL,
  });
}
