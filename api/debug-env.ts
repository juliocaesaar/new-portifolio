import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ENV } from "./_lib/build-env";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  for (const [key, value] of Object.entries(ENV)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  return res.status(200).json({
    env_keys: Object.keys(ENV),
    has_mp_token: !!process.env.MP_ACCESS_TOKEN,
    has_resend: !!process.env.RESEND_API_KEY,
    has_site_url: !!process.env.SITE_URL,
  });
}
