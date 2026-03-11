import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ENV } from "./_build-env";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  for (const [k, v] of Object.entries(ENV)) {
    if (!process.env[k]) process.env[k] = v;
  }
  return res.status(200).json({
    env_count: Object.keys(ENV).length,
    has_mp_token: !!process.env.MP_ACCESS_TOKEN,
    has_resend: !!process.env.RESEND_API_KEY,
    has_site_url: !!process.env.SITE_URL,
  });
}
