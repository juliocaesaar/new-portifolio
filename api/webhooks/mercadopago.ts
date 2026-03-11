import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const MP_API = "https://api.mercadopago.com";

interface MpPayment {
  id: number;
  status: string;
  transaction_amount: number;
  currency_id: string;
  description: string;
  payer: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
  additional_info?: {
    items?: Array<{ title: string; quantity: string; unit_price: string }>;
  };
  external_reference?: string;
  date_approved?: string;
}

function buildPaymentEmailHtml(payment: MpPayment): string {
  const name = [payment.payer.first_name, payment.payer.last_name]
    .filter(Boolean)
    .join(" ");

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: payment.currency_id || "BRL",
  }).format(payment.transaction_amount);

  const date = payment.date_approved
    ? new Date(payment.date_approved).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("pt-BR");

  const items = payment.additional_info?.items ?? [];
  const itemsHtml = items.length
    ? items
        .map(
          (item) => `
        <tr>
          <td style="padding:8px 0;color:#d4d4d8;font-size:14px;border-bottom:1px solid #2a2a3a;">
            ${item.title}
          </td>
          <td style="padding:8px 0;color:#d4d4d8;font-size:14px;text-align:center;border-bottom:1px solid #2a2a3a;">
            ${item.quantity}x
          </td>
          <td style="padding:8px 0;color:#d4d4d8;font-size:14px;text-align:right;border-bottom:1px solid #2a2a3a;">
            R$ ${Number(item.unit_price).toFixed(2)}
          </td>
        </tr>`,
        )
        .join("")
    : "";

  return `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#111118;border-radius:16px;border:1px solid #1f1f2e;">
          <tr>
            <td align="center" style="padding:40px 40px 20px;">
              <img src="https://juliodevelop.com/assets/logo-icon.png" alt="JulioDevelop" width="72" height="72" style="display:block;" />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="width:64px;height:64px;border-radius:50%;background-color:rgba(22,163,74,0.12);">
                    <span style="font-size:32px;color:#22c55e;">&#10003;</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 40px 8px;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">
                Pagamento Confirmado!
              </h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 40px 20px;">
              <p style="margin:0;font-size:16px;color:#a1a1aa;line-height:1.6;">
                Olá${name ? ` ${name}` : ""}, seu pagamento foi processado com sucesso.
              </p>
            </td>
          </tr>

          <!-- Detalhes do pagamento -->
          <tr>
            <td style="padding:0 40px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a25;border-radius:12px;border:1px solid #2a2a3a;">
                <tr>
                  <td style="padding:24px;">
                    <h2 style="margin:0 0 16px;font-size:16px;font-weight:600;color:#ffffff;">Detalhes</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;color:#a1a1aa;font-size:13px;">ID do pagamento</td>
                        <td style="padding:6px 0;color:#d4d4d8;font-size:13px;text-align:right;">#${payment.id}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#a1a1aa;font-size:13px;">Data</td>
                        <td style="padding:6px 0;color:#d4d4d8;font-size:13px;text-align:right;">${date}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#a1a1aa;font-size:13px;">Valor total</td>
                        <td style="padding:6px 0;color:#22c55e;font-size:16px;font-weight:700;text-align:right;">${amount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            itemsHtml
              ? `
          <tr>
            <td style="padding:0 40px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a25;border-radius:12px;border:1px solid #2a2a3a;">
                <tr>
                  <td style="padding:24px;">
                    <h2 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#ffffff;">Itens</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${itemsHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <tr>
            <td style="padding:0 40px 30px;">
              <p style="margin:0;font-size:14px;color:#a1a1aa;line-height:1.7;">
                Obrigado pela confiança na JulioDevelop! Se tiver qualquer dúvida, não hesite em nos contatar.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 40px 40px;">
              <a href="https://juliodevelop.com" style="display:inline-block;padding:12px 32px;background-color:#16a34a;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
                Visitar site
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #1f1f2e;margin:0;" />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:24px 40px;">
              <p style="margin:0;font-size:12px;color:#52525b;">
                &copy; ${new Date().getFullYear()} JulioDevelop. Todos os direitos reservados.
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

async function fetchPayment(paymentId: string): Promise<MpPayment | null> {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) return null;

  const response = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) return null;
  return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, data } = req.body ?? {};

  // Mercado Pago envia diferentes tipos de notificação
  if (type !== "payment") {
    return res.status(200).json({ received: true, skipped: true });
  }

  const paymentId = data?.id;
  if (!paymentId) {
    return res.status(400).json({ error: "Missing payment ID" });
  }

  try {
    const payment = await fetchPayment(String(paymentId));

    if (!payment) {
      console.error("Could not fetch payment:", paymentId);
      return res.status(404).json({ error: "Payment not found" });
    }

    // Só envia e-mail para pagamentos aprovados
    if (payment.status !== "approved") {
      return res.status(200).json({ received: true, status: payment.status });
    }

    const payerEmail = payment.payer?.email;
    if (!payerEmail) {
      console.error("No payer email for payment:", paymentId);
      return res.status(200).json({ received: true, no_email: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "JulioDevelop <noreply@juliodevelop.online>",
      to: payerEmail,
      subject: `Pagamento Confirmado #${payment.id} - JulioDevelop`,
      html: buildPaymentEmailHtml(payment),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ received: true, email_sent: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
