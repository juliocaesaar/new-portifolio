import type { VercelRequest, VercelResponse } from "@vercel/node";
import { loadEnv } from "./_lib/load-env";

const MP_API = "https://api.mercadopago.com";

interface PaymentItem {
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
}

interface CreatePaymentBody {
  items: PaymentItem[];
  payer_email?: string;
  payer_name?: string;
  external_reference?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  loadEnv();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const SITE_URL = process.env.SITE_URL ?? "https://juliodevelop.online";
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MP_ACCESS_TOKEN not configured");
    return res.status(500).json({ error: "Payment service not configured" });
  }

  const body = req.body as CreatePaymentBody | undefined;

  if (!body?.items?.length) {
    return res.status(400).json({ error: "At least one item is required" });
  }

  for (const item of body.items) {
    if (!item.title || item.quantity < 1 || item.unit_price <= 0) {
      return res.status(400).json({
        error: "Each item needs title, quantity >= 1, and unit_price > 0",
      });
    }
  }

  const items = body.items.map((item) => ({
    title: String(item.title).slice(0, 256),
    description: item.description ? String(item.description).slice(0, 256) : undefined,
    quantity: Math.floor(item.quantity),
    unit_price: Number(item.unit_price),
    currency_id: "BRL",
  }));

  const preference = {
    items,
    back_urls: {
      success: `${SITE_URL}/pagamento-aprovado`,
      failure: `${SITE_URL}/pagamento-aprovado?status=failure`,
      pending: `${SITE_URL}/pagamento-aprovado?status=pending`,
    },
    auto_return: "approved" as const,
    notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
    external_reference: body.external_reference ?? `pay_${Date.now()}`,
    ...(body.payer_email && {
      payer: {
        email: body.payer_email,
        ...(body.payer_name && { name: body.payer_name }),
      },
    }),
  };

  try {
    const response = await fetch(`${MP_API}/checkout/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Mercado Pago error:", response.status, errorData);
      return res.status(502).json({ error: "Failed to create payment" });
    }

    const data = await response.json();

    return res.status(200).json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
