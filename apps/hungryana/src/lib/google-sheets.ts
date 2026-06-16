type ContactRow = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

export async function appendContactMessage(data: ContactRow): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not configured');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone ?? '',
      message: data.message,
    }),
  });

  const text = await response.text();
  let result: { ok?: boolean; error?: string } = {};

  try {
    result = JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    if (!response.ok) {
      throw new Error(`Google Sheets webhook failed (${response.status})`);
    }
  }

  if (!response.ok || result.error) {
    throw new Error(result.error ?? `Google Sheets webhook failed (${response.status})`);
  }
}
