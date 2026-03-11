import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    has_mp_token: !!process.env.MP_ACCESS_TOKEN,
    has_resend: !!process.env.RESEND_API_KEY,
    test: "no-imports",
  });
}
