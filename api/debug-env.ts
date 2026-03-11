import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { loadEnv } = await import("./_lib/load-env.js");
    loadEnv();
  } catch (err: unknown) {
    const msg = err instanceof Error ? `${err.message}\n${err.stack}` : String(err);
    return res.status(200).json({ load_error: msg });
  }

  const mpToken = process.env.MP_ACCESS_TOKEN;
  return res.status(200).json({
    has_mp_token: !!mpToken,
    mp_token_prefix: mpToken ? mpToken.slice(0, 10) + "..." : "undefined",
    has_resend: !!process.env.RESEND_API_KEY,
    has_site_url: !!process.env.SITE_URL,
  });
}
