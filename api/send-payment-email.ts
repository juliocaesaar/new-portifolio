import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmailHtml(name: string, lang: string): string {
  const isPt = lang === "pt";

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#111118;border-radius:16px;border:1px solid #1f1f2e;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 40px 20px;">
              <img src="https://juliodevelop.com/assets/logo-icon.png" alt="JulioDevelop" width="72" height="72" style="display:block;" />
            </td>
          </tr>

          <!-- Check Icon -->
          <tr>
            <td align="center" style="padding:10px 40px;">
              <div style="width:64px;height:64px;border-radius:50%;background-color:#16a34a22;display:flex;align-items:center;justify-content:center;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="width:64px;height:64px;border-radius:50%;background-color:rgba(22,163,74,0.12);">
                      <span style="font-size:32px;color:#22c55e;">&#10003;</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding:20px 40px 8px;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">
                ${isPt ? "Pagamento Aprovado!" : "Payment Approved!"}
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td align="center" style="padding:0 40px 20px;">
              <p style="margin:0;font-size:16px;color:#a1a1aa;line-height:1.6;">
                ${isPt ? `Olá${name ? ` ${name}` : ""}, seu pagamento foi processado com sucesso.` : `Hi${name ? ` ${name}` : ""}, your payment has been successfully processed.`}
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a25;border-radius:12px;border:1px solid #2a2a3a;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0;font-size:14px;color:#d4d4d8;line-height:1.7;">
                      ${isPt ? "Obrigado pela confiança na JulioDevelop! Se tiver qualquer dúvida sobre o serviço contratado, não hesite em nos contatar." : "Thank you for trusting JulioDevelop! If you have any questions about the contracted service, don't hesitate to reach out."}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:0 40px 40px;">
              <a href="https://juliodevelop.com" style="display:inline-block;padding:12px 32px;background-color:#16a34a;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
                ${isPt ? "Visitar site" : "Visit website"}
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #1f1f2e;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 40px;">
              <p style="margin:0;font-size:12px;color:#52525b;">
                &copy; ${new Date().getFullYear()} JulioDevelop. ${isPt ? "Todos os direitos reservados." : "All rights reserved."}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, lang } = req.body ?? {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const safeName = typeof name === "string" ? name.slice(0, 100) : "";
  const safeLang = lang === "en" ? "en" : "pt";

  const subject =
    safeLang === "pt"
      ? "Pagamento Aprovado - JulioDevelop"
      : "Payment Approved - JulioDevelop";

  try {
    const { data, error } = await resend.emails.send({
      from: "JulioDevelop <noreply@juliodevelop.online>",
      to: email,
      subject,
      html: buildEmailHtml(safeName, safeLang),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
